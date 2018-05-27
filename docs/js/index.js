

function initApp(){

    const constants = new Constants();
    const geojsonMapService = new GeojsonMapService();
    const chartService = new ChartService();
    const myMap = new MyMap();
    const isMobile = isMobileDevice();
    let openToggleMenu = false;
 
    const menuListELem = document.getElementById("menu-list");
    const panelListELem = document.getElementById("ciudades-list");

    //Create an HTML node for every city and load its data
    for(let i= 0; i<constants.citiesList.length; i++){

        const city = constants.citiesList[i];

        myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, city.id, isMobile, city.center));
        
        const elem = document.createElement("DIV");        
        const elemMenu = document.createElement("A");

        elem.setAttribute("id", city.id);
        elem.classList.add("nombre-ciudad");

        elemMenu.setAttribute("id", "menu-"+city.id);
        elemMenu.setAttribute("href", "#");
        elemMenu.classList.add("nav-item", "nav-link",  "my-menu-item");                        

        elem.appendChild(document.createTextNode(city.name.toLocaleUpperCase()));
        elemMenu.appendChild(document.createTextNode(city.name.toLocaleUpperCase()));

        /*CLICK EVENTS*/

        elem.onclick = doElemClick;
        function doElemClick() {
            
            const prevElem = document.getElementsByClassName("selected");
            if(prevElem.length !== 0) prevElem[0].classList.remove("selected");
            elem.classList.add("selected");

            myMap.mapTo(city.center);        
            chartService.loadChart(city.datos, city.name); 
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
            chartService.loadChart(city.datos, city.name);  
            showChart();
        }

        elem.addEventListener("mouseenter", addBackgroundColor);
        elemMenu.addEventListener("mouseenter", addBackgroundColor);
        
        elem.addEventListener("mouseout", removeBackgroundColor, false);
        elemMenu.addEventListener("mouseout", removeBackgroundColor, false);

        //Add elem to the panel and menu list
        panelListELem.appendChild(elem);
        menuListELem.appendChild(elemMenu);

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
        const userLang = navigator.language || navigator.userLanguage;
        

    }
    
       
}



window.onload = function() {
    var myApp = initApp;
    myApp();

};

