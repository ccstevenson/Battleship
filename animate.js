var shipImg, frameCount, shipDivWidth, shipLeft, shipDiv, margin = 10, msPerFrame = 75, moveDist = 10;

function startMove() {
    shipImg = document.getElementById("shipImg");
    shipDiv = document.getElementById("shipDiv");
	
    shipDivWidth = shipDiv.offsetWidth;

    shipLeft = 0;
    setTimeout(moveShip, msPerFrame);
}

function moveShip() {
    shipLeft += moveDist;
    shipImg.style.left = shipLeft + "px";

    if (shipLeft < shipDivWidth - shipImg.width - margin) {
	setTimeout(moveShip, msPerFrame);
    }
}