var multiplyFilter = (function() {
  
  //** private vars **//
  	var imageBottom;
  	var multiplyColor;	
    var canvas;
  
  	//** private functions **//
  	function draw() {
    	var context;
    	var imgData;
    	var pix;
        w = imageBottom.width, 
        h = imageBottom.height;    
    	
    	if (!canvas.getContext) { return; }
    	// get 2d context
    	context = canvas.getContext('2d');
    	// draw the image on the canvas
    	context.drawImage(imageBottom, 0, 0);
    
    	// Get the CanvasPixelArray from the given coordinates and dimensions.
    	imgData = context.getImageData(0, 0, w, h);
    	pix = imgData.data;
    
    	// Loop over each pixel and change the color.
    	
    	for (var i = 0, n = pix.length; i < n; i += 4) { 
      		pix[i  ] = multiplyPixels(multiplyColor[0], pix[i  ]); // red
      		pix[i+1] = multiplyPixels(multiplyColor[1], pix[i+1]); // green
      		pix[i+2] = multiplyPixels(multiplyColor[2], pix[i+2]); // blue
      	 	//pix[i+3] = multiplyPixels(multiplyColor[3], pix[i+3]); // alpha
    	}
    
   	 	// Draw the result on the canvas
    	context.putImageData(imgData, 0, 0);
   		return imgData;
	}
  
//** helper function **//
function multiplyPixels(topValue, bottomValue) {
    // the multiply formula
    return topValue * bottomValue / 255;
}
  
  	//** public functions **//
  	return {    
    init : function( image, color, cvs) {
      	//imageBottom = document.getElementById(imageId);      
      	imageBottom = image;
      	multiplyColor = color;      
      	canvas = cvs;
      	//console.log(imageBottom);  
      	return draw();         	      
    }    
  }
  
})();