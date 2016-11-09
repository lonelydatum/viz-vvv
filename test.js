function init() {
	canvas = document.getElementById("mainCanvas");
	stage = new Stage(canvas);
 
	var circle = new Shape();
	circle.graphics.beginFill("#FF0000").drawCircle(220,220,500);
 	circle.alpha = 0;
	 
	stage.addChild(circle);
	
	
	Tween.get(circle, true).to({alpha:1},10000)

	Ticker.setFPS(20);
	Ticker.addListener(stage);
}