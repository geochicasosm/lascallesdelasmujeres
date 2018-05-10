

function initApp(){

    const constants = new Constants();
    const geojsonMapService = new GeojsonMapService();
    const chartService = new ChartService();
    const myMap = new MyMap();
    const isMobile = isMobileDevice();
    let openToggleMenu = false;
 
           
    for(let i= 0; i<constants.citiesList.length; i++){

        const city = constants.citiesList[i];

        myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, city.id, isMobile, city.center));

        /*CLICK EVENTS*/
        const elem = document.getElementById(city.id);
        elem.onclick = doElemClick;
        function doElemClick() {
            
            const prevElem = document.getElementsByClassName("selected");
            if(prevElem.length !== 0) prevElem[0].classList.remove("selected");
            elem.classList.add("selected");

            myMap.mapTo(city.center);        
            chartService.loadChart(city.datos, city.name); 
            showChart();
        }

        const elemMenu = document.getElementById('menu-'+city.id+'');
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
            chartService.loadChart(city.datos, city.name);  
            showChart();
        }

    }

    const nombreCiudadElem = document.getElementsByClassName("nombre-ciudad");
    const menuListElem = document.getElementById("menu-list");

    for(var index = 0; index < nombreCiudadElem.length; index++){

        nombreCiudadElem[index].addEventListener("mouseenter", addBackgroundColor);
        menuListElem.children[index].addEventListener("mouseenter", addBackgroundColor);
        
        nombreCiudadElem[index].addEventListener("mouseout", removeBackgroundColor, false);
        menuListElem.children[index].addEventListener("mouseout", removeBackgroundColor, false);        
    }

    function addBackgroundColor(event){
        event.target.style.backgroundColor = "#243342";
    }
    function removeBackgroundColor(event){
        event.target.style.backgroundColor = "";
    }

    const toggleMenu = document.getElementById("my-toggle-menu");
    toggleMenu.addEventListener("click", updateToggleMenuIcon); 
   

    //** CHART display*/
    const closeChartBtn = document.getElementById('close-chart-btn');
    const openChartBtn = document.getElementById('open-chart-btn');
    const panelChart = document.getElementById("panel-chart");

    closeChartBtn.onclick = hideChart;
    openChartBtn.onclick = showChart;
    
    function hideChart(){
        
        panelChart.classList.add("animated", "fadeOut");
        openChartBtn.classList.remove("invisible", "animated", "fadeOut");
        openChartBtn.classList.add("animated", "fadeIn");

    }
    
    function showChart(){

        panelChart.classList.remove("animated", "fadeOut");
        panelChart.classList.add("animated", "fadeIn");
        openChartBtn.classList.add("animated", "fadeOut");

    }

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
    
       
}



window.onload = function() {
    var myApp = initApp;
    myApp();

};

