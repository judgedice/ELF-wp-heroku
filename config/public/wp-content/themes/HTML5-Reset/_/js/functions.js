
var shapeCursor = 0;
var scrollValue;
var scrollHeight;
var scrollPercent;

project.currentStyle.fillColor = 'red';
		

// START AT THE BOTTOM LEFT...
var x = 0;
var y = shapeCanvas.height;


// THE THREE COLORS USED IN THE PALLETTE...
var color1 = new RgbColor( .874,.913,.160 ); 
var color2 = new RgbColor( .607,.760,.874 ); 
var color3 = new RgbColor( .835,.447,.462 ); 
var colors = [ color1, color2, color3 ];
var shapeArray = new Array();
var objectDataArray = new Array();

	
// BASIC FUNCTION TO PRODUCE THE SHAPE...	
function makeShape( width, height, rad, xScale )
{
	
	
	var p = new Path;

		p.moveTo( 0, 0 );
		p.width = width;
		p.height = height;
		p.xScale = xScale;
		//p.strokeWidth = 1;
	
		
		if( xScale == 1 )
		{
		// TOP CURVE ON LEFT
		
		p.lineTo( 0, -( height - rad * 4) );
		p.curveTo( new Point( rad, -( height - rad )), new Point( rad * 4, -height) );
		p.lineTo( width, -height );
		p.lineTo( width, -rad * 4 );
		p.curveTo( new Point( width - rad , -rad ), new Point( width - rad * 4, 0) );
		p.closePath();
//		p.scale( xScale, 1 );
		
		
		}
		else if (xScale == -1 ) {
		
		// TOP CURVE ON RIGHT
		
		p.lineTo( 0, height - rad * 4 );
		p.curveTo( new Point( rad, height - rad ), new Point( rad * 4, height ) );
		p.lineTo( width, height );
		p.lineTo( width, rad * 4 );
		p.curveTo( new Point( width - rad, rad ), new Point( width - rad * 4, 0 ) );
		p.closePath();
//		p.scale( xScale, 1 );
		}

	// p.visible = false;
	// console.log( "Pushign shape" );
	//shapeArray.push( p );
	
	return p;		
	
}





function buildShapes()
{
	if(objectDataArray.length > 100 ) return;



	// TOP OF SCREEN...
	//if( shape.position.y < 10 ) return;
	
	var width = ( Math.random() * 100 ) + 30;
	var height = ( Math.random() * 100 ) + 30;
	var scale = ( width > height ) ? ( width / 130 ) : ( height / 130 ) ; 
	
	var s = {};
	
	var colorVal = Math.round( Math.random() * 2 );
	var curveDirection = (  Math.random() > .5 ) ? 1 : -1;
	
	// if( direction != null ) curveDirection = direction;
	
	
	s.widthVal = width;
	s.heightVal = height;
	s.radius = 5;
	s.curveDirection = curveDirection;
	s.colorVal = colorVal;

	// makeShape( width, height, 5, curveDirection );
	s.opacity = scale;
		
	//s.fillColor = colors[ colorVal ];
	
	var pointx = Math.random() * shapeCanvas.width;
	var pointy = Math.random() * ( shapeCanvas.height + 2900 );
	// var pointy = Math.random() * shapeCanvas.height;

	s.position = ( new Point( pointx, pointy ) );

	s.pointX = s.position.x;
	s.pointY = s.position.y;




	s.scaleValue = scale * 1000; // HIGH MULTIPLIER TO EXAGGERATE EFFECT

	objectDataArray.push( s );


	buildShapes();
	
	
	
}



function onFrame( event )
{
	if(scrollValue)
	{
		for (var i = shapeArray.length - 1; i >= 0; i--) {
			shapeArray[i].position.y = -scrollPercent * shapeArray[i].scaleValue + shapeArray[i].pointY;
		};
		//console.log( scrollPercent );

		//console.log(scrollValue);

	}
}
	// console.log( canvas );
	// shapeCanvas.position.y += 0;

	// console.log( shapeCanvas.position.y ); 

// remap jQuery to $
(function($){})(window.jQuery);


/* trigger when page is ready */
$(document).ready(function (){

	scrollHeight = $(document).height() - $(window).height();

	// $("#shapeCanvas").css("height", 1900 );

	var s = makeShape( 50, 50, 5, 1 );
	s.visible = false;
	s.position =  new Point( 25, shapeCanvas.height - 25 );
	buildShapes();

	objectDataArray.sort( sortFunction );
	for (var i = objectDataArray.length - 1; i >= 0; i--) {
		var iter = objectDataArray[i];
		var thisShape = makeShape( iter.widthVal, iter.heightVal, iter.radius, iter.curveDirection );
		thisShape.position = iter.position;
		thisShape.pointY = iter.pointY;
		thisShape.scaleValue = iter.scaleValue;
		thisShape.fillColor = colors[ iter.colorVal ];
		thisShape.opacity = iter.opacity;
		shapeArray.push( thisShape );
	}



});

$(window).scroll(function () {
		scrollValue = $(document).scrollTop();
		scrollPercent = scrollValue / scrollHeight;
		if( scrollValue >= scrollHeight )
		{

			//console.log( "noooo");
			return;
		}
		// $("#shapeCanvas").css( "top", scrollValue );
	  // console.log( "scrolltop val: " + scrollValue );
	});

function sortFunction( a, b )
{
	return( a.scaleValue + b.scaleValue );
}

/* optional triggers

$(window).load(function() {
	
});

$(window).resize(function() {
	
});

*/