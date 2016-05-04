import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card-1'],

  chartData: {
    labels: ['10/4', '10/10', '10/14', '10/19'],
    datasets: [
        {
            label: "Sold",
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgba(0,179,221,0.8)",
            pointColor: "rgba(0,179,221,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [4, 5, 4, 6]
        },
        {
            label: "Stock",
            fillColor: "rgba(151,187,205,0)",
            strokeColor: "rgba(151,187,205,0.8)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [6, 7, 6, 8]
        },
        {
            label: "Returns",
            fillColor: "rgba(151,187,205,0)",
            strokeColor: "rgba(255,100,108,0.8)",
            pointColor: "rgba(255,100,108,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [2, 3, 2, 2]
        }
    ]
}
});
