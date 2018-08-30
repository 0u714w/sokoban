const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB  BBOW",
    "W   O  W",
    "WWWWWWWW"
];



const main = document.getElementById("maze")

for (let y = 0; y < map.length; y++) {
    let row = map[y];
    let mazeBoard = document.createElement("div");
    mazeBoard.classList.add("mazeRow");

    for (let x = 0; x < row.length; x++) {
        let wall = document.createElement("div")
        wall.dataset.rowIndex = y;
        wall.dataset.cellIndex = x;
        mazeBoard.appendChild(wall);

        switch (row[x]) {
            case "W":
                wall.classList.add("borderWall")
                wall.dataset.cellType = "border";
                break;

            case "S":
                wall.setAttribute("id", "start");
                wall.dataset.cellType = "floor";
                break;

            case "B":
                wall.classList.add("blankSpace");
                wall.dataset.cellType = "floor";
                const box = document.createElement("div");
                box.classList.add("box");
                box.dataset.cellType = "box";
                wall.appendChild(box);
                break;

            case " ":
                wall.classList.add("blankSpace");
                wall.dataset.cellType = "floor";
                break;

            case "O":
                wall.setAttribute("id", "finish");
                wall.dataset.cellType = "floor"
                break;
        }
    }
    main.appendChild(mazeBoard);
}

let boxTop;
let boxLeft;


const token = document.getElementById("token")



let start = document.getElementById("start")
let currentPosition = start;
currentPosition.appendChild(token);



function findNextPosition(element, rowOffset, columnOffset) {
    const nextRowPosition = Number(element.dataset.rowIndex) + rowOffset;
    const nextColumnPosition = Number(element.dataset.cellIndex) + columnOffset;
    const nextCellElement = document.querySelector("[data-row-index = '" + nextRowPosition + "'][data-cell-index = '" + nextColumnPosition + "']");

    return nextCellElement;
}

function checkWin() {
    let winCount = 0;
    const hole = document.querySelectorAll("#finish");
    hole.forEach(element => {
        let foo = element.childElementCount;
        if (foo === 1 && element.firstChild.id !== "token") {
            winCount++;
        }
        if (winCount === 6) {

            setTimeout(function() {
                alert("You Win")
            }, 10);
        }
    })
}



document.addEventListener('keydown', (event) => {
    let nextCell
    let followingCell

    switch (event.key) {

        case 'ArrowUp':
            nextCell = findNextPosition(currentPosition, -1, 0)
            followingCell = findNextPosition(nextCell, -1, 0)
            break;

        case 'ArrowDown':
            nextCell = findNextPosition(currentPosition, +1, 0)
            followingCell = findNextPosition(nextCell, +1, 0)
            break;

        case 'ArrowLeft':
            nextCell = findNextPosition(currentPosition, 0, -1)
            followingCell = findNextPosition(nextCell, 0, -1)
            break;

        case 'ArrowRight':
            nextCell = findNextPosition(currentPosition, 0, +1)
            followingCell = findNextPosition(nextCell, 0, +1)
            break;

    }


    if (nextCell) {

        const box = nextCell.firstElementChild;

        if (box && box.dataset.cellType === "box" &&
            followingCell.dataset.cellType === "floor" &&
            followingCell.childElementCount === 0) {

            followingCell.appendChild(box);

        }

        if (nextCell.dataset.cellType === "floor" && nextCell.childElementCount === 0) {

            nextCell.appendChild(token);
            currentPosition = nextCell;

        }
    }

    checkWin()



})








// document.addEventListener('keydown', (event) => {
//     switch (event.key) {
//         case 'ArrowUp':
//             let nextPositionUp = Number(currentPosition.dataset.rowIndex) - 1;
//             let nextMoveUp = document.querySelector("[data-row-index = '" + nextPositionUp + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
//             if (nextMoveUp.dataset.cellType === "floor") {
//                 nextMoveUp.appendChild(token);
//                 currentPosition = nextMoveUp;


//             }


//             break;
//         case 'ArrowDown':
//             let nextPositionDown = Number(currentPosition.dataset.rowIndex) + 1;
//             let nextMoveDown = document.querySelector("[data-row-index = '" + nextPositionDown + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
//             if (nextMoveDown.dataset.cellType === "floor") {
//                 nextMoveDown.appendChild(token);
//                 currentPosition = nextMoveDown;

//             }


//             break;
//         case 'ArrowLeft':
//             let nextPositionLeft = Number(currentPosition.dataset.cellIndex) - 1;
//             let nextMoveLeft = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionLeft + "']");
//             if (nextMoveLeft.dataset.cellType === "floor") {
//                 nextMoveLeft.appendChild(token);
//                 currentPosition = nextMoveLeft;

//             }


//             break;
//         case 'ArrowRight':
//             let nextPositionRight = Number(currentPosition.dataset.cellIndex) + 1;
//             let nextMoveRight = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionRight + "']");
//             if (nextMoveRight.dataset.cellType === "floor") {
//                 nextMoveRight.appendChild(token);
//                 currentPosition = nextMoveRight;

//             }




//             break;
//     }
//     document.getElementById("token").style.top = boxTop + "px";
//     document.getElementById("token").style.left = boxLeft + "px";
// })