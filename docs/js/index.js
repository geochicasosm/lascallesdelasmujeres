

var initApp = (function (){


    const constants = new Constants();
    const geojsonMapService = new GeojsonMapService();
    const chartService = new ChartService();
    const myMap = new MyMap();
    const isMobile = isMobileDevice();
    let openToggleMenu = false;

    const currentLang = addText();

    const menuListELem = document.getElementById("menu-list");
    const panelListELem = document.getElementById("ciudades-list");

    let selectedCity = "";

    if (window.location.hash) {
        // A city was linked throught URL
        selectedCity = window.location.hash.replace('#', '');
    }

    //** CHART display*/
    const closeChartBtn = document.getElementById('close-chart-btn');
    const openChartBtn = document.getElementById('open-chart-btn');
    const panelChart = document.getElementById("panel-chart");

    closeChartBtn.onclick = hideChart;
    openChartBtn.onclick = showChart;

    function hideChart(){

        panelChart.classList.add("animated", "fadeOut");
        panelChart.style.zIndex = "-1";
        openChartBtn.classList.remove("invisible", "animated", "fadeOut");
        openChartBtn.classList.add("animated", "fadeIn");

    }

    function showChart(){

        panelChart.classList.remove("animated", "fadeOut");
        panelChart.classList.add("animated", "fadeIn");
        panelChart.style.zIndex = "999";
        openChartBtn.classList.add("animated", "fadeOut");

    }    

    // Sort countries alphabetically
    constants.countriesList.sort(function (a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    for (let j=0; j<constants.countriesList.length; j++){
        const country = constants.countriesList[j];

        const elemC = document.createElement("DIV");
        const elemMenuC = document.createElement("A");

        elemC.setAttribute("id",country.id);
        elemC.classList.add("div-pais");

        elemMenuC.setAttribute("id", "menu-"+ country.id);
        elemMenuC.classList.add("menu-div-pais");

        const elemCountryName = document.createElement("DIV");
        elemCountryName.classList.add("nombre-pais");
        const elemMenuCountryName = document.createElement("DIV");
        elemMenuCountryName.classList.add("menu-nombre-pais");

        elemCountryName.appendChild(document.createTextNode(country.name.toLocaleUpperCase()));
        elemMenuCountryName.appendChild(document.createTextNode(country.name.toLocaleUpperCase()));

        elemC.appendChild(elemCountryName);
        elemMenuC.appendChild(elemMenuCountryName);        

        panelListELem.appendChild(elemC);
        menuListELem.appendChild(elemMenuC);

        constants.countriesList[j].citiesList.sort(function (c, d) {
          let c_nameA = c.name.toLowerCase();
          let c_nameB = d.name.toLowerCase();
          if (c_nameA < c_nameB) return -1;
          if (c_nameA > c_nameB) return 1;
          return 0;
          });

        // Create an HTML node for every city and load its data
        for(let i= 0; i<country.citiesList.length; i++){

            const city = country.citiesList[i];

            myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, city.id, isMobile, city.center, currentLang, constants.lang[currentLang].popupText));

            const elem = document.createElement("DIV");
            const elemMenu = document.createElement("A");

            elem.setAttribute("id", city.id);
            elem.classList.add("nombre-ciudad");
            elem.setAttribute("href", "#" + city.id);

            elemMenu.setAttribute("id", "menu-"+ city.id);
            elemMenu.setAttribute("href", "#" + city.id);
            elemMenu.classList.add("nav-item", "nav-link",  "my-menu-item");

            elem.addEventListener("mouseenter", addBackgroundColor);
            elemMenu.addEventListener("mouseenter", addBackgroundColor);

            elem.addEventListener("mouseout", removeBackgroundColor, false);
            elemMenu.addEventListener("mouseout", removeBackgroundColor, false);

            elem.appendChild(document.createTextNode(city.name.toLocaleUpperCase()));
            elemMenu.appendChild(document.createTextNode(city.name.toLocaleUpperCase()));

            /*CLICK EVENTS*/

            elem.onclick = doElemClick;
            function doElemClick() {

                const prevElem = document.getElementsByClassName("selected");
                if(prevElem.length !== 0) prevElem[0].classList.remove("selected");
                elem.classList.add("selected");

                myMap.mapTo(city.center);
                chartService.loadChart(city.datos, city.name, constants.lang[currentLang].chartTxt);
                showChart();
            }

            elemMenu.onclick = doElemMenuClick;
            function doElemMenuClick() {

                const prevElemMenu = document.getElementsByClassName("menu-selected");
                if(prevElemMenu.length !== 0) prevElemMenu[0].classList.remove("menu-selected");
                elemMenu.classList.add("menu-selected");

                const navBar =  document.getElementsByClassName("navbar-collapse");
                if(navBar.length !== 0) navBar[0].classList.remove("show");

                const icon = document.getElementById("menu-toggle-icon");
                icon.classList.remove("fa-chevron-circle-right");
                icon.classList.add("fa-chevron-circle-down");
                openToggleMenu = false;

                myMap.mapTo(city.center);
                chartService.loadChart(city.datos, city.name, constants.lang[currentLang].chartTxt);
                showChart();
            }

            elem.addEventListener("mouseenter", addBackgroundColor);
            elemMenu.addEventListener("mouseenter", addBackgroundColor);

            elem.addEventListener("mouseout", removeBackgroundColor, false);
            elemMenu.addEventListener("mouseout", removeBackgroundColor, false);

            //Add elem to the panel and menu list
            elemC.appendChild(elem);
            elemMenuC.appendChild(elemMenu);

            if (selectedCity === city.id) {
                elem.classList.add("selected");
                elemMenu.classList.add("menu-selected");
                // Load the selected city
                myMap.mapTo(city.center);
                chartService.loadChart(city.datos, city.name, constants.lang[currentLang].chartTxt);
                showChart();
            }

        }

    }

    function addBackgroundColor(event){
        event.target.style.backgroundColor = "#243342";
    }
    function removeBackgroundColor(event){
        event.target.style.backgroundColor = "";
    }

    const toggleMenu = document.getElementById("my-toggle-menu");
    toggleMenu.addEventListener("click", updateToggleMenuIcon);


    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    function updateToggleMenuIcon(){

        const icon = document.getElementById("menu-toggle-icon");

        if(!openToggleMenu){
            icon.classList.remove("fa-chevron-circle-down");
            icon.classList.add("fa-chevron-circle-right");
        } else {
            icon.classList.remove("fa-chevron-circle-right");
            icon.classList.add("fa-chevron-circle-down");
        }
        openToggleMenu = !openToggleMenu;
    }

    function addText() {
        let userLang = navigator.language || navigator.userLanguage;

        if(isBlank(userLang)){
            userLang = "es";
        } else {
            userLang = userLang.split("-")[0];
        }

        if (!constants.lang[userLang]) {
            userLang = "es";
        }

        //console.log(userLang);
        Object.entries(constants.lang[userLang]).forEach(([key, value]) => {
            const textElem = document.getElementById(key);
            if (textElem) {
                textElem.innerHTML = value;
            }
        });

        return userLang;
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
});



window.onload = function() {

    var myApp = initApp;
    myApp();

};
