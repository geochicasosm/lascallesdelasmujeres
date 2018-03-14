

function initApp(){

   const constats = new Constants();
   const geojsonMapService = new GeojsonMapService();
   const chartService = new ChartService();
   const myMap = new MyMap();
           
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'barcelona'));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'buenosaires'));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'cochabamba'));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'asuncion'));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'lima'));
   myMap.map.on('load', geojsonMapService.loadGeojson(myMap.map, 'montevideo'));

  
    $("#ciudades-list .nombre-ciudad, #menu-list a").hover(function(){
        $(this).css("background-color", "#243342");
        }, function(){
        $(this).css("background-color", "");
    });
    
    /*CLICK EVENTS*/
    $("#barcelona" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        myMap.mapTo(constats.centerList.barcelona);        
        chartService.loadChart(constats.datos.barcelona, 'Barcelona'); 
        showChart();
    });
    $('#menu-barcelona').click(function() {        
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        $(".navbar-collapse").removeClass("show");

        myMap.mapTo(constats.centerList.barcelona);        
        chartService.loadChart(constats.datos.barcelona, 'Barcelona');  
        $('#open-chart-btn').addClass("invisible");
    });
   

    $("#asuncion" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constats.centerList.asuncion);        
        chartService.loadChart(constats.datos.asuncion, 'Asunción'); 
        $('#open-chart-btn').addClass("invisible");
    });
    $('#menu-asuncion').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constats.centerList.asuncion);        
        chartService.loadChart(constats.datos.asuncion, 'Asunción'); 
        $('#open-chart-btn').addClass("invisible");
        $(".navbar-collapse").removeClass("show");
    });
 
    
    $("#buenosaires").click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constats.centerList.buenosaires);        
        chartService.loadChart(constats.datos.buenosaires, 'Buenos Aires');   
        showChart(); 
    });
    $('#menu-buenosaires').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        $(".navbar-collapse").removeClass("show");
        myMap.mapTo(constats.centerList.buenosaires);        
        chartService.loadChart(constats.datos.buenosaires, 'Buenos Aires');  
        showChart();      
    });

    $("#cochabamba" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constats.centerList.cochabamba);        
        chartService.loadChart(constats.datos.cochabamba, 'Cochabamba'); 
        $('#open-chart-btn').addClass("invisible");
    });
    $('#menu-cochabamba').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constats.centerList.cochabamba);        
        chartService.loadChart(constats.datos.cochabamba, 'Cochabamba');     
        showChart();
        $(".navbar-collapse").removeClass("show");
    });
     
    
    $("#lima" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected"); 
        myMap.mapTo(constats.centerList.lima);        
        chartService.loadChart(constats.datos.lima, 'Lima'); 
        showChart();

    });
    $('#menu-lima').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constats.centerList.lima);        
        chartService.loadChart(constats.datos.lima, 'Lima'); 
        showChart();
        $(".navbar-collapse").removeClass("show");
    });
 
    
    $("#montevideo" ).click(function() {
        $(".nombre-ciudad").removeClass("selected");
        $(this).addClass("selected");
        myMap.mapTo(constats.centerList.montevideo);        
        chartService.loadChart(constats.datos.montevideo, 'Montevideo'); 
        showChart();
    });
    $('#menu-montevideo').click(function() {
        $("#menu-list a").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        myMap.mapTo(constats.centerList.montevideo);        
        chartService.loadChart(constats.datos.montevideo, 'Montevideo');
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
        $("#panel-chart").addClass("animated slideOutDown");
        $('#open-chart-btn').removeClass("invisible animated slideOutDown");
        $("#open-chart-btn").addClass("animated slideInUp");
    }
    
    function showChart(){
        $('#panel-chart').removeClass("animated slideOutDown");
        $("#panel-chart").addClass("animated slideInUp");
        $("#open-chart-btn").addClass("animated slideOutDown");
    }
       
}



window.onload = function() {
    var myApp = initApp;
    myApp();

};

