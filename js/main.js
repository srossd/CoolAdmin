(function ($) {
    // USE STRICT
    "use strict";
    $(".animsition").animsition({
      inClass: 'fade-in',
      outClass: 'fade-out',
      inDuration: 900,
      outDuration: 900,
      linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
      loading: true,
      loadingParentElement: 'html',
      loadingClass: 'page-loader',
      loadingInner: '<div class="page-loader__spin"></div>',
      timeout: false,
      timeoutCountdown: 5000,
      onLoadEvent: true,
      browser: ['animation-duration', '-webkit-animation-duration'],
      overlay: false,
      overlayClass: 'animsition-overlay-slide',
      overlayParentElement: 'html',
      transition: function (url) {
        window.location.href = url;
      }
    });
  
  
  })(jQuery);

var chart_ref = firebase.database().ref('/charts/');
chart_ref.on('value',function(snapshot) {
    snapshot.forEach(function(chart) {
        var id = chart.child('id').val();
        console.log(id);
        $("#"+id).height(200);
        var title = chart.child('title').val();
        var col = chart.child('color').val();
        var labels = [];
        var data = [];
        chart.child('data').forEach(function(child) {
            labels.push(child.key);
            data.push(child.val());
        });
        var myChart = new Chart(id, {
            type: 'bar',
            defaultFontFamily: 'Poppins',
            data: {
                labels: labels,
                datasets: [
                {
                    data: data,
                    label: title,
                    borderColor: "rgba("+col+", 0.9)",
                    borderWidth: "0",
                    backgroundColor: "rgba("+col+", 0.5)",
                    fontFamily: "Poppins"
                }
                ]
            },
            options: {
                scales: {
                xAxes: [{
                    ticks: {
                    fontFamily: "Poppins"

                    }
                }],
                yAxes: [{
                    ticks: {
                    beginAtZero: true,
                    userCallback: function(label, index, labels) {
                        if (Math.floor(label) === label) {
                            return label;
                        }
   
                    },
                    fontFamily: "Poppins"
                    }
                }]
                }
            }
        });
    });
});