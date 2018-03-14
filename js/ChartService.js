function ChartService(){


    this.loadChart = function(datos, ciudad){

        $("#panel-chart").removeClass("invisible");

        var ctx = document.getElementById('chart-area').getContext('2d');
        var ctxBar = document.getElementById('bar-area').getContext('2d');

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [ datos.numMale, datos.numFemale],
                    backgroundColor: [
                       '#00b99e',
                       '#FFCA3A'
                    ],
                    label: 'label'
                }],
                labels: [ 'Hombres, '+datos.pcMale+'%', 'Mujeres, '+datos.pcFemale+'%' ]
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

        var configBar = {
            type: 'bar',
            data: {
                labels: ['Links a Wikipedia'],
                datasets: [
                    {
                        label: '% con link',
                        stack: 'Stack 0',
                        backgroundColor: '#FFCA3A',
				        borderColor: '#FFCA3A',
                        borderWidth: 1,
                        data: [datos.pcLink]
                    },
                    {
                        label: '% sin link',
                        stack: 'Stack 0',
                        backgroundColor: '#D6D6D6',
				        borderColor: '#D6D6D6',
                        borderWidth: 1,
                        data: [datos.pcNoLink]
                    }                    
                ]

            },
            options: {
                title: {
                    display: true,
                    text: 'Calles de Mujer con link a Wikipedia'
                },
                barThickness: 10,
                maxBarThickness: 10,
                responsive: true
            }
        };

        window.myDoughnut = new Chart(ctx, config);
        //window.myBar = new Chart(ctxBar, configBar);
    };

  



}