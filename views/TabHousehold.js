(function(window){	
	function TabHousehold(){
		
	}
	
	
	
	TabHousehold.prototype = new createjs.Container();
	TabHousehold.prototype.TABS = [];
	TabHousehold.prototype.W;
	TabHousehold.prototype.G;
	//TabHousehold.prototype.DATA_HOUSEHOLD = ["My household has been Easier", "My household has been Same", "My household has been More Difficult", "My household has been Very Difficult"];
	
	TabHousehold.prototype.DATA_HOUSEHOLD = [
										{txt:"I feel that my household is \nVERY DIFFICULT", color:"#564306"},
										{txt:"I feel that my household is \nMORE DIFFICULT", color:"#7e6208"},
										{txt:"I feel that my household is the\nSAME", color:"#ac860b"},
										{txt:"I feel that my household is \nEASIER", color:"#D2A514"}
										];
	
	TabHousehold.prototype.drawHousehold = function( w, gaps ){
		this.TABS = [];
		this.W = w;
		this.G = gaps;
		var xPos = 0;
		for(var i=0;i<4;i++){
			var container = new createjs.Container();
			this.addChild(container);
			container.x = xPos;
			
			var shape = new createjs.Shape();
			shape.graphics.beginFill(this.DATA_HOUSEHOLD[i].color).drawRoundRect(0,0,w-gaps,75,15);
			var txt = new createjs.Text(this.DATA_HOUSEHOLD[i].txt, "bold 13px Arial", "#111111");
			txt.lineWidth = w-20;
			txt.textAlign = "center";
			txt.y = 45;
			txt.x = (w/2);
			
			container.addChild(shape); 
			container.addChild(txt); 
			
			xPos += w;
			this.TABS.push({shape:shape, color:this.DATA_HOUSEHOLD[i].color});
			
		}
		
	}
	
	TabHousehold.prototype.rOver = function( index ){
		this.TABS[index].shape.graphics.clear();
		//this.TABS[index].shape.graphics.beginFill("#FFFFFF").drawRoundRect(0,0,this.W-this.GAPS,75,15);
		this.TABS[index].shape.graphics.beginFill("#FFFFFF").drawRoundRect(0,0,this.W-this.G,75,15);
	}
	
	TabHousehold.prototype.rOut = function( index ){
		this.TABS[index].shape.graphics.clear();
		this.TABS[index].shape.graphics.beginFill(this.TABS[index].color).drawRoundRect(0,0,this.W-this.G,75,15);
	}
	
window.TabHousehold = TabHousehold;	
}(window))
