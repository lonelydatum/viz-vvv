(function(window) {

//
function RelationCountry( rect, d, c ) {	
	this.initialize();
	this.data = d;
	this.col = c;
	this.rect = rect;
	this.name = this.data.name.toUpperCase();
	
	
	
	////////////this.bg = new Shape();
	this.txt = new Text( this.name, "bold 10px Arial", "#FFFFFF" );	
	var w =  this.txt.getMeasuredWidth();
	this.txt.x = (rect.width/2) - (w/2);
	this.txt.y = rect.height/2;
	
	this.amountTxt = new Text( this.data.total, "bold 10px Arial", "#FFFFFF" );	
	
	this.amountTxt.x = this.txt.x + ((w-this.amountTxt.getMeasuredWidth())/2);
	this.amountTxt.y = (rect.height/2) + 10;
	
	
	this.face = new Image();
	var container = new Container();
	
	var wDest = rect.width;
	var hDest = rect.height;
	
	
	var dummyCanvas = document.createElement('canvas');
	dummyCanvas.width = rect.width;
	dummyCanvas.height = rect.height;
	var ctx = dummyCanvas.getContext("2d");
	
	
	
	
	
	var image = new Image();
	
	var color = this.col;
	image.onload = function(){
		ctx.clearRect(0,0,dummyCanvas.width,dummyCanvas.height);		
		var wDest = rect.width;
		var hDest = rect.height;
		var ratioDest = wDest/hDest;
		var ratioThis = image.width/image.height;
		
		//console.log(wDest+", "+hDest);
		//console.log(image.width+", "+image.height);
		
		var ratio;
		var newW;
		var newH;
		var xPos;
		var yPos;
		
		var offsetPercent = .5;
		var diffX = 0;
		var diffY = 0;
		
		
		
		
		
		if(ratioThis > ratioDest){
			ratio = image.height/hDest;
			newW = ratio * wDest;
			newH = ratio * hDest;
			diffX = (image.width - newW) * .5;
		}else{		
			ratio = image.width/wDest;
			newW = ratio * wDest;
			newH = ratio * hDest;
			diffY = (image.height - newH) * offsetPercent;
		}
		
		
		
		
		
		//console.log(newW+", "+newH);	
		//dummyCanvas.width = wDest;
		//dummyCanvas.height = hDest;
		
		//console.log(multiplyFilter);
		
		
		
		//ctx.putImageData( imageData, diffX,diffY,newW,newH,0,0,wDest,hDest);
		ctx.drawImage(image,diffX,diffY,newW,newH,0,0,wDest,hDest);
		
		
		//ctx.drawImage(image,diffX,diffY,50,newH,0,0,wDest,hDest);
		//ctx.drawImage(image,diffX,diffY,222,222,0,0,wDest,hDest);
		
		
		
		
		var bitmap = new Bitmap(dummyCanvas);
		
		var imageData = multiplyFilter.init( dummyCanvas, [hexToR(color), hexToG(color), hexToB(color)], dummyCanvas );
		bitmap.alpha = 1;
		
		container.addChild(bitmap);
		
		
		function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
		function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
		function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
		function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
		
	}
	
	//var randomNumber = Math.ceil(Math.random()*2);
	var randomNumber = 1;
	var url = "assets/face/"+this.name.toLowerCase()+"/"+this.name.toLowerCase()+"_"+randomNumber+".jpg";
	
	image.src = url;
	
	
	////////////this.bg.alpha = .6;
	////////////this.bg.filter;
	this.addChild(container);
	////////////this.addChild(this.bg);
	this.addChild(this.txt);
	this.addChild(this.amountTxt);
	
	var counter = this.txt.text.length;
	
	if( this.txt.getMeasuredWidth() > rect.width ){
		while( this.txt.getMeasuredWidth() > rect.width ){
			this.txt.text = this.name.substring(0,counter);					
			counter = counter-1;
		}
		if( this.txt.text.length > 1 ){
			this.txt.text = this.name.substring(0,this.txt.text.length-1);	
		}
				
		this.txt.text = this.txt.text + ".";
		this.txt.x = (rect.width/2) - (this.txt.getMeasuredWidth()/2);
	}
	
	
	////////////this.bg.graphics.beginStroke("#000000").setStrokeStyle(2).beginFill(this.col).drawRect(0, 0, rect.width, rect.height);
	////////////this.bg.alpha = .7;
	//this.normal();
	
}



RelationCountry.prototype = new Container();
RelationCountry.prototype.data;
RelationCountry.prototype.bg;
RelationCountry.prototype.txt;
RelationCountry.prototype.amountTxt;
RelationCountry.prototype.col;
RelationCountry.prototype.rect;
RelationCountry.prototype.face;



RelationCountry.prototype.Shape_initialize = RelationCountry.prototype.initialize;	//unique to avoid overiding base class
	
RelationCountry.prototype.initialize = function() {
	this.Shape_initialize(); // super call			
}

RelationCountry.prototype.handleImageLoad = function(event) {
	var image = event.target;	
}
	
RelationCountry.prototype.highlight = function() {	
	this.bg.graphics.beginStroke("#000000").setStrokeStyle(2).beginFill('rgba(11,11,11,.6)').drawRect(0, 0, this.rect.width, this.rect.height);
	this.txt.color = "#FF0000";
}

RelationCountry.prototype.normal = function() {
	this.bg.graphics.beginStroke("#000000").setStrokeStyle(2).beginFill("#3B2314").drawRect(0, 0, this.rect.width, this.rect.height);
	this.txt.color = "#FFFFFF";
}

RelationCountry.prototype.bold = function() {
				
}
	
	
window.RelationCountry = RelationCountry;
}(window));