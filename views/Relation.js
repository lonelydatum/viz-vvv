(function(window) {

//
function Relation( cID, hID, d, countriesSelected, tf, tabsC, tabsH ) {
	this.countryID = cID;
	this.householdID = hID;	
	this.data = d;
	this.COUNTRIES = countriesSelected;
	this.txtFuture = tf;
	this.tabsCountry = tabsC;
	this.tabsHoushold = tabsH;
	this.initialize();
}


Relation.prototype = new createjs.Container();
Relation.prototype.tabsCountry;
Relation.prototype.tabsHoushold;
Relation.prototype.countryID;
Relation.prototype.answersToQuestions = "future";
Relation.prototype.txtFuture;
Relation.prototype.isOver = false;
Relation.prototype.householdID;
Relation.prototype.data;
Relation.prototype.line;
Relation.prototype.countryAll	= [];
Relation.prototype.COUNTRIES = [];
Relation.prototype.COUNTRIES_BETTER 	= ["#3c7a90","#668f90","#9fb777","#9bcb94"];
Relation.prototype.COUNTRIES_SAME 		= ["#31394c","#54574c","#82934c","#7fb252"];
Relation.prototype.COUNTRIES_WORSE 		= ["#1c253a","#394028","#565a0a","#547311"];
Relation.prototype.COUNTRIES_VERY_WORSE = ["#0f192f","#1f2510","#292706","#28320a"];

Relation.prototype.COUNTRIES_COLOR = [ ];
Relation.prototype.COUNTRIES_MC = [ ];

Relation.prototype.Container_initialize = Relation.prototype.initialize;	//unique to avoid overiding base class
	
Relation.prototype.initialize = function() {
	this.COUNTRIES_COLOR = [this.COUNTRIES_BETTER, this.COUNTRIES_SAME, this.COUNTRIES_WORSE, this.COUNTRIES_VERY_WORSE]
	this.Container_initialize(); // super call			
	this.countryAll = [];
	//group data into countries
	var refineData = [];
	for( var a=0; a<this.COUNTRIES.length; a++ ){
		for(var b=0;b<this.data.length;b++){
			if( this.data[b].country==this.COUNTRIES[a] ){
				refineData.push(this.data[b]);
			}
		}
	}
	
	this.data = refineData;
	for( var c=0; c<this.COUNTRIES.length; c++ ){
		var arr	= [];
		var countryObj = {name:this.COUNTRIES[c], total:0, percent:0, arr:arr};
		var t=0;
		var countryTotal = 0;
		this.countryAll.push(countryObj);
		for( var i=0; i<this.data.length; i++ ){
			if( this.data[i].country==this.COUNTRIES[c] ){
				arr.push(this.data[i]);								
				countryTotal++;
			}
		}
		countryObj.arr = arr;
		countryObj.percent = countryTotal/this.data.length;
		t += countryObj.percent;
		//console.log(this.data.length+", "+countryObj.name+", "+countryObj.percent+", "+t);
		countryObj.total = countryTotal;
	}
	
	
	
	function compare(a,b) {
	  if (a.percent > b.percent){
	  	return -1;
	  }	     
	  if (a.percent < b.percent){
	  	return 1;
	  }	   
	  return 0;	  
	}	
	this.countryAll.sort(compare);		
}

Relation.prototype.drawRelation = function() {
	
	var rect = new createjs.Rectangle(0, 0, this.width, this.height);	
	this.line = new createjs.Shape();
	var col = this.COUNTRIES_COLOR[ this.countryID ][ this.householdID ];
	
	var remainingTotal = this.data.length;
	
	for(var i=0;i<this.countryAll.length;i++){
		var newRect = new createjs.Rectangle();
		var percent = this.countryAll[i].total/remainingTotal;
		remainingTotal = remainingTotal - this.countryAll[i].total;
		var wh;
		if( rect.width > rect.height ){			
			wh = "w";
			
			newRect.width = Math.round(rect.width * percent);			
			newRect.height = Math.round(rect.height);				
			newRect.x = rect.x
			newRect.y = rect.y
			
			rect.x = rect.x + newRect.width;
			rect.y = rect.y;
			rect.width = rect.width - newRect.width;
			rect.height = rect.height;
		}else{			
			wh = "h";
			newRect.width = Math.round(rect.width);
			newRect.height = Math.round(rect.height * percent);
			newRect.x = rect.x
			newRect.y = rect.y
			
			rect.y = rect.y + newRect.height;
			rect.x = rect.x;
			rect.height = rect.height - newRect.height;
			rect.width = rect.width;
		}
		
		var relationCountry = new RelationCountry( newRect, this.countryAll[i], col );
		
		this.COUNTRIES_MC.push(relationCountry);
		
		relationCountry.x = newRect.x;
		relationCountry.y = newRect.y;
		var gar = this.line;
		var owner = this;
		var canvas = document.getElementById("mainCanvas");
		
		
		
		
		(function(target) {
			
			var over = function() {
				owner.tabsCountry.rOver(owner.countryID);
				owner.tabsHoushold.rOver(owner.householdID);
				owner.isOver = true;
				var ratio = 6/1750;
				var lineThickness = document.width * ratio;
				gar.graphics.beginStroke("#FFFFFF").setStrokeStyle(.5).drawRect(0,0,owner.width,owner.height);
				gar.graphics.beginStroke("#FFFFFF").setStrokeStyle(lineThickness).drawRect(target.rect.x,target.rect.y,target.rect.width,target.rect.height);
				
				canvas.addEventListener('mousemove', ev_mousemove, true);
				function ev_mousemove( e ){
					
					var realY = window.scrollY + e.clientY;
					var targRect = new createjs.Rectangle( target.parent.x + target.x, target.parent.y + target.y, target.rect.width, target.rect.height );
					var xMax = targRect.x + targRect.width;
					var yMax = targRect.y + targRect.height;
					if( (e.clientX > targRect.x && e.clientX < xMax) && ( realY > targRect.y && realY < yMax) ){
						switch(owner.answersToQuestions){
							case "household_changes":
							owner.txtFuture.color = "#ca4a65";
							break;
							case "qualitylife_changes":
							owner.txtFuture.color = "#78933f";
							break;
							case "future":
							owner.txtFuture.color = "#f9810d";
							break;
						}
						var maxWidth = 120;
						var rand = Math.floor(Math.random() * target.data.arr.length);
						var future = target.data.arr[rand][owner.answersToQuestions];
						
						owner.txtFuture.text = (owner.answersToQuestions=="future")? "My future:\n"+future : future;
						owner.txtFuture.lineWidth = maxWidth;
						var w =  owner.txtFuture.getMeasuredWidth();
						var mirror = ( owner.householdID > 1 ) ? -1 : 1;
						owner.txtFuture.x = e.clientX+(20*mirror);
						
						
						owner.txtFuture.textAlign = ( owner.householdID > 1 ) ? "right" : "left";
						//owner.txtFuture.x = e.clientX + 2;
						owner.txtFuture.y = realY-12;	
						target.txt.alpha = .1;
						
						target.amountTxt.alpha = 1;
						//pageYOffset
					}else{
						owner.txtFuture.text = "";
					}
					
					
				}			
			}
			
			var out = function() {
				owner.tabsCountry.rOut(owner.countryID);
				owner.tabsHoushold.rOut(owner.householdID);
				gar.graphics.clear();	
				target.txt.alpha = .6;
				target.amountTxt.alpha = .6;
				owner.isOver = false;
			}
			relationCountry.onClick = function() {
			}

			relationCountry.addEventListener("mouseover", over)
			relationCountry.addEventListener("mouseout", out)
		})(relationCountry);
		
		
		this.addChild( relationCountry );
		this.addChild( this.line );
	}
	
	
	
}

	
window.Relation = Relation;
}(window));