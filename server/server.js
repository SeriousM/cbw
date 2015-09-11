Meteor.startup(function () {
  // code to run on server at startup
});

/****************************************
http://www.citybikewien.at/cms/dynimages/mb/files/Terms_of_Use_XML.pdf
- Scheduled loading data is allowed every 10 minutes
- Storing data is allowed for at most 1 week
****************************************/

var currentCitybikeXmlUrl = "http://dynamisch.citybikewien.at/citybike_xml.php";
var currentCitybikeContent = null;
// todo: reload xml content after 10 minutes with timer (or on demand by the user?)

Meteor.methods({
  getData:function(){
    if (currentCitybikeContent){
      return currentCitybikeContent;
    }

    console.info("Loading CitybikeWien xml from the server: " + currentCitybikeXmlUrl);

    var syncHttpCall = Meteor.wrapAsync(HTTP.get.bind(null, currentCitybikeXmlUrl));
    var result = syncHttpCall();

    if (!(result instanceof Meteor.Error) && result.statusCode === 200){
      var xml = result.content;
      var js = xml2js.parseStringSync(xml);
      return currentCitybikeContent = js;
    }

    return result;
  }
});
