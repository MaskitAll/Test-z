document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;
var yDown = null;

function getTouches(evt) {
return evt.touches
};

function handleTouchStart(evt) {
const firstTouch = getTouches(evt)[0];
xDown = firstTouch.clientX;
yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
if ( ! xDown || ! yDown ) {
return;
}

var xUp = evt.touches[0].clientX;
var yUp = evt.touches[0].clientY;

var xDiff = xDown - xUp;
var yDiff = yDown - yUp;

if ( Math.abs(xDiff) > Math.abs(yDiff)) {
    ( xDiff > 0 ) ? alert("Left") : alert("Right");
} else {
    ( yDiff > 0 ) ? alert("Up") : alert("Down");
}

    // (Math.abs(xDiff) === 0 ) ? alert("Up") : alert("Duwn");
/* свайп был, обнуляем координаты */
xDown = null;
yDown = null;
};