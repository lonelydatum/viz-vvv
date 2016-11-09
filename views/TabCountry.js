(function(window) {
	function TabCountry(){
		
	}
	
	
	TabCountry.prototype = new createjs.Container();
	TabCountry.prototype.TABS = [];
	TabCountry.prototype.W;
	TabCountry.prototype.H;
	TabCountry.prototype.G;
	TabCountry.prototype.DATA_COUNTRY = [
										{txt:"I feel\nthat my\ncountry\nis\nBETTER", color:"#5EB6C5"},
										{txt:"I feel\nthat my\ncountry\nis the\nSAME", color:"#3691a1"},
										{txt:"I feel\nthat my\ncountry\nis\nWORSE", color:"#2b7784"},
										{txt:"I feel\nthat my\ncountry\nis\nMUCH\nWORSE", color:"#17525c"}
										];
	
	
	TabCountry.prototype.drawCountry = function( w, h, gaps ){
		this.TABS = [];
		var yPos = 0;
		this.W = w;
		this.H = h;
		this.G = gaps;
		for(var i=0;i<4;i++){
			var container = new createjs.Container();
			this.addChild(container);
			
			container.y = yPos;
			var shape = new createjs.Shape();
			shape.graphics.beginFill(this.DATA_COUNTRY[i].color).drawRoundRect(0,0,w,h-gaps,15);
			var txt = new createjs.Text(this.DATA_COUNTRY[i].txt, "bold 13px Arial", "#111111");
			txt.y = (h/2) - 28;
			txt.x = 12;
			container.addChild(shape); 
			container.addChild(txt); 
			
			yPos += h;
			this.TABS.push({shape:shape, color:this.DATA_COUNTRY[i].color});
		}
		
	}
	
	TabCountry.prototype.rOver = function( index ){
		this.TABS[index].shape.graphics.clear();
		this.TABS[index].shape.graphics.beginFill("#FFFFFF").drawRoundRect(0,0,this.W,this.H-this.G,15);
	}
	
	TabCountry.prototype.rOut = function( index ){
		this.TABS[index].shape.graphics.clear();
		this.TABS[index].shape.graphics.beginFill(this.TABS[index].color).drawRoundRect(0,0,this.W,this.H-this.G,15);
	}

window.TabCountry = TabCountry;	
}(window))
