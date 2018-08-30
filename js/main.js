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

services = ['firebase', 'google', 'wiki', 'nltk', 'selenium', 'tesseract']
services.forEach(function(service) {
    firebase.database().ref('/'+service).on('value', function(snapshot) {
        if(snapshot.val() == 'on')
            $("#"+service).addClass("badge-success").removeClass("badge-info").removeClass("badge-warning");
        else
            $("#"+service).addClass("badge-warning").removeClass("badge-info").removeClass("badge-success");
    });
});

var chart_ref = firebase.database().ref('/charts/');
chart_ref.on('value',function(snapshot) {
    snapshot.forEach(function(chart) {
        var id = chart.key;
        console.log(id);
        $("#"+id).height(200);
        var title = chart.child('title').val();
        $("#"+id).prev().html(title);
        var col = chart.child('color').val();
        var labels = [];
        var datasets = [];
        chart.child('labels').forEach(function(child) {
            labels.push(child.key);
        });
        chart.child('data').forEach(function(dataset) {
            var data = Array(labels.length);
            dataset.child('vals').forEach(function(child) {
                data[labels.indexOf(child.key)] = child.val();
            });
            datasets.push({
                data: data,
                label: dataset.key,
                borderColor: "rgba("+col+", 0.9)",
                borderWidth: "0",
                backgroundColor: "rgba("+col+", 0.5)",
                fontFamily: "Poppins"
            });
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