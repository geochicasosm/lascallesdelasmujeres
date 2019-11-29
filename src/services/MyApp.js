/* eslint-disable no-loop-func */

import MyMap from './MyMap';
import GeojsonService from './GeojsonService';
import ChartService from './ChartService';
import * as constants from './Constants';

export default class MyApp {
  constructor() {
    this.myMap = new MyMap();
    this.chartService = new ChartService();
    this.isMobile = this.isMobileDevice();
    this.currentLang = this.addText();
    this.openToggleMenu = false;
    this.selectedCity = window.location.hash
      ? window.location.hash.replace('#', '')
      : '';

    this.menuListELem = document.getElementById('menu-list');
    this.panelListELem = document.getElementById('ciudades-list');
  }

  startApp() {
    this.chartService.initChart();
    this.initDataList();

    const toggleMenu = document.getElementById('my-toggle-menu');
    toggleMenu.addEventListener('click', this.updateToggleMenuIcon);
  }

  initDataList() {
    for (let j = 0; j < constants.countriesList.length; j++) {
      const country = constants.countriesList[j];

      const elemC = document.createElement('DIV');
      const elemMenuC = document.createElement('A');

      elemC.setAttribute('id', country.id);
      elemC.classList.add('div-pais');

      elemMenuC.setAttribute('id', `menu-${country.id}`);
      elemMenuC.classList.add('menu-div-pais');

      const elemCountryName = document.createElement('DIV');
      elemCountryName.classList.add('nombre-pais');
      const elemMenuCountryName = document.createElement('DIV');
      elemMenuCountryName.classList.add('menu-nombre-pais');

      elemCountryName.appendChild(
        document.createTextNode(country.name.toLocaleUpperCase()),
      );
      elemMenuCountryName.appendChild(
        document.createTextNode(country.name.toLocaleUpperCase()),
      );

      elemC.appendChild(elemCountryName);
      elemMenuC.appendChild(elemMenuCountryName);

      this.panelListELem.appendChild(elemC);
      this.menuListELem.appendChild(elemMenuC);

      // Create an HTML node for every city and load its data
      for (let i = 0; i < country.citiesList.length; i++) {
        const city = country.citiesList[i];

        this.myMap.map.on(
          'load',
          GeojsonService.loadGeojson(
            this.myMap.map,
            city.id,
            this.isMobile,
            city.center,
            this.currentLang,
            constants.lang[this.currentLang].popupText,
          ),
        );

        const elem = document.createElement('DIV');
        const elemMenu = document.createElement('A');

        elem.setAttribute('id', city.id);
        elem.classList.add('nombre-ciudad');
        elem.setAttribute('href', `#${city.id}`);

        elemMenu.setAttribute('id', `menu-${city.id}`);
        elemMenu.setAttribute('href', `#${city.id}`);
        elemMenu.classList.add('nav-item', 'nav-link', 'my-menu-item');

        elem.addEventListener('mouseenter', this.addBackgroundColor);
        elemMenu.addEventListener('mouseenter', this.addBackgroundColor);

        elem.addEventListener('mouseout', this.removeBackgroundColor, false);
        elemMenu.addEventListener(
          'mouseout',
          this.removeBackgroundColor,
          false,
        );

        elem.appendChild(
          document.createTextNode(city.name.toLocaleUpperCase()),
        );
        elemMenu.appendChild(
          document.createTextNode(city.name.toLocaleUpperCase()),
        );

        /* CLICK EVENTS */

        // elem.onclick = this.doElemClick.bind(elem, city);
        elem.onclick = () => {
          const prevElem = document.getElementsByClassName('selected');
          if (prevElem.length !== 0) prevElem[0].classList.remove('selected');
          elem.classList.add('selected');

          this.myMap.mapTo(city.center);
          this.chartService.loadChart(
            city.datos,
            city.name,
            constants.lang[this.currentLang].chartTxt,
          );
          this.chartService.showChart();
        };

        // elemMenu.onclick = this.doElemMenuClick.bind(elemMenu, city);
        elemMenu.onclick = () => {
          const prevElemMenu = document.getElementsByClassName('menu-selected');
          if (prevElemMenu.length !== 0) {
            prevElemMenu[0].classList.remove('menu-selected');
          }
          elemMenu.classList.add('menu-selected');

          const navBar = document.getElementsByClassName('navbar-collapse');
          if (navBar.length !== 0) navBar[0].classList.remove('show');

          const icon = document.getElementById('menu-toggle-icon');
          icon.classList.remove('fa-chevron-circle-right');
          icon.classList.add('fa-chevron-circle-down');
          this.openToggleMenu = false;

          this.myMap.mapTo(city.center);
          this.chartService.loadChart(
            city.datos,
            city.name,
            constants.lang[this.currentLang].chartTxt,
          );
          this.chartService.showChart();
        };

        elem.addEventListener('mouseenter', this.addBackgroundColor);
        elemMenu.addEventListener('mouseenter', this.addBackgroundColor);

        elem.addEventListener('mouseout', this.removeBackgroundColor, false);
        elemMenu.addEventListener(
          'mouseout',
          this.removeBackgroundColor,
          false,
        );

        // Add elem to the panel and menu list
        elemC.appendChild(elem);
        elemMenuC.appendChild(elemMenu);

        if (this.selectedCity === city.id) {
          elem.classList.add('selected');
          elemMenu.classList.add('menu-selected');
          // Load the selected city
          this.myMap.mapTo(city.center);
          this.chartService.loadChart(
            city.datos,
            city.name,
            constants.lang[this.currentLang].chartTxt,
          );
          this.chartService.showChart();
        }
      }
    }
  }

  addBackgroundColor(event) {
    event.target.style.backgroundColor = '#243342';
  }

  removeBackgroundColor(event) {
    event.target.style.backgroundColor = '';
  }

  isMobileDevice() {
    return (
      typeof window.orientation !== 'undefined'
      || navigator.userAgent.indexOf('IEMobile') !== -1
    );
  }

  updateToggleMenuIcon() {
    const icon = document.getElementById('menu-toggle-icon');

    if (!openToggleMenu) {
      icon.classList.remove('fa-chevron-circle-down');
      icon.classList.add('fa-chevron-circle-right');
    } else {
      icon.classList.remove('fa-chevron-circle-right');
      icon.classList.add('fa-chevron-circle-down');
    }
    openToggleMenu = !openToggleMenu;
  }

  isBlank(str) {
    return !str || /^\s*$/.test(str);
  }

  addText() {
    let userLang = navigator.language || navigator.userLanguage;

    if (this.isBlank(userLang)) {
      userLang = 'es';
    } else {
      userLang = userLang.split('-')[0];
    }

    if (!constants.lang[userLang]) {
      userLang = 'es';
    }

    Object.entries(constants.lang[userLang]).forEach(([key, value]) => {
      const textElem = document.getElementById(key);
      if (textElem) {
        textElem.innerHTML = value;
      }
    });

    return userLang;
  }
}
