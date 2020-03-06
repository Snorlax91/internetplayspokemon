function init_chart_doughnut() {

    if (typeof (Chart) === 'undefined') { return; }

    console.log('init_chart_doughnut');

    if ($('.canvasDoughnut').length) {

        var chart_doughnut_settings = {
            type: 'doughnut',
            tooltipFillColor: "rgba(51, 51, 51, 0.55)",
            data: {
                labels: [
                    "Twitch",
                    "Mixer",
                    "YouTube"
                ],
                datasets: [{
                    data: [twitchCountMessages, mixerCountMessages, youtubeCountMessages],
                    backgroundColor: [
                        "#ffc107",
                        "#3498DB",
                        "#E74C3C"
                    ],
                    hoverBackgroundColor: [
                        "#ffc107",
                        "#3498DB",
                        "#E95E4F"
                    ]
                }]
            },
            options: {
                legend: false,
                responsive: false
            }
        }

        $('.canvasDoughnut').each(function () {

            var chart_element = $(this);
            var chart_doughnut = new Chart(chart_element, chart_doughnut_settings);

        });

    }

}

function init_flot_chart() {

    if (typeof ($.plot) === 'undefined') { return; }

    console.log('init_flot_chart');
    var randNum = function () {
        return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
    };

    var arr_data1 = [
        [date1, day1],
        [date2, day2],
        [date3, day3],
        [date4, day4],
        [date5, day5],
        [date6, day6],
        [date7, day7]
    ];

    var chart_plot_01_settings = {
        series: {
            lines: {
                show: false,
                fill: true
            },
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 1,
                fill: 0.4
            },
            points: {
                radius: 0,
                show: true
            },
            shadowSize: 2
        },
        grid: {
            verticalLines: true,
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 1,
            color: '#fff'
        },
        colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
        xaxis: {
            tickColor: "rgba(51, 51, 51, 0.06)",
            mode: "time",
            tickSize: [1, "day"],
            //tickLength: 10,
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
        },
        yaxis: {
            ticks: 8,
            tickColor: "rgba(51, 51, 51, 0.06)",
        },
        tooltip: false
    }


    if ($("#chart_plot_01").length) {
        console.log('Plot1');

        $.plot($("#chart_plot_01"), [arr_data1], chart_plot_01_settings);
    }


}
		init_flot_chart();
