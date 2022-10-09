const canvas = document.querySelector('canvas');
console.log(canvas);
const context = canvas.getContext('2d');

// you can put this in css
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//ads on to the velocity pushing *see the update function
const gravity = 1;

// creates Player object, this is the character we want to control
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        //player is now endangered by the laws of physics (It's part of gravity)
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30

    }
    // this creates our character. Who is a red square right now. 
    draw(){
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }
    //puts velocity into position.
update(){
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    this.draw()

    if (this.position.y +this.height + this.velocity.y <= canvas.height){
    this.velocity.y += gravity;} else { 
        console.log("you lose");
    }
}

}
//  platform class
class Platform{
constructor({x,y,w,h}){
    this.position ={
        x, 
        y
    }

    
    this.width = w
    this.height = h
}

draw() {
    context.fillStyle = "blue"
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
}
}



//initiates our lubley objects
const player = new Player();
const platforms = [new Platform(
   { x:0, y:300, w:400, h:100}
), 
new Platform(
    { x:600, y:400, w:400, h:100}
),
new Platform(
    { x:200, y:200, w:400, h:100}
),
new Platform(
    { x:0, y: 200, w: 75, h:600}
)
];



const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
// player.draw();

let scrollOffset = 0
let onTopOf = false

function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

    if (keys.right.pressed && player.position.x <400){
        scrollOffset +=5
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100){
        scrollOffset -=5
        player.velocity.x = -5;
    } else{
        player.velocity.x=0

        if(keys.right.pressed){
            platforms.forEach(platform => {
            platform.position.x -=5
            })
        } else if (keys.left.pressed){
            platforms.forEach(platform => {
                platform.position.x +=5
            })
            
        }
    }

    if(scrollOffset > 200){
        console.log("you win!");
    }

    platforms.forEach(platform => {
    
    if (player.position.y + player.height<= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >=platform.position.x && player.position.x <= platform.position.x + platform.width){
        onTopOf=true;
    } else{ onTopOf=false}

    if(onTopOf==true){
        player.velocity.y=0
        console.log("on")
    }
    // collision platform left side
    if(onTopOf==false && player.position.x+player.width == platform.position.x && keys.right.pressed && player.position.y <= platform.position.y + platform.height && player.position.y +player.height > platform.position.y){
        player.velocity.x= 0
        platform.position.x =platform.position.x
    } 
    // collision platform right side
    else if(onTopOf==false && player.position.x == platform.position.x + platform.width && keys.left.pressed && player.position.y <= platform.position.y + platform.height && player.position.y +player.height > platform.position.y){
        player.velocity.x= 0
        platform.position.x =platform.position.x
    } 

}) 
}

// calls animation function
animate()



// Keycodes
// A: 65, S: 83, D:68, W:87

//event listeners 
addEventListener("keydown", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log ('left')
            keys.left.pressed=true
            break

            case 83:
            console.log ('down')
            break

            case 68:
            console.log ('right')
            keys.right.pressed=true
            break
            
            case 87:
            console.log ('up')
            if(player.velocity.y===0){
            player.velocity.y -= 20
            }
            console.log(player.velocity.y)
            break
            
    }
})

addEventListener("keyup", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log ('left')
            keys.left.pressed=false
            break

            case 83:
            console.log ('down')
            break

            case 68:
            console.log ('right')
            keys.right.pressed=false
            break
            
            // case 87:
            // console.log ('up')
            // player.velocity.y -= 20
            // break
    }

})