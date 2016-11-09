function Title( ctx ){
	TextField.call( this );
	
	var context = ctx;	
	context.font = "39px serif";	
	this.label = "Visualizing Voices of the Vulnerable";
	this.color = "#FFFFFF";
	
	var textWidth = context.measureText( this.label );
	var canvas = $("#canvasMain")[0];
	this.x = (canvas.width/2) - (textWidth.width/2);
	
	
	
	context.fillStyle = this.color;
	
}

Title.prototype = new createjs.TextField();
Title.prototype.constructor = Title;