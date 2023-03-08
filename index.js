const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const newGamebtn = document.querySelector(".btn")

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//fubnction for initializing the game

function initGame() {
    currentPlayer ="X"
    //current status of the game
    gameGrid = ["","","","","","","","",""]


    boxes.forEach((box) =>{
        box.innerText = ""
        box.style.pointerEvents = "auto"
        box.classList.remove("win")
    });
    
    newGamebtn.classList.remove("active")
    gameInfo.innerText = `Current Player- ${currentPlayer}`
}

initGame()

boxes.forEach((box, index) =>{
    box.addEventListener("click", ()=>{
        handleClick(index)
    })
});

function swapTurn(){
    if(currentPlayer == 'X'){
        currentPlayer ="O"
    }else{
        currentPlayer='X'
    }

    gameInfo.innerHTML = `Current player:- ${currentPlayer}`
}

function checkGameOver(){
    let answer ="";

    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1] !==""] || gameGrid[position[2] !==""]) && (gameGrid[position[0]] ===gameGrid[position[1]] ) && (gameGrid[position[1]] ===gameGrid[position[2]]) ){
            if(gameGrid[position[0]] ==='X'){
                answer = 'X'
            }else{
                answer = 'O'
            }

            //disable poointer Events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none"
            })

            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
            
        }
    })

    if(answer != ""){
        newGamebtn.classList.add("active")
        gameInfo.innerHTML = `Winner is:- ${answer}`
    }
}

function handleClick(index) {
    if(gameGrid[index] == ''){
        boxes[index].innerHTML = currentPlayer
        //insert element and check the current status(inner logic)
        gameGrid[index] = currentPlayer
        //swap the turn
        swapTurn()

        checkGameOver()

        
    }
}

newGamebtn.addEventListener("click", initGame)
