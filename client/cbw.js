Template.chart.helpers({
  create: function(){
    // http://www.chartjs.org/docs/#bar-chart
  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.chart.events({
  "click #loadData": function(event, template){
     var data = Meteor.call("getData", function(error, result){
       if (result){
         console.log(result);
       }
     });
  }
});
