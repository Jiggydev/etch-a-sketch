//select elements on page: canvas, shake button

const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");

const button = document.querySelector(".shake");
const MOVE_AMOUNT = 30;


//set up canvas for drawing 

// const width = canvas.width;

// const height = canvas.height;

//alternatively use destructuring
const {width, height} = canvas;

//create random x and y starting points on canvas

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);


ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.beginPath(); //put the markerpoint on the canvas
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke(); //move the marker from here
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;


//write draw function
//  function draw(options){
//     console.log(options);
//  }

 //destructured way of writing objects
function draw({key}){
    hue = hue + 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(key);


    //start thr drawing path
    ctx.beginPath();
    ctx.moveTo(x, y);

    //move our x and y values depending on what user did

   switch (key){
    case `ArrowUp`:
        y = y-MOVE_AMOUNT;
        break;

        case `ArrowLeft`:
        x = x-MOVE_AMOUNT;
        break;

        case `ArrowRight`:
        x = x+ MOVE_AMOUNT;
        break;

        case `ArrowDown`:
        y = y + MOVE_AMOUNT;
        break;

        default:
        break;
   }
    ctx.lineTo(x,y);
    ctx.stroke();

    
}





//write handler function for keys

function handleKey(event){

    if(event.key.includes(`Arrow`)){
        event.preventDefault();
        draw({key: event.key}); //destructured way of writing objects
    }   
    };
   




//write function for clear/shake
function clearCanvas(){
    canvas.classList.add(`shake`);
    ctx.clearRect(0,0, width, height); //clear canvas function
    canvas.addEventListener(`animationend`, function(){
        canvas.classList.remove(`shake`);
    },{once: true})
}




//write function to connect button to shake function

button.addEventListener(`click`, clearCanvas );



//listen for arrow keys
window.addEventListener("keydown", handleKey);