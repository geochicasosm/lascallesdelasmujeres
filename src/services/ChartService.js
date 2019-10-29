import Chart from 'chart.js';

export default class ChartService {
  constructor() {
    this.panelChart = document.getElementById('panel-chart');
    this.ctx = document.getElementById('chart-area').getContext('2d');
    this.ctxPie = document.getElementById('pie-area').getContext('2d');
    this.closeChartBtn = document.getElementById('close-chart-btn');
    this.openChartBtn = document.getElementById('open-chart-btn');
  }

  hideChart() {
    this.panelChart.classList.add('animated', 'fadeOut');
    this.panelChart.style.zIndex = '-1';
    this.openChartBtn.classList.remove('invisible', 'animated', 'fadeOut');
    this.openChartBtn.classList.add('animated', 'fadeIn');
  }

  showChart() {
    this.panelChart.classList.remove('animated', 'fadeOut');
    this.panelChart.classList.add('animated', 'fadeIn');
    this.panelChart.style.zIndex = '999';
    this.openChartBtn.classList.add('animated', 'fadeOut');
  }

  initChart() {
    this.closeChartBtn.onclick = () => {
      this.panelChart.classList.add('animated', 'fadeOut');
      this.panelChart.style.zIndex = '-1';
      this.openChartBtn.classList.remove('invisible', 'animated', 'fadeOut');
      this.openChartBtn.classList.add('animated', 'fadeIn');
    };
    this.openChartBtn.onclick = () => {
      this.panelChart.classList.remove('animated', 'fadeOut');
      this.panelChart.classList.add('animated', 'fadeIn');
      this.panelChart.style.zIndex = '999';
      this.openChartBtn.classList.add('animated', 'fadeOut');
    };
  }

  loadChart(datos, ciudad, text) {
    this.panelChart.classList.remove('invisible');

    const config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [datos.numMale, datos.numFemale],
          backgroundColor: [
            '#00b99e',
            '#FFCA3A',
          ],
          label: 'label',
        }],
        labels: [`${datos.pcMale}% ${text.chartMen}`, `${datos.pcFemale}% ${text.chartWomen}`],
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          fontFamily: 'Roboto',
          fullWidth: false,
        },
        title: {
          display: true,
          text: `${text.chartStreetsOf} ${ciudad}`,
          position: 'top',
          fontFamily: 'Roboto',
          fontSize: 14,
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    };

    const configPie = {
      type: 'pie',
      data: {
        datasets: [{
          data: [datos.numLink, datos.numNoLink],
          backgroundColor: [

            '#FFCA3A',
            '#ffca3a73',
          ],
          label: 'label',
        }],
        labels: [`${datos.pcLink}% ${text.chartHave}`, `${datos.pcNoLink}% ${text.chartNotHave}`],
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          fontFamily: 'Roboto',
          fullWidth: false,
        },
        title: {
          display: true,
          text: `${text.chartText1}`,
          position: 'top',
          fontFamily: 'Roboto',
          fontSize: 14,
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    };


    window.myDoughnut = new Chart(this.ctx, config);
    window.myBar = new Chart(this.ctxPie, configPie);
  }
}
