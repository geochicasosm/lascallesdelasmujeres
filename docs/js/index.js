

function initApp(){

   const constants = new Constants();
   const geojsonMapService = new GeojsonMapService();
   const chartService = new ChartService();
   const myMap = new MyMap();
   const isMobile = isMobileDevice();
           
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'barcelona', isMobile));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'buenosaires', isMobile));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'cdmx', isMobile));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'cochabamba', isMobile));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'asuncion', isMobile));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'lima', isMobile));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'montevideo', isMobile));

  
    $("#ciudades-list .nombre-ciudad, #menu-list a").hover(function(){
        $(this).css("background-color", "#243342");
        }, function(){
        $(this).css("background-color", "");
    });
    
    /*CLICK EVENTS*/
    $("#barcelona" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        myMap.mapTo(constants.centerList.barcelona);        
        chartService.loadChart(constants.datos.barcelona, 'Barcelona'); 
        showChart();
    });
    $('#menu-barcelona').click(function() {        
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        $(".navbar-collapse").removeClass("show");

        myMap.mapTo(constants.centerList.barcelona);        
        chartService.loadChart(constants.datos.barcelona, 'Barcelona');  
        $('#open-chart-btn').addClass("invisible");
    });
   

    $("#asuncion" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constants.centerList.asuncion);        
        chartService.loadChart(constants.datos.asuncion, 'Asunción'); 
        $('#open-chart-btn').addClass("invisible");
    });
    $('#menu-asuncion').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constants.centerList.asuncion);        
        chartService.loadChart(constants.datos.asuncion, 'Asunción'); 
        $('#open-chart-btn').addClass("invisible");
        $(".navbar-collapse").removeClass("show");
    });
 
    
    $("#buenosaires").click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constants.centerList.buenosaires);        
        chartService.loadChart(constants.datos.buenosaires, 'Buenos Aires');   
        showChart(); 
    });
    $('#menu-buenosaires').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        $(".navbar-collapse").removeClass("show");
        myMap.mapTo(constants.centerList.buenosaires);        
        chartService.loadChart(constants.datos.buenosaires, 'Buenos Aires');  
        showChart();      
    });

    $("#cdmx").click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constants.centerList.cdmx);        
        chartService.loadChart(constants.datos.cdmx, 'C. de México');   
        showChart(); 
    });
    $('#menu-cdmx').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        $(".navbar-collapse").removeClass("show");
        myMap.mapTo(constants.centerList.cdmx);        
        chartService.loadChart(constants.datos.cdmx, 'C. de México');  
        showChart();      
    });    

    $("#cochabamba" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constants.centerList.cochabamba);        
        chartService.loadChart(constants.datos.cochabamba, 'Cochabamba'); 
        $('#open-chart-btn').addClass("invisible");
    });
    $('#menu-cochabamba').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constants.centerList.cochabamba);        
        chartService.loadChart(constants.datos.cochabamba, 'Cochabamba');     
        showChart();
        $(".navbar-collapse").removeClass("show");
    });
     
    
    $("#lima" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constants.centerList.lima);        
        chartService.loadChart(constants.datos.lima, 'Lima'); 
        showChart();

    });
    $('#menu-lima').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constants.centerList.lima);        
        chartService.loadChart(constants.datos.lima, 'Lima'); 
        showChart();
        $(".navbar-collapse").removeClass("show");
    });
 
    
    $("#montevideo" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        myMap.mapTo(constants.centerList.montevideo);        
        chartService.loadChart(constants.datos.montevideo, 'Montevideo'); 
        showChart();
    });
    $('#menu-montevideo').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constants.centerList.montevideo);        
        chartService.loadChart(constants.datos.montevideo, 'Montevideo');
        showChart();
        $(".navbar-collapse").removeClass("show");
    });

    //** CHART display*/

    $('#close-chart-btn').click(function(){
        hideChart();
    });

    $('#open-chart-btn').click(function(){
        showChart();
    });
    
    function hideChart(){
        $("#panel-chart").addClass("animated fadeOut");
        $('#open-chart-btn').removeClass("invisible animated fadeOut");
        $("#open-chart-btn").addClass("animated fadeIn");
    }
    
    function showChart(){
        $('#panel-chart').removeClass("animated fadeOut");
        $("#panel-chart").addClass("animated fadeIn");
        $("#open-chart-btn").addClass("animated fadeOut");
    }

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
       
}



window.onload = function() {
    var myApp = initApp;
    myApp();

};

