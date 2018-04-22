

function initApp(){

    const constants = new Constants();
    const geojsonMapService = new GeojsonMapService();
    const chartService = new ChartService();
    const myMap = new MyMap();
    const isMobile = isMobileDevice();

 
           
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

            myMap.mapTo(city.center);        
            chartService.loadChart(city.datos, city.name);  
            showChart();
        }

    }

    /* const nombreCiudadElem = document.getElementsByClassName("nombre-ciudad");
    const ciudadesListElem = document.getElementById("ciudades-list");
    const menuListElem = document.getElementById("menu-list");

    for(var index = 0; index < ciudadesListElem.children.length; index++){

        ciudadesListElem.children[index].addEventListener("mouseenter", addBackgroundColor);
        menuListElem.children[index].addEventListener("mouseenter", addBackgroundColor);
        
        ciudadesListElem.children[index].addEventListener("mouseleave ", removeBackgroundColor, false);
        menuListElem.children[index].addEventListener("mouseleave ", removeBackgroundColor, false);        
    }

    function addBackgroundColor(event){
        event.target.style.backgroundColor = "#243342";
    }
    function removeBackgroundColor(event){
        event.target.style.backgroundColor = "";
    }  */   

 
    $("#ciudades-list .nombre-ciudad, #menu-list a").hover(function(){
        $(this).css("background-color", "#243342");
        }, function(){
        $(this).css("background-color", "");
    });
    

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
    
       
}



window.onload = function() {
    var myApp = initApp;
    myApp();

};

