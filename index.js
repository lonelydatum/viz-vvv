var PADDING_TOP			= 9;
var PADDING_LEFT 		= 9;
var PADDING_RIGHT 		= 20;
var LEGEND_GAP_TAB 		= 25;
var TAB_COUNTRY_WIDTH	= 90;
var TABS_COUNTRY;
var TAB_HOUSEHOLD_HEIGHT= 60;
var TABS_HOUSEHOLD; 

var DATAVIZ 			= {x:150, y:10, width:735, height:440};
var RATIO				= .45;
var DATA_COUTRY			= ["better","same","worse","much worse"];
var DATA_HOUSEHOLD		= ["easier","same","more difficult","very difficult"];

var RELATIONSHIPS_MC	= [];
var RELATIONSHIPS_DATA	= [];

var SELECT_INDIA		= true;
var SELECT_IRAQ			= true;
var SELECT_MEXICO		= true;
var SELECT_UGANDA		= true;
var SELECT_UKRAINE		= true;

var GAPS;
var TXT_FUTURE;


var canvas;
var stage;
var JSON_DATA			= [];


$(document).ready(function() {	
	if(!Modernizr.canvas){
		return;
	}else{		
		loadData();

	}	   
});

function loadData(){	
	var local = "sql/search.php?";
	var server = "sql/search.php?";
	var url = ( document.location.href.indexOf("localhost") >= 0) ? local : server
	
	$.getJSON( url,
	{
		india:SELECT_INDIA,
		iraq:SELECT_IRAQ,
		mexico:SELECT_MEXICO,
		uganda:SELECT_UGANDA,
		ukraine:SELECT_UKRAINE,
		status_country:"better",
		status_household:"same"
		}, function(data, b, c){		

			JSON_DATA = data;
			parseData();
			
		} )
	
}

function parseData(){	
	
	for(var i=0;i<DATA_COUTRY.length; i++){
		for(var j=DATA_HOUSEHOLD.length-1; j>=0; j--){			
			getRelation(DATA_COUTRY[i], DATA_HOUSEHOLD[j]);			
		}
	}
	createApp();

}

// CREATES 1 of 16 RELATIONSHIPS
function getRelation( c, h ){
	var arr = [];
	var obj = {};
	
	for( var i=0; i<JSON_DATA.length; i++ ){		
		if(JSON_DATA[i]){
			if( JSON_DATA[i].country_status==c && JSON_DATA[i].household_status==h ){
				arr.push(JSON_DATA[i]);
				obj.country_status = c;
				obj.household_status = h;
				obj.data = arr;
			}				
		}
		
	}
	
	RELATIONSHIPS_DATA.push(obj);	
}

function testLocal(){
	canvas = $("#mainCanvas")[0];
	var ctx = canvas.getContext("2d");		
	stage = new createjs.Stage( canvas );
	
	var bgMain = new createjs.Shape();
	stage.addChild(bgMain);		
		
	
	
	createjs.Ticker.addEventListener("tick", handleTick);
	createjs.Ticker.setFPS(20);

	var shape = new createjs.Shape();
	shape.graphics.beginFill("#ff0000").drawRect(0, 0, 800, 800);
	stage.addChild(shape);
	stage.update();
	console.log(shape);
}


// ALL DATA IS NOW PARSED
function createApp(){
	canvas = $("#mainCanvas")[0];
	var ctx = canvas.getContext("2d");		
	stage = new createjs.Stage( canvas );
	
	var bgMain = new createjs.Shape();
	stage.addChild(bgMain);	
	stage.enableMouseOver( 10 );
		
	calculateDataVizSize();
	draw();
	
	createjs.Ticker.addEventListener("tick", handleTick);
	createjs.Ticker.setFPS(20);

	
	
		
	function calculateDataVizSize(){
		var w = $( document ).width();
		var ratio = 5/1750;
		GAPS = w * ratio;
		DATAVIZ.x = PADDING_LEFT + TAB_COUNTRY_WIDTH - 15;
		DATAVIZ.y = PADDING_TOP;
		DATAVIZ.width = w - PADDING_LEFT - PADDING_RIGHT - TAB_COUNTRY_WIDTH+9;
		DATAVIZ.height = $(window).height() - TAB_HOUSEHOLD_HEIGHT - PADDING_TOP - 135;	
		canvas.width = w;
		canvas.height = DATAVIZ.height + 70;	
		console.log(PADDING_LEFT, PADDING_RIGHT, TAB_COUNTRY_WIDTH);	
	}
	
	function draw(){
		drawBG();				
		drawTabs();
		drawDataViz();	
		mouseEventsEnabled = true;		
	}
	
	function drawTabs(){
		TABS_COUNTRY = new TabCountry();
		TABS_COUNTRY.drawCountry( TAB_COUNTRY_WIDTH, DATAVIZ.height/4, GAPS );
		TABS_COUNTRY.x = PADDING_LEFT;
		TABS_COUNTRY.y = PADDING_TOP;
		stage.addChild(TABS_COUNTRY);
		
		TABS_HOUSEHOLD = new TabHousehold();
		TABS_HOUSEHOLD.drawHousehold( DATAVIZ.width/4, GAPS );
		TABS_HOUSEHOLD.x = DATAVIZ.x;
		TABS_HOUSEHOLD.y = DATAVIZ.y + DATAVIZ.height - 22;
		stage.addChild(TABS_HOUSEHOLD);
		
	}	
	function drawDataViz(){
		var dataVizBG = new createjs.Shape();
		dataVizBG.graphics.beginFill("#3B2314");
		dataVizBG.graphics.drawRect(DATAVIZ.x,DATAVIZ.y,DATAVIZ.width,DATAVIZ.height);
		stage.addChild(dataVizBG);
		
		TXT_FUTURE = new createjs.Text( "", "bold 11px Arial", "#FFFFFF" );
		
		for(var i=0; i<RELATIONSHIPS_DATA.length; i++){			
			var col_ID = (i%4);
			var row_ID = Math.ceil((i+1)/4) - 1;			
			var itemWidth = DATAVIZ.width / DATA_HOUSEHOLD.length;
			var itemHeight = DATAVIZ.height / DATA_COUTRY.length;
			
			var x = (DATAVIZ.x) + (col_ID * itemWidth);
			var y = (DATAVIZ.y) + (row_ID * itemHeight);  
			
			var countriesSelected = [];
			if( SELECT_INDIA )  countriesSelected.push("india");
			if( SELECT_IRAQ ) 	countriesSelected.push("iraq");
			if( SELECT_MEXICO )	countriesSelected.push("mexico");
			if( SELECT_UGANDA ) countriesSelected.push("uganda");
			if( SELECT_UKRAINE ) countriesSelected.push("ukraine");
			
			
			
			var relation = new Relation( row_ID, col_ID, RELATIONSHIPS_DATA[i].data, countriesSelected, TXT_FUTURE, TABS_COUNTRY, TABS_HOUSEHOLD );
			
			relation.x = x;
			relation.y = y;		
			relation.width = itemWidth-GAPS;
			relation.height = itemHeight-GAPS;
			relation.drawRelation();	
						
			stage.addChild(relation);
			RELATIONSHIPS_MC.push(relation);
			stage.addChild(TXT_FUTURE);
		}		
	}
	
	function drawBG(){				
		bgMain.graphics.beginFill("#3B2314").drawRect(0,0,canvas.width,canvas.height);
	}	
}

function handleTick(event) {
	stage.update();		
}

function checkBoxCountries() {
	RELATIONSHIPS_MC	= [];
	stage.removeAllChildren();
	createApp();
}

function toggleIndia(){	
	SELECT_INDIA = !SELECT_INDIA;
	checkBoxCountries();
	 _gaq.push(['_trackEvent',
      'VVV_Countries', // category of activity
      'VVV_INDIA_'+SELECT_INDIA, // Action
   ]);   
}

function toggleIraq(){
	SELECT_IRAQ = !SELECT_IRAQ;
	checkBoxCountries();
	 _gaq.push(['_trackEvent',
      'VVV_Countries', // category of activity
      'VVV_IRAQ_'+SELECT_INDIA, // Action
   ]);
}

function toggleMexico(){
	SELECT_MEXICO = !SELECT_MEXICO;
	checkBoxCountries();
	 _gaq.push(['_trackEvent',
      'VVV_Countries', // category of activity
      'VVV_MEXICO_'+SELECT_INDIA, // Action
   ]);
}

function toggleUganda(){
	SELECT_UGANDA = !SELECT_UGANDA;
	checkBoxCountries();
	 _gaq.push(['_trackEvent',
      'VVV_Countries', // category of activity
      'VVV_UGANDA_'+SELECT_INDIA, // Action
   ]);
}

function toggleUkraine(){
	SELECT_UKRAINE = !SELECT_UKRAINE;
	checkBoxCountries();
	 _gaq.push(['_trackEvent',
      'VVV_Countries', // category of activity
      'VVV_UKRAINE_'+SELECT_INDIA, // Action
   ]);
}


function viewAnswers( answer ){	
	for( var i=0;i<RELATIONSHIPS_MC.length;i++ ){
		RELATIONSHIPS_MC[i].answersToQuestions = answer;
	}
	
	 _gaq.push(['_trackEvent',
      'VVV_Relationship', // category of activity
      answer, // Action
   ]);
}