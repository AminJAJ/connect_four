var cols = 7;
var rows = 7;
var w = 0; //used to check if someone won or not
var board = [];

//initialize board
function initialize_board() {
	board = [];

	for (var i = 0; i < cols; i++) {
		var row_arr = [];
		for (var j = 0; j < rows - 1; j++){
			row_arr.push(0);
		}
		board.push(row_arr);
	}
	
}

//sets up and generate the maze layout according to cols and rows
function generate(){

	var puzzle = document.getElementById("puzzle");
	puzzle.innerHTML = "";
	for (var i = 0; i < rows; i++){

		var row = document.createElement("div");
		row.setAttribute("class", "row");
		
		for (var j = 0; j < cols; j++){
			
		 	var col = document.createElement("div")
		 	col.setAttribute("class", "col-md-4 col-sm-4");
		 		
		 	var color = "";
		 	 if (i != 0){ 
		 	   rad = "100%";
		 	   col.setAttribute("id",  (rows - i - 1) +"," + j);
		 	   //col.innerHTML = board[i - 1][j];
		 	}
		 	else {
		 		rad = "15px";
		 		col.setAttribute("onClick", "isClicked()");
		 		col.setAttribute("id", j);
		 	 }
		 		col.setAttribute("style", "border-style: solid;border-radius:" + rad + ";"+"width:" + 
		 			(700/rows - cols/5)+ "px;"
		 						 +"height:" + (600/cols - rows) + "px;");


		 	 row.appendChild(col);
		}
		
		puzzle.appendChild(row);
	}
}


function generate_board() {
	
	initialize_board();
	generate();
}

function isClicked() {
    //clear if some one already won
    if (w == 1 || w == 2) {
    	clear();
    	w = 0;
    }

	//getting the element
	var x = event.clientX;     // Get the horizontal coordinate
	var y = event.clientY;	   // get the vertical coordinate 
    var elementMouseIsOver = document.elementFromPoint(x, y);

    var col = elementMouseIsOver.id; 
    var row = -1;
    for (i =0; i < board[col].length; i++) {
    	if (board[col][i] == 0){
    		row = i;
    		break;
    	}
    }

    //get the desired element
     var element = document.getElementById(row +"," + col);
     var play = document.getElementById("player");
    if (player() == "A") {
	    element.style.backgroundColor = "red";
	    board[col][row] = 1;
	    play.innerHTML = "Player B Turn";
	    play.style.color = "blue";
	} else {
		element.style.backgroundColor = "blue";
	    board[col][row] = 2;
	    play.innerHTML = "Player A Turn";
	    play.style.color = "red";
	}

	//check if anyone won
	w = win();
	if (w == 1 ) {
		play.innerHTML = "The first player(red) wins! Congartulations";
		play.style.color = "green";
	} else if (w == 2) {
		play.innerHTML = "The second player(blue) wins! Congartulations";
		play.style.color = "green";
	}
    
}

function player() {
	var play = document.getElementById("player");
	var player_is = "";
	if (play.innerHTML == "Player A Turn") player_is = "A";
	else player_is = "B";

	return player_is;
}

function win() {
	
	//check vertically
	for (var i = 0; i < cols; i++){
		var ele = "";
		for (var j =1; j < board[i].length; j++) {
			
			if (board[i][j] != 0) {
				if (board[i][j] == board[i][j - 1]) ele += board[i][j];
				else ele = "";
			}
			if (ele.length >= 3) {
				console.log(ele[0] + " someone won");
				return ele[0];
			}

		}

	}
	//check horizantally
	for (var i = 0; i < rows - 1; i++){
		 ele = "";
		for (var j =1; j < cols; j++) {
			
			if (board[j][i] != 0) {
				if (board[j][i] == board[j - 1][i]) ele += board[j][i];
				else ele = "";
			}
			if (ele.length == 3) {
				console.log(ele[0] + " someone won vertical");
				return ele[0];
			}

		}
	}
	// check   -
	//       -
	// 
	for (var i = 0; i < cols - 3; i++) {
		for (var j = 0; j <= rows - 4; j++){
			ele = "";
			for (var x = 0; x < 4; x++) {	
				ele += board[i + x][j + x];
			}
			if (ele == "1111" || ele == "2222") {
					console.log(ele[0] + " someone won -+++");
					return ele[0];
			}
		}
	 }

   //check .
   //        .
   //          .


    //console.log(board);
	for (var i = 0; i < cols - 3; i++) {
		for (var j = rows - 2; j >= 3; j--){
			ele = "";
			for (var x = 0; x < 4; x++) {	
				//console.log("x" + x + " i" + i + " j" + j + " " + board[i + x][j - x]);
				ele += board[i + x][j - x];
			}
			//console.log(ele);
			if (ele == "1111" || ele == "2222") {
					console.log(ele[0] + " someone won -***");
					return ele[0];
			}
		}
	 }

}


function clear() {
	for (var i = 0; i < cols; i++) {
		for (j = 0; j < rows - 1; j++) {
			var element = document.getElementById(j+","+i);
			element.style.backgroundColor = "";
			board[i][j] = 0;
		}
	}
}


window.onload = generate_board;


