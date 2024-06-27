// array of clues
var arrWords = ["JavaScript", "Cascading", "HTML"]
// set up a nickname/short cut/pointer to the table in the HTML
var table = document.getElementById("tblPuzzle");

// this function will buld the table which will be the foundation for the crossword puzzle
function buildTable(){
    // let's build the table rows and columns with a for loop
    for (var i=0; i < 10; i++){
        // create a new row each time this runs, so we end up with 10 rows
        var row = document.createElement("tr");

        // nested for loop to create the columns
        for (var j = 0; j < 10; j++){
            // create a column and then add it to the row
            var col = document.createElement("td");
            // add our brand new column to the row we created in the outer for loop
            row.appendChild(col);
        }
        // add the row with all the columns to the table
        table.appendChild(row);
    }
}

// this function will add out clues to the table
function buildClues(wordIndex, direction, startingRow, startingCol, table, showAnswer){
    // for loop to go through the letters and add them to the table
    for (var i=0; i < arrWords[wordIndex].length; i++){
        var tr;
        var td;
        var rowIndex = 0;
        var colIndex = 0;
        
        // if the word goes across, it will stay in the same row, and move over 1 column each time the loop runs
        if (direction == "across"){
            rowIndex = startingRow;
            colIndex = startingCol + i;
        }
        // if the word goes down, it will stay in the same column, and move down 1 row each time the loop runs
        else if (direction == "down"){
            rowIndex = startingRow + i;
            colIndex = startingCol;
        }
        // catch all - invalid input
        else{
            console.log("Huh?");
        }

        // get the relevant row from the table
        tr = table.rows[rowIndex];
        // get the relevant column from the table
        td = tr.cells[colIndex];

        // if no children have been added to the td/cell, then add an input box
        // this prevents multiple input boxes from being added to the same cell
        if (td.childElementCount == 0){
            // set up a text box that allows for 1 letter
            var input = document.createElement("input");
            input.setAttribute("maxLength", "1");
            if (showAnswer){
                // add the letter to the text box
                input.value = arrWords[wordIndex][i].toUpperCase();
            }
            // add the text box to the table cell
            td.appendChild(input);
        }
        else if (showAnswer){
        // if the text box already exists, find it and add the letter to it
            var existingInput = td.getElementsByTagName("input")[0];
            existingInput.value = arrWords[wordIndex][i].toUpperCase();
        }
            
            
        }
    }

// this function will call build clues for each clue and show the answer in the text box
function revealAnswers(){
    buildClues(0, "across", 1, 0, table, true);
    buildClues(1, "down", 0, 1, table, true);
    buildClues(2, "down", 0, 9, table, true);
}

buildTable(table);
// call the build clues function to add the first word to the 2nd row
buildClues(0, "across", 1, 0, table, false);
buildClues(1, "down", 0, 1, table, false);
buildClues(2, "down", 0, 9, table, false);