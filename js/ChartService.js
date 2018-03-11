function ChartService(){


    this.loadChart = function(datos, ciudad){

        $("#panel-chart").removeClass("invisible");

        var ctx = document.getElementById('chart-area').getContext('2d');
        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [ datos.numM, datos.numF],
                    backgroundColor: [
                       '#00b99e',
                       '#FFCA3A'
                    ],
                    label: 'label'
                }],
                labels: [ 'Hombres, '+datos.pcM+'%', 'Mujeres, '+datos.pcF+'%' ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                    fontFamily: 'Roboto',
                    fullWidth: false
                },
                title: {
                    display: true,
                    text: ciudad,
                    position: 'top',
                    fontFamily: 'Roboto',
                    fontSize: 14
                },            
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
		window.myDoughnut = new Chart(ctx, config);
    };

}