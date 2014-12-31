
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x95a5a6);

// create a renderer instance
var stageProperties = {
	width: 800,
	height: 600
}

var renderer = PIXI.autoDetectRenderer(stageProperties.width, stageProperties.height);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

var arrowKeys = {
	left: false,
	right: false,
	up: false,
	down: false,
	w: false,
	a: false,
	s: false,
	d: false
};

var specialKeys = {
	space: false,
	q: false
};


// console.log(arrowKeys.left);

requestAnimFrame( animate );

var mines = [];

// create a texture from an image path
var bunnyTexture = PIXI.Texture.fromImage("battlebot.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(bunnyTexture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

bunny.scale = {
	x: 0.6,
	y: 0.6
};

// bunny.scale = 0.2;
// ;
// move the sprite t the center of the screen
bunny.position.x = stageProperties.width/2;
bunny.position.y = stageProperties.height/2;

stage.addChild(bunny);

// bunny.scale = 0.5;

// create a texture from an image path
var gloveTexture = PIXI.Texture.fromImage("glove.png");
// create a new Sprite using the texture
var glove = new PIXI.Sprite(gloveTexture);
glove.scale.x = 0.4;
glove.scale.y = -0.4;

// center the sprites anchor point
glove.anchor.x = 0.5;
glove.anchor.y = 0.5;

glove.rotation = 270*(Math.PI/180);

// move the sprite t the center of the screen
glove.position.x = bunny.width/2 + 20;
glove.position.y = bunny.height/2;

// bunny.addChild(glove);

// setInterval(handleMineDrop, 10);


var timeSinceLastMine = 0;


// Update function
function animate() {

    requestAnimFrame( animate );

    // bunny.rotation = 0.785398163;

    var speed = 5;
    var rotationSpeed = 0.1;

    if (arrowKeys.left == true || arrowKeys.a == true) {
    	bunny.rotation -= rotationSpeed;

    	// bunny.rotation += 0.785398163; 

    	// bunny.position.y > stageProperties.height
    }

    if (arrowKeys.right == true || arrowKeys.d == true) {
    	bunny.rotation += rotationSpeed;
    	// bunny.rotation += 0.785398163; 
    }

    if (arrowKeys.up == true || arrowKeys.w == true) {
    	// bunny.position.y -= speed;

    	var returnedPoint = generatePointByAngle(normalizeRotation(bunny.rotation)+270, speed, bunny.position);
    	// console.log(returnedPoint);

    	bunny.position.x = returnedPoint.x;
    	bunny.position.y = returnedPoint.y;


    }

    if (arrowKeys.down == true || arrowKeys.s == true) {
    	// bunny.position.y += speed;


        var returnedPoint = generatePointByAngle(normalizeRotation(bunny.rotation)+270, speed*(-1), bunny.position);
    	// console.log(returnedPoint);

    	bunny.position.x = returnedPoint.x;
    	bunny.position.y = returnedPoint.y;
    }





    // make sure the sprite doesn't go off screen

    if (bunny.position.x < 0) {
    	bunny.position.x = stageProperties.width;

    } else if (bunny.position.x > stageProperties.width) {
    	bunny.position.x = 0;

	} else if (bunny.position.y < 0) {
    	bunny.position.y = stageProperties.height;

    } else if (bunny.position.y > stageProperties.height) {
    	bunny.position.y = 0;
    }


    // just for fun, lets rotate mr rabbit a little
    // bunny.rotation += 0.4;
    

    // console.log()
    if (timeSinceLastMine >= 4) {
    	timeSinceLastMine = 4;
    } else {
    	timeSinceLastMine++;
    }


	if (specialKeys.space == true) {
		if (timeSinceLastMine == 4) {
	    	dropMine();
	    	timeSinceLastMine = 0;
	    }
    }


    if (specialKeys.q == true) {
    	detonateMines();
    }
    
    

 

    // render the stage   
    renderer.render(stage);
    // console.log(bunny.position);
}



function dropMine() {
	var mine = new PIXI.Sprite(PIXI.Texture.fromImage("bullet.png"));
	var x = bunny.position.x;
	// console.log(x);
	var y = bunny.position.y

	mine.position.x = x;
	mine.position.y = y;
	stage.addChild(mine);

	mines.push(mine);

}

function detonateMines() {
	if (mines.length > 0) {
		for (var i = 0; i < mines.length; i++) {
			var sprite = mines[i];

			// for (var i = 0; i < 100; i++) {
				// var j = 100 - i;
				// sprite.alpha = j;
			// }

			stage.removeChild(sprite);
			mines.remove(sprite);
			// stage.removeChild(sprite);
		}
	}
}


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};




function generatePointByAngle(angle, distance, startPoint) {

	// console.log(angle);

    angle = angle * (Math.PI/180)
    // console.log(angle);



    var addedX = Math.cos(angle) * distance;
    var addedY = Math.sin(angle) * distance;

    var point = {
    	x: startPoint.x + addedX,
    	y: startPoint.y + addedY
    }

    return point;
}




function normalizeRotation(rotationVal) {
	rotationVal = rotationVal * (180/Math.PI);

	if (rotationVal > 360) {
		rotationVal -= 360;
	}

	if (rotationVal < 0) {
		rotationVal += 360;
	}

	return rotationVal;
}

function ccpAdd(point1, point2) {
	var addedPointX = point1.x + point2.x;
	var addedPointY = point1.y + point2.y;

	var addedPoint = {
		x: addedPointX,
		y: addedPointY
	}

	return addedPoint;
}



// Keyboard control event handlers
$(document).keydown(function (evt) {
	if (evt.which == 37) {
		arrowKeys.left = true;
		// console.log("Left key pressed.");

	}

	if (evt.which == 39) {
		arrowKeys.right = true;
		// console.log("Right key pressed.");

	}

	if (evt.which == 38) {
		arrowKeys.up = true;
		// console.log("Up key pressed.");

	}

	if (evt.which == 40) {
		arrowKeys.down = true;
		// console.log("Down key pressed.");

	}


	if (evt.which == 87) {
		arrowKeys.w = true;
		// console.log("Left key pressed.");

	}

	if (evt.which == 65) {
		arrowKeys.a = true;
		// console.log("Right key pressed.");

	}

	if (evt.which == 83) {
		arrowKeys.s = true;
		// console.log("Up key pressed.");

	}

	if (evt.which == 68) {
		arrowKeys.d = true;
		// console.log("Down key pressed.");

	}

	// SPACE BAR
	if (evt.which == 32) {
		specialKeys.space = true;

	}

	if (evt.which == 81) {
		specialKeys.q = true;

	}

});



$(document).keyup(function (evt) {
	if (evt.which == 37) {
		arrowKeys.left = false;
		// console.log("Left key unpressed.");

	}

	if (evt.which == 39) {
		arrowKeys.right = false;
		// console.log("Right key unpressed.");

	}

	if (evt.which == 38) {
		arrowKeys.up = false;
		// console.log("Up key unpressed.");

	}

	if (evt.which == 40) {
		arrowKeys.down = false;
		// console.log("Down key unpressed.");

	}

	if (evt.which == 87) {
		arrowKeys.w = false;
		// console.log("Left key pressed.");

	}

	if (evt.which == 65) {
		arrowKeys.a = false;
		// console.log("Right key pressed.");

	}

	if (evt.which == 83) {
		arrowKeys.s = false;
		// console.log("Up key pressed.");

	}

	if (evt.which == 68) {
		arrowKeys.d = false;
		// console.log("Down key pressed.");

	}

		// SPACE BAR
	if (evt.which == 32) {
		specialKeys.space = false;

	}

	if (evt.which == 81) {
		specialKeys.q = false;

	}

});

