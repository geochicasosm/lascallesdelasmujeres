function ChartService(){


    this.loadChart = function(datos, ciudad){

        const panelChart = document.getElementById("panel-chart");
        panelChart.classList.remove("invisible");

        var ctx = document.getElementById('chart-area').getContext('2d');
        var ctxPie = document.getElementById('pie-area').getContext('2d');

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
                labels: [ `${datos.pcMale}% Hombres`,`${datos.pcFemale}% Mujeres` ]
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
                    text: `Calles de ${ciudad}`,
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

        var configPie = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [ datos.numLink, datos.numNoLink],
                    backgroundColor: [
                       
                       '#FFCA3A',
                       '#ffca3a73'
                    ],
                    label: 'label'
                }],
                labels: [ datos.pcLink+'% tiene', datos.pcNoLink+'% no tiene' ]
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
                    text: 'Mujeres con artículo en Wikipedia',
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
        window.myBar = new Chart(ctxPie, configPie);
    };

  
}