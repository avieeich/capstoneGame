const canvas = document.querySelector('canvas');
console.log(canvas);
const context = canvas.getContext('2d');

// you can put this in css
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(context);

// creates Player object, this is the character we want to control
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 30
        this.height = 30
    }
    // this creates our character. Who is a red square right now. 
    draw(){
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }
}
//initiates our player object
const player = new Player();
player.draw();