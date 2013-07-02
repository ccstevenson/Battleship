// JavaScript for generating the game grid.
function showTable() {
	var gridDiv = document.getElementById("tableDiv");
	gridDiv.innerHTML = generateTable();
	gridClickHandlers();
	sunk();
}


// Global arrays to be used for checking computer ship presence. Consider wrapping into a function later.
var tableDimension = 10;
var globalComputerCollision = new Array(tableDimension); 
for (var i = 0; i < globalComputerCollision.length; i++)
	globalComputerCollision[i] = new Array(tableDimension); 
	
var globalPlayerCollision = new Array(tableDimension); 
for (var i = 0; i < globalPlayerCollision.length; i++)
	globalPlayerCollision[i] = new Array(tableDimension); 

function generateTable() {
	
	playerAircraftCarrierSunk = 0;
	playerBattleshipSunk = 0;
	playerSubmarineSunk = 0;
	playerDestroyerSunk = 0;
	playerPatrolSunk = 0;

	computerAircraftCarrierSunk = 0;
	computerBattleshipSunk = 0;
	computerSubmarineSunk = 0;
	computerDestroyerSunk = 0;
	computerPatrolSunk = 0;
	
	/* Arrays of objects. One array for computer ships, the other for player ships.
	   ***These are the objects which should be modified to alter the number, kind, and location of game elements.***
	   Note that length and letter are the only properties which are not reinitialized later using random numbers!
	   Refresh the page to observe variable orientations, columns, and rows. 
	   Loops are set up to randomly place only five ships, though in hindsight I could have set them up to populate
	   	the table based on the length of the ship arrays. Because the user cannot change this, however, I hard coded it.
		I didn't discover the 'in' keyword or the 'foreach' method until after I had written the project. Variable 'ships'
		should be changed if one wishes to alter the number of ships to be placed. */
	
	var playerShips = [
		aircraftCarrier = {
			length: 5,
			orientation: "",
			column: 0,
			row: 0,
			letter: "A"
		},
		battleship = {
			length: 4,
			orientation: "",
			column: 0,
			row: 0,
			letter: "B"
		},
		submarine = {
			length: 3,
			orientation: "",
			column: 0,
			row: 0,
			letter: "S"
		},
		destroyer = {
			length: 3,
			orientation: "",
			column: 0,
			row: 0,
			letter: "D"
		},
		patrolBoat = {
			length: 2,
			orientation: "",
			column: 0,
			row: 0,
			letter: "P"
		}
	]

	var computerShips = [
		aircraftCarrier = {
			length: 5,
			orientation: "",
			column: 0,
			row: 0,
			letter: "A"
		},
		battleship = {
			length: 4,
			orientation: "",
			column: 0,
			row: 0,
			letter: "B"
		},
		submarine = {
			length: 3,
			orientation: "",
			column: 0,
			row: 0,
			letter: "S"
		},
		destroyer = {
			length: 3,
			orientation: "",
			column: 0,
			row: 0,
			letter: "D"
		},
		patrolBoat = {
			length: 2,
			orientation: "",
			column: 0,
			row: 0,
			letter: "P"
		}
	]

	// Local variables.	
	var ships = 5;
	var SHIPSTYLE = "style=\"background-color: grey; text-align: center\"";
	var html = "";
	var style = "";	
	var cellContents = "&nbsp";
	var collisionFlag = 0;
	var tableDimension = 10;
	var players = 2;

	// Indices for iterating through 'for' loops.
	var masterIndex = 0;
	var i = 0;
	var j = 0;
	var k = 0;
	
	// Two-dimensional arrays to check for ship collisions. 
	// This code is taken from JavaScript: The Definitive Guide p. 148, section 7.7.
	var playerCollisionTable = new Array(tableDimension); // Create rows.
	for (i = 0; i < playerCollisionTable.length; i++)
		playerCollisionTable[i] = new Array(tableDimension); // Create columns.
	// Initialize all cells to 0.
	for (var row = 0; row < playerCollisionTable.length; row++) {
		for (var col = 0; col < playerCollisionTable[row].length; col++) {
			playerCollisionTable[row][col] = 0;
		}
	}
	
	var computerCollisionTable = new Array(tableDimension); // Create rows.
	for (i = 0; i < playerCollisionTable.length; i++)
		computerCollisionTable[i] = new Array(tableDimension); // Create columns.
	// Initialize all cells to 0.
	for (var row = 0; row < computerCollisionTable.length; row++) {
		for (var col = 0; col < computerCollisionTable[row].length; col++) {
			computerCollisionTable[row][col] = 0;
		}
	}
	
	// Initialize player ships.
	for (i = 0; i < ships; i++) {
		playerShips[i].orientation = setOrientation();

		if (playerShips[i].orientation == "horizontal") {
			do {
				do {
					playerShips[i].column = (setStart() - playerShips[i].length);
				} while (playerShips[i].column <= 0);
				
				playerShips[i].row = setStart();
				
				// Check for collision with previous ships.
				collisionFlag = 0;
				for (j = 0; j < playerShips[i].length; j++) {
					if (playerCollisionTable[playerShips[i].row][playerShips[i].column + j] != 0) { // A collision occurred.
						collisionFlag = 1;
					}
				}
				
				if (collisionFlag == 0) { // No collision occurred. Place the ship in the collision table.
					for (j = 0; j < playerShips[i].length; j++) {
							playerCollisionTable[playerShips[i].row][playerShips[i].column + j] = (i + 1);
					}
				}
			} while (collisionFlag == 1)
		}
		
		else {
			do {
				do {
					playerShips[i].row = (setStart() - playerShips[i].length);
				} while (playerShips[i].row <= 0);
				
				playerShips[i].column = setStart();
				
				// Check for collision with previous ships.
				collisionFlag = 0;
				for (j = 0; j < playerShips[i].length; j++) {
					if (playerCollisionTable[playerShips[i].row + j][playerShips[i].column] != 0) { // A collision occurred.
						collisionFlag = 1;
					}
				}
			
				if (collisionFlag == 0) { // No collision occurred. Place the ship in the collision table.
					for (j = 0; j < playerShips[i].length; j++)
						playerCollisionTable[playerShips[i].row + j][playerShips[i].column] = (i + 1);
				}
			} while (collisionFlag == 1)
		}
	}
	
	// Initialize computer ships. They are populated, but not displayed in the initialized grid.
	for (i = 0; i < ships; i++) {
		computerShips[i].orientation = setOrientation();

		if (computerShips[i].orientation == "horizontal") {
			do {
				do {
					computerShips[i].column = (setStart() - computerShips[i].length);
				} while (computerShips[i].column <= 0);
				
				computerShips[i].row = setStart();
				
				// Check for collision with previous ships.
				collisionFlag = 0;
				for (j = 0; j < computerShips[i].length; j++) {
					if (computerCollisionTable[computerShips[i].row][computerShips[i].column + j] != 0) { // A collision occurred.
						collisionFlag = 1;
					}
				}
				
				if (collisionFlag == 0) { // No collision occurred. Place the ship in the collision table.
					for (j = 0; j < computerShips[i].length; j++)
						computerCollisionTable[computerShips[i].row][computerShips[i].column + j] = (i + 1);
				}
			} while (collisionFlag == 1)
		}
		
		else {
			do {
				do {
					computerShips[i].row = (setStart() - computerShips[i].length);
				} while (computerShips[i].row <= 0);
				
				computerShips[i].column = setStart();
				
				// Check for collision with previous ships.
				collisionFlag = 0;
				for (j = 0; j < computerShips[i].length; j++) {
					if (computerCollisionTable[computerShips[i].row + j][computerShips[i].column] != 0) { // A collision occurred.
						collisionFlag = 1;
					}
				}
			
				if (collisionFlag == 0) { // No collision occurred. Place the ship in the collision table.
					for (j = 0; j < computerShips[i].length; j++)
						computerCollisionTable[computerShips[i].row + j][computerShips[i].column] = (i + 1);
				}
			} while (collisionFlag == 1)
		}
	}
	
	globalComputerCollision = computerCollisionTable; // Make collision data globally available.
	globalPlayerCollision = playerCollisionTable;
	
	for (masterIndex = 0; masterIndex < players; masterIndex++) {
		// Write the opening tag for the table. Use a variable for player and computer and put in loop.
		if (masterIndex == 0) {
			html += "<table border=\"1\" class=\"player\" id=\"playerTable\">";
			// Write the table header
			html += "<thead> <tr> <th colspan=\"10\" class=\"tableHeader\">Player</th></tr> </thead>";
		}
		else {
			html += "<table border=\"1\" class=\"computer\" id=\"computerTable\">";
			// Write the table header
			html += "<thead> <tr> <th colspan=\"10\" class=\"tableHeader\">Computer</th></tr> </thead>";
		}

		// Write the opening tag for the table body
		html += "<tbody>";
		
		for (i = 0; i < tableDimension; i++) { // For each row, write the opening tag for the row.
			html += "<tr>";
			
			for (j = 0; j < tableDimension; j++) { // For each column, fill the cell with a nonbreaking space.
				cellContents = "&nbsp";
				style = "";
				
				if (masterIndex == 0) {
					for (k = 0; k < ships; k++) {
						if (playerShips[k].orientation == "horizontal" && playerShips[k].row == i
						&& playerShips[k].column <= j && j <= (playerShips[k].column + playerShips[k].length - 1)) {
							cellContents = playerShips[k].letter;
							style = SHIPSTYLE;
						}
					}
						
					for (k = 0; k < ships; k++) {
						if (playerShips[k].orientation == "vertical" && playerShips[k].column == j
						&& playerShips[k].row <= i && i <= (playerShips[k].row + playerShips[k].length - 1)) {
							cellContents = playerShips[k].letter;
							style = SHIPSTYLE;
						}
					}
				}
				html += "<td " + style + ">" + cellContents + "</td>";
			}
			
			html += "</tr>";
		}
		
		// Write closing tag for the table.
		html += "</tbody> </table>";
	}
	return html;
}

function setOrientation() {
	// Choose a random number, 0 or 1, correlating to horizontal or vertical, respectively.
	var orientVar = Math.round(Math.random())
	var orientation = "";
	
	if (orientVar == 0) {
		orientation = "horizontal";
	}
	else if (orientVar == 1) {
		orientation = "vertical";
	}
	
	return orientation;
}

function setStart() {
	var tableDimension = 10;
	var start = Math.floor(Math.random() * tableDimension); 
	return start;
}

var intervalClear;
var timeoutClear;

function gridClickHandlers() {
	var numCells = 100;
	var selectedCell = 6;
	var computerTable = document.getElementById("computerTable");
	var cells = computerTable.getElementsByTagName("td");
	
	for (var i = 0; i < numCells; i++) {
		cells[i].onclick = function() {
			var ships = 5;
			var row = this.parentNode.rowIndex;
			var col = this.cellIndex;
			var cell = computerTable.rows[row].cells[col];
			this.style.textAlign = "center";
			
			if(globalComputerCollision[row-1][col] == 6) { // The cell has been previously clicked. Do not consume the turn.
				alert("You have already selected that cell.");
				return;
			}
			
			// Using JavaScript to script inline styles.
			if(globalComputerCollision[row-1][col] != 0) { 
					this.style.backgroundColor = "red";
					this.innerHTML = "&curren;";
					
					clearInterval(intervalClear); // If the grid is clicked before 1s has passed, be sure to clear the canvas.
					clearTimeout(timeoutClear);
					clearCanvas();
	
					intervalClear = setInterval(shipHit, 30);
					setTimeout(function() {clearInterval(intervalClear)}, 1000);
					setTimeout(clearCanvas, 1001);
			}
			else {
				this.style.backgroundColor = "blue";
			}
			
			/* Was used to display the coordinates of a clicked cell.
			var cellLocation = document.getElementById("cellInformation");
			cellLocation.innerHTML = "Column: " + (col) + "\tRow: " + (row-1);
			*/
			
			// Add the selected cell to the collision table with value 6. We do not want to select it again.
			globalComputerCollision[row-1][col] = selectedCell;
			
			checkSink("computer");
			
			computerTurn(); // Initiate responding computer turn.
			};
	}
}

function clearCanvas() {
	c.clearRect(0, 0, 200, 200);
}

var hitShip = 0;
var hitCol = 0;
var hitRow = 0;
var secondHitCol = 0;
var secondHitRow = 0;
var hitType = 0;
var discoveredOrientation = "";
var rightUp = 0;
var continueDir = 1;

function computerTurn() {
	var numCells = 100;
	var selectedCell = 6; // Represents a cell which has been selected in a previous turn.
	var newSelected = 0;
	var playerTable = document.getElementById("playerTable");
	var cells = playerTable.getElementsByTagName("td");
	
	while(newSelected == 0) { // Determine if the cell has not been previously selected.
		// Select the next cell to play.
		var randCell = Math.floor(Math.random() * numCells);
		
		row = cells[randCell].parentNode.rowIndex;
		col = cells[randCell].cellIndex;
		
		var chosenCell = playerTable.rows[row].cells[col];
		
		if (globalPlayerCollision[row-1][col] != selectedCell) {
			newSelected = 1;
		}
	}
	
	if (hitShip == 1) { // A ship has been hit, but not sunk.
		// Rather than introduce the complexity of choosing a random orientation, the computer will simply select valid adjacent cells in a clockwise fashion until a subsequent hit is made.
		if (hitRow > 1 && globalPlayerCollision[hitRow-2][hitCol] != selectedCell) { // Attempt to select the cell above the hit.
			var chosenCell = playerTable.rows[hitRow-1].cells[hitCol];
			row = (hitRow - 1);
			col = hitCol;
			discoveredOrientation = "vertical";
		}
		else if (hitCol < 9 && globalPlayerCollision[hitRow-1][hitCol+1] != selectedCell) { // Attempt to select the cell to the right of the hit.
			var chosenCell = playerTable.rows[hitRow].cells[hitCol+1];
			row = hitRow;
			col = hitCol + 1;
			discoveredOrientation = "horizontal";
		}
		else if (hitRow < 10 && globalPlayerCollision[hitRow][hitCol] != selectedCell) { // Attempt to select the cell below the hit.
			var chosenCell = playerTable.rows[hitRow+1].cells[hitCol];
			row = hitRow + 1;
			col = hitCol;
			discoveredOrientation = "vertical";
		}
		else if (hitCol > 0 && globalPlayerCollision[hitRow-1][hitCol-1] != selectedCell) { // Attempt to select the cell to the left of the hit.
			var chosenCell = playerTable.rows[hitRow].cells[hitCol-1];
			row = hitRow;
			col = hitCol - 1;
			discoveredOrientation = "horizontal";
		}
	}
	
	else if (hitShip > 1) { // The followup hit has been made. We know the orientation 
		if (discoveredOrientation == "horizontal") {
			if (secondHitCol < 9 && globalPlayerCollision[secondHitRow-1][secondHitCol+1] != selectedCell && continueDir == 1) { // Check to the right of the previous hit until no longer hitting the ship or sunk.
				var chosenCell = playerTable.rows[secondHitRow].cells[secondHitCol+1];
				row = secondHitRow;
				col = (secondHitCol + 1);
			}
			else { // if (secondHitCol > 0 && globalPlayerCollision[secondHitRow-1][secondHitCol-1] != selectedCell && continueDir == 0)  {// The remainder of the ship was not to the right. Move left.
				var chosenCell = playerTable.rows[secondHitRow].cells[secondHitCol-1];
				row = secondHitRow;
				col = (secondHitCol - 1);
			}
		}
		else if (discoveredOrientation == "vertical") {
			if (secondHitRow > 1 && globalPlayerCollision[secondHitRow-2][secondHitCol] != selectedCell && continueDir == 1) { // Check above the previous hit until no longer hitting the ship or sunk.
				var chosenCell = playerTable.rows[secondHitRow-1].cells[secondHitCol];
				row = (secondHitRow - 1);
				col = secondHitCol;
			}
			else { // if (secondHitRow < 10 && globalPlayerCollision[secondHitRow][secondHitCol] != selectedCell && continueDir == 0){ // The remainder of the ship was not above. Move down.
				var chosenCell = playerTable.rows[secondHitRow+1].cells[secondHitCol];
				row = (secondHitRow + 1);
				col = secondHitCol;
			}
		}
	}
	
	if(globalPlayerCollision[row-1][col] != 0) { 
		chosenCell.style.backgroundColor = "red";
		chosenCell.innerHTML = "&curren;";
		
		if (hitShip == 0) { // The first hit was made.
			hitShip = 1;
			hitType = globalPlayerCollision[row-1][col];
			hitCol = col;
			hitRow = row;
		}
		else if (hitShip == 1){
			if (hitType == globalPlayerCollision[row-1][col]) { // We have made a followup hit on the same ship we hit initially. 
				hitShip = 2;
				secondHitRow = row; // Update the global hit coordinates. We want to follow up on the second shot.
				secondHitCol = col;
				if (hitType == 5) { // We hit a patrol boat twice. It has been sunk.
					sunk();
				}
			}
		}		
		else if (hitShip > 1) {
			if (hitType == globalPlayerCollision[row-1][col]) { // We have made a followup hit on the same ship we hit initially.
				hitShip = hitShip + 1;
				secondHitRow = row;
				secondHitCol = col;
				// Check to see if the ship has been sunk. If so, we switch back to making random shots.
				if (hitShip == 3 && hitType == 3) {
					sunk();
				}
				else if (hitShip == 3 && hitType == 4) {
					sunk();
				}
				else if (hitShip == 4 && hitType == 2) {
					sunk();
				}
				else if (hitShip == 5 && hitType == 1) {
					sunk();
				}
			}
			else if (hitType != globalPlayerCollision[row-1][col]) {
					if (globalPlayerCollision[row-1][col] == selectedCell && continueDir == 0) { // Rare case: we have reached previously selected cells on both sides, but have not destroyed the ship.
						sunk(); // Computer gives up on this ship.	
					}
					continueDir = 0; // We have stopped hitting the desired ship. Switch directions.
					secondHitRow = hitRow;
					secondHitCol = hitCol;
				}
		}
	}
	else {
		chosenCell.style.backgroundColor = "blue";
		
		if (hitShip > 1 && hitType != globalPlayerCollision[row-1][col]) {
			continueDir = 0; // We have stopped hitting the desired ship. Switch directions.
			secondHitRow = hitRow;
			secondHitCol = hitCol;
		}
	}	
	
	// Add the selected cell to the collision table with value 6. We do not want to select it again.
	globalPlayerCollision[row-1][col] = selectedCell;
	
	checkSink("player");
}

function sunk() {
	hitShip = 0;
	hitCol = 0;
	hitRow = 0;
	secondHitCol = 0;
	secondHitRow = 0;
	hitType = 0;
	discoveredOrientation = "";
	rightUp = 0;
	continueDir = 1;
}

var playerAircraftCarrierSunk = 0;
var playerBattleshipSunk = 0;
var playerSubmarineSunk = 0;
var playerDestroyerSunk = 0;
var playerPatrolSunk = 0;

var computerAircraftCarrierSunk = 0;
var computerBattleshipSunk = 0;
var computerSubmarineSunk = 0;
var computerDestroyerSunk = 0;
var computerPatrolSunk = 0;

function checkSink(whichGrid) {
	var foundAircraftCarrier = 0;
	var foundBattleship = 0;
	var foundSubmarine = 0;
	var foundDestroyer = 0;
	var foundPatrol = 0;
	
	if (whichGrid == "player") {
		for (var row = 0; row < globalPlayerCollision.length; row++) { // Scan the table
			for (var col = 0; col < globalPlayerCollision[row].length; col++) {
				if (globalPlayerCollision[row][col] == 1) {
					foundAircraftCarrier = 1;
				}
				else if (globalPlayerCollision[row][col] == 2) {
					foundBattleship = 1;
				}
				else if (globalPlayerCollision[row][col] == 3) {
					foundSubmarine = 1;
				}
				else if (globalPlayerCollision[row][col] == 4) {
					foundDestroyer = 1;
				}
				else if (globalPlayerCollision[row][col] == 5) {
					foundPatrol = 1;
				}
			}
		}
		
		if (foundAircraftCarrier == 0 && playerAircraftCarrierSunk == 0) {
			playerAircraftCarrierSunk = 1;
			alert("Player Aircraft Carrier Sunk");
		}
		else if (foundBattleship == 0 && playerBattleshipSunk == 0) {
			playerBattleshipSunk = 1;
			alert("Player Battleship Sunk");
		}
		else if (foundSubmarine == 0 && playerSubmarineSunk == 0) {
			playerSubmarineSunk = 1;
			alert("Player Submarine Sunk");
		}
		else if (foundDestroyer == 0 && playerDestroyerSunk == 0) {
			playerDestroyerSunk = 1;
			alert("Player Destroyer Sunk");
		}
		else if (foundPatrol == 0 && playerPatrolSunk == 0) {
			playerPatrolSunk = 1;
			alert("Player Patrol Boat Sunk");
		}
		if (playerAircraftCarrierSunk == 1 && playerBattleshipSunk == 1 && playerSubmarineSunk == 1 && playerDestroyerSunk == 1 && playerPatrolSunk == 1) {
			alert("Game over. Computer wins. Restarting game.");
			showTable();
		}
	}
	
	else if (whichGrid == "computer") {
		for (var row = 0; row < globalComputerCollision.length; row++) { // Scan the table
			for (var col = 0; col < globalComputerCollision[row].length; col++) {
				if (globalComputerCollision[row][col] == 1) {
					foundAircraftCarrier = 1;
				}
				else if (globalComputerCollision[row][col] == 2) {
					foundBattleship = 1;
				}
				else if (globalComputerCollision[row][col] == 3) {
					foundSubmarine = 1;
				}
				else if (globalComputerCollision[row][col] == 4) {
					foundDestroyer = 1;
				}
				else if (globalComputerCollision[row][col] == 5) {
					foundPatrol = 1;
				}
			}
		}
		
		if (foundAircraftCarrier == 0 && computerAircraftCarrierSunk == 0) {
			computerAircraftCarrierSunk = 1;
			alert("Computer Aircraft Carrier Sunk");
		}
		else if (foundBattleship == 0 && computerBattleshipSunk == 0) {
			computerBattleshipSunk = 1;
			alert("Computer Battleship Sunk");
		}
		else if (foundSubmarine == 0 && computerSubmarineSunk == 0) {
			computerSubmarineSunk = 1;
			alert("Computer Submarine Sunk");
		}
		else if (foundDestroyer == 0 && computerDestroyerSunk == 0) {
			computerDestroyerSunk = 1;
			alert("Computer Destroyer Sunk");
		}
		else if (foundPatrol == 0 && computerPatrolSunk == 0) {
			computerPatrolSunk = 1;
			alert("Computer Patrol Boat Sunk");
		}
		if (computerAircraftCarrierSunk == 1 && computerBattleshipSunk == 1 && computerSubmarineSunk == 1 && computerDestroyerSunk == 1 && computerPatrolSunk == 1) {
			alert("Game over. Player wins. Restarting game.");
			showTable();
		}
	}
}

function whichButton(ID) {
	var buttonID = document.getElementById("cellInformation");
	if(ID == 1) {
		buttonID.innerHTML = "The button was selected with the left mouse button.";
	}
	else if(ID == 2) {
		buttonID.innerHTML = "The button was selected with the middle mouse button.";
	}
	else if(ID == 3) {
		buttonID.innerHTML = "The button was selected with the right mouse button.";
	}
	else {
		buttonID.innerHTML = "You have a strange mouse.";
	}
}

function displayVal(object) {
	var value = document.getElementById("cellInformation");
	val = object.options[object.selectedIndex].value;
	// var selected = document.getElementByID("shipDropdown");
	value.innerHTML = "You've selected \"" + val + ".\"";
}

function displayText(object) {
	var value = document.getElementById("cellInformation");
	val = object.value;
	value.innerHTML = "You've entered: " + val;
}

function getCookies() {
	var allCookies = document.cookie; // Get all cookies in one string.
	var list = allCookies.split(", "); // Split into name=value pairs.
	var properties = list[1]; // Store the cookie value 'properties'.
	var propertiesParse = properties.split("="); // Remove the name from the name=value pair.
	var splitProperties = propertiesParse[1].split(" "); // Split the login name and the date.
	var name = splitProperties[0];
	var date = splitProperties[1];
	var timePreformat = splitProperties[2];
	var time = timePreformat.split(";");
	
	var cookieSpan = document.getElementById("cookieInformation");
	cookieSpan.innerHTML = "Username: " + name + "<br />" + "Page last visited on: " + date + " at " + time[0];
}

function getHighscores() {
    var request = new XMLHttpRequest();
    request.open("GET", "highscores.xml", false);
    request.send(null);

    var highscoreDiv = document.getElementById("highscoreDiv");
    var html = "<table><thead> <tr> <th class=\"highScores\" colspan=\"2\">High Scores</th></tr> </thead><tbody>";

    var xmldoc = request.responseXML;

    var xmlrows = xmldoc.getElementsByTagName("player");

    for (var r = 0; r < xmlrows.length; r++) {
    var xmlrow = xmlrows[r];
    html += "<tr><td class=\"highScores\">&nbsp;" + xmlrow.getAttribute("name") + "&nbsp;</td>";

    // NOTE THAT getElementsByTagName RETURNS A LIST
    var xemail = xmlrow.getElementsByTagName("time")[0];
    html += "<td class=\"highScores\">&nbsp;" + xemail.firstChild.data + "&nbsp;</td></tr>";
    }
    
    highscoreDiv.innerHTML = html;
}

var particleArray = []; // Global empty array.

function shipHit() { // Code for animating blocks adapted from http://seb.ly/2012/02/learn-to-code-in-2012-the-visual-way/
    var particle = {x : 100, y : 100, xSpeed : randomRange(-10, 10), ySpeed : randomRange(-10, 10), size : 10};
    particleArray.push(particle); // Add the new particle.
    c.clearRect(0, 0, 200, 200); // Clear the canvas.
	
    for(var i = 0; i < particleArray.length; i++) {
        particle = particleArray[i]; 
        c.fillStyle = 'red'; 
        c.fillRect(particle.x, particle.y, particle.size, particle.size);
        particle.x = particle.x + particle.xSpeed;
        particle.y = particle.y + particle.ySpeed; 
        particle.size = particle.size * 0.96;
		
		if (particleArray[i].size < 0.1) { // Remove tiny particles
     		particleArray.splice(i, 1); 
		}
    }
}

// JavaScript for the index.html page.

function playGame() {
	gameWindow = window.open("grid.html", "Battleship", "", "false");
}

function closeGame() {
	window.close()
}

function loadSyncPost() {
    var username = document.getElementById("usernameField").value;
	var password = document.getElementById("passwordField").value;
    var data = "userName=" + username + "&password=" + password;
    var request = new XMLHttpRequest();

    // PASSING false AS THE THIRD PARAMETER TO open SPECIFIES SYNCHRONOUS
    request.open("POST", "http://universe.tc.uvu.edu/cs3550/assignments/PasswordCheck/check.php", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(data);

    if (request.status == 200) {
		var dataSpan = document.getElementById("loginResult");
	
		// FOR MORE INFORMATION ABOUT JSON SEE http://json.org
		var responseJson = JSON.parse(request.responseText);
		
		if (responseJson["result"] == "invalid") {
			dataSpan.innerHTML = "The password was incorrect.";
		}
		else {
			var cookie = "name=" + "3550timestamp";
			cookie += ", property=" + responseJson["userName"] + " " + responseJson["timestamp"];
			dataSpan.innerHTML = "";
			document.cookie = cookie;
			playGame(); // Open the game window.			
		}
    }
}
