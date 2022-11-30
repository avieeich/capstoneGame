const canvas = document.querySelector('canvas');
console.log(canvas);
const context = canvas.getContext('2d');
const platformImage = document.getElementById("platformImage")

const standRight = document.getElementById("standRight")

const standLeft = document.getElementById("standLeft")

const runRight = document.getElementById("runRight")

const runLeft = document.getElementById("runLeft")
// you can put this in css
canvas.width = window.innerWidth;
canvas.height = 608;

//ads on to the velocity pushing *see the update function
const gravity = 1;

// creates Player object, this is the character we control
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        //player is now endangered by the laws of physics 
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
        this.isAttacking = false

        this.health = 50
        this.facingLeft = false
        this.attackbox = {
            position: this.position,
            width: 70, 
            height: 20
        }

    }

    // this creates our character. Who is a red square right now. 
    draw(){
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box
        if (this.isAttacking===true){
        context.fillStyle='purple';
        context.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)
        }
        
    }
    //puts velocity into position.
update(){
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    this.draw()

    if (this.position.y +this.height + this.velocity.y <= canvas.height){
    this.velocity.y += gravity;}     
    
    
}
attack(){
    this.isAttacking = true
    setTimeout(()=>{
        this.isAttacking=false
    }, 100)
    console.log(this.isAttacking);
}

}

//  platform class
class Platform{
constructor({x,y,w,h}){
    this.position ={
        x, 
        y
    }

    this.velocity = 0
    this.width = w
    this.height = h
    this.image = platformImage
}

draw() {
    context.drawImage(this.image, 0,0,this.width,this.height,this.position.x,this.position.y,this.width,this.height)
}

    
scrollRight(){
this.position.x +=this.velocity

}
scrollLeft(){
    this.position.x -= this.velocity
    
    }
}

class enemyProjectile{
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.width= 10
        this.height=10
    }
    draw() {
        context.fillStyle = "black"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    
    
    }
    

class Enemy {
    constructor({x,y}) {
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width= 30
        this.height= 50
        this.position = {
            x: x, 
            y: y
        }
        this.projectileVelocity
    }
    draw() {
        context.fillStyle = "green"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
  
    shoot(enemyProjectiles){
        enemyProjectiles.push(new enemyProjectile({
            position: {
                x: this.position.x ,
                y: this.position.y + this.height/2
            },
            velocity: {
                 x: this.projectileVelocity,
                y: 0
            }
                }))
    
        }
        scrollRight(num){
            this.position.x +=num
            
            }
            scrollLeft(num){
                this.position.x -=num
                
                }
    
}

class Sweeper{
    constructor({x,y,v}) {
        this.velocity = {
            x: v,
        }
        this.width= 50
        this.height= 20
        this.position = {
            x: x, 
            y: y
        }
        this.sweepIndex = 0
    }
    draw() {
        context.fillStyle = "green"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
    }
    
    
    }

class FinishFlag{
    constructor({x,y}){
        this.position ={
            x, 
            y
        }

        this.width = 10
        this.height = 200
    }
}
// kinda obsolete... but I want it here in case. 
// class Swarm{
//     constructor() {
//         this.position = {
//             x: 0, 
//             y: 0
//         }
//         this.velocity = {
//             x: 0, 
//             y: 0
//         }

//         this.enemies =[]

//         for (let x = 0; x < 2; x++){
//             for (let y = 0; y< 2; y++){
//                 this.enemies.push(new Enemy({position: { 
//                     x: 500 + x * Math.floor(Math.random() * 1000 +40),
//                     y:100 + y * Math.floor(Math.random() * 200 +60)
//                 }}))
//             }
//         }
        
// }
// update(){
//     this.position.x += this.velocity.x
//     this.position.y += this.velocity.y

//     if (this.position.y >= canvas.height){
//         this.velocity.y = -this.velocity
//     }
// }

// }

class HealthBar{
    constructor(){
        this.position = {
            x: 50,
            y: 50
        }
        this.width = player.health*3
        this.height = 20

    }
    draw(){
        context.fillStyle = 'pink';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.width = player.health*3
        this.draw()
        
    }
}    


//initiates our lubley objects
let player = new Player();
let finish = new FinishFlag({x:8600, y:0})
player.health=100
let enemies = [new Enemy(
    {x:835, y: 235}),
    new Enemy(
        {x:2205, y: 345}),
    new Enemy(
        {x:2834, y: 155}),
    new Enemy(
        {x:3158, y: 55}),
    new Enemy(
        {x:4530, y: 355}),
    new Enemy(
        {x:5665, y: 255}),
    new Enemy(
        {x:6080, y: 155}),
    new Enemy(
        {x:7537, y: 385})
]
let sweepers = [new Sweeper(
    {x:1160, y:500, v: 2}
),
new Sweeper(
    {x:2680, y:320, v: 2}
),
new Sweeper(
    {x:4100, y:280, v: 2}
),
new Sweeper(
    {x:6600, y:280, v: 2}
),
new Sweeper(
    {x:7950, y:295, v: 2}
)
]
let healthBar = new HealthBar();
let enemyProjectiles = []
let platforms = [new Platform(
   { x:0, y:400, w:600, h:325}
), 
new Platform(
    { x:680, y:280, w:280, h:500}
),
new Platform(
    { x:1160, y:520, w:697, h:150}
),
new Platform(
    { x:2010, y: 390, w: 250, h:210}
),
new Platform(
    { x:2430, y: 220, w: 168, h:390}
),
new Platform(
    { x:2680, y: 340, w: 600, h:265}
),
new Platform(
    { x:2730, y: 100, w: 600, h:50}
),
new Platform(
    { x:3400, y: 200, w: 100, h:50}
),
new Platform(
    { x:3600, y: 200, w: 100, h:50}
),
new Platform(
    { x:3800, y: 200, w: 100, h:50}
),
new Platform(
    { x:4100, y: 300, w: 400, h:310}
),
new Platform(
    { x:4500, y: 400, w: 330, h:210}
),
new Platform(
    { x:5000, y: 300, w: 220, h:310}
),
new Platform(
    { x:5400, y: 300, w: 100, h:50}
),
new Platform(
    { x:5600, y: 200, w: 100, h:50}
),
new Platform(
    { x:5800, y: 400, w: 100, h:50}
),
new Platform(
    { x:6000, y: 200, w: 100, h:50}
),
new Platform(
    { x:6200, y: 400, w: 100, h:50}
),
new Platform(
    { x:6400, y: 200, w: 100, h:50}
),
new Platform(
    { x:6600, y: 300, w: 450, h:50}
),
new Platform(
    { x:7200, y: 430, w: 600, h:180}
),
new Platform(
    { x:7950, y: 315, w: 300, h:290}
),
new Platform(
    { x:8400, y: 145, w: 700, h:480}
)
];
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    down: {
        pressed: false
    }
}

let scrollOffset = 0
let onTopOf = false
let frames = 0
let fcolliding= false
let bcolliding= false


// reset
function init(){


 player = new Player();
 finish = new FinishFlag({x:8600, y:0})
 player.health=100

let healthBar = new HealthBar();
 enemies =  enemies = [new Enemy(
    {x:835, y: 235}),
    new Enemy(
        {x:2205, y: 345}),
    new Enemy(
        {x:2834, y: 155}),
    new Enemy(
        {x:3158, y: 55}),
    new Enemy(
        {x:4530, y: 355}),
    new Enemy(
        {x:5665, y: 255}),
    new Enemy(
        {x:6080, y: 155}),
    new Enemy(
        {x:7537, y: 385})
]
 enemyProjectiles = []
 sweepers = [new Sweeper(
    {x:1160, y:500, v: 2}
),
new Sweeper(
    {x:2680, y:320, v: 2}
),
new Sweeper(
    {x:4100, y:280, v: 2}
),
new Sweeper(
    {x:6600, y:280, v: 2}
),
new Sweeper(
    {x:7950, y:295, v: 2}
)
]
 platforms = [new Platform(
    { x:0, y:400, w:600, h:325}
), 
new Platform(
    { x:680, y:280, w:280, h:500}
),
new Platform(
    { x:1160, y:520, w:697, h:150}
),
new Platform(
    { x:2010, y: 390, w: 250, h:210}
),
new Platform(
    { x:2430, y: 220, w: 168, h:390}
),
new Platform(
    { x:2680, y: 340, w: 600, h:265}
),
new Platform(
    { x:2730, y: 100, w: 600, h:50}
),
new Platform(
    { x:3400, y: 200, w: 100, h:50}
),
new Platform(
    { x:3600, y: 200, w: 100, h:50}
),
new Platform(
    { x:3800, y: 200, w: 100, h:50}
),
new Platform(
    { x:4100, y: 300, w: 400, h:310}
),
new Platform(
    { x:4500, y: 400, w: 330, h:210}
),
new Platform(
    { x:5000, y: 300, w: 220, h:310}
),
new Platform(
    { x:5400, y: 300, w: 100, h:50}
),
new Platform(
    { x:5600, y: 200, w: 100, h:50}
),
new Platform(
    { x:5800, y: 400, w: 100, h:50}
),
new Platform(
    { x:6000, y: 200, w: 100, h:50}
),
new Platform(
    { x:6200, y: 400, w: 100, h:50}
),
new Platform(
    { x:6400, y: 200, w: 100, h:50}
),
new Platform(
    { x:6600, y: 300, w: 450, h:50}
),
new Platform(
    { x:7200, y: 430, w: 600, h:180}
),
new Platform(
    { x:7950, y: 315, w: 300, h:290}
),
new Platform(
    { x:8400, y: 145, w: 700, h:480}
)
];
 scrollOffset = 0
 onTopOf = false
 frames = 0
 fcolliding=false
 bcolliding=false

}


// player.draw();



// ----------------------ANIMATE------------------------//
function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    healthBar.update()
    sweepers.forEach(sweeper => {
        sweeper.update()
    })
  
 
    


    // attack enemy

   if (player.facingLeft===true){
    player.attackbox.width = -40
   } 
   else if (keys.right.pressed) {
    player.attackbox.width = 70
   }

    enemies.forEach ((enemy, i)=> {
        if(keys.down.pressed===false && player.attackbox.position.x + player.attackbox.width >= enemy.position.x && player.attackbox.position.x+player.attackbox.width-player.width <= enemy.position.x+enemy.width && player.attackbox.position.y+player.attackbox.height>= enemy.position.y && player.attackbox.position.y< enemy.position.y+enemy.height && player.isAttacking===true){
            setTimeout(()=> {
                
                enemies.splice(i, 1)
            })
        }
      
    })
    
    
// enemies shoot
        enemies.forEach (enemy => {
            if (player.position.x < enemy.position.x) {
                enemy.projectileVelocity= -10
            } else if (player.position.x >enemy.position.x){
                enemy.projectileVelocity = 10
            }
            enemy.draw()
        if ( frames % 100 ===0 || frames%100 === 10 || frames%100 === 20 && enemy.position.x<=canvas.width && enemy.position.x>= 0){
            enemy.shoot(enemyProjectiles)
        } 
        })

        // hitting player
    enemyProjectiles.forEach((enemyProjectile, i) => {
        if(enemyProjectile.position.x >= player.position.x && enemyProjectile.position.x <= player.position.x+player.width && enemyProjectile.position.y+enemyProjectile.height >= player.position.y && enemyProjectile.position.y <= player.position.y+player.height){
            player.health -=5
            setTimeout(()=> {
                enemyProjectiles.splice(i, 1)
            })
        } else{
        enemyProjectile.update()
        }
        if(enemyProjectile.position.x<0 || enemyProjectile.position.x> canvas.width-100){
            setTimeout(()=> {
                enemyProjectiles.splice(i, 1)
            })
        }
    })
   


    platforms.forEach(platform => {
        platform.draw()
    })

    if (fcolliding===true){
        platforms.forEach(platform => 
            platform.velocity=0) 
    } else if (fcolliding===false){
        
        platforms.forEach(platform => 
            platform.velocity=5) 
    }


    if (keys.left.pressed){
        player.facingLeft = true
    } else {
        player.facingLeft= false
    }

    if (keys.right.pressed && player.position.x <400){
        
        player.velocity.x = 5
        player.facingLeft= false

    } else if (keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5;
    } else{
        player.velocity.x=0

        if(keys.right.pressed){
            platforms.forEach(platform => {
            platform.scrollLeft()
            })
            enemies.forEach(enemy => {
                enemy.scrollLeft(5)
                })
            
               
            scrollOffset +=5
        } else if (keys.left.pressed){
            platforms.forEach(platform => {
            platform.scrollRight()
                })
             enemies.forEach(enemy => {
                enemy.scrollRight(5)
                        })
                scrollOffset -=5
            
        }
    }

enemies.forEach(enemy =>{

   
        
        enemyProjectiles.forEach(enemyProjectile =>{
            if( keys.right.pressed && player.position.x >= 400 && enemyProjectile.position.x< enemy.position.x+enemy.width){
            enemyProjectile.position.x-=.5
            } else if(keys.left.pressed && player.position.x<=100 && enemyProjectile.position.x<enemy.position.x+enemy.width){
                enemyProjectile.position.x+=.2;
            } else if( keys.right.pressed && player.position.x >=400 && enemyProjectile.position.x >enemy.position.x+enemy.width){
                enemyProjectile.position.x -= 0
            } else if(keys.left.pressed && player.position.x<=100 && enemyProjectile.position.x>enemy.position.x+enemy.width){
                enemyProjectile.position.x+=0;
            } 
        })
})



   
    if(player.position.x+player.width >= platforms[platforms.length-1].position.x+platforms[platforms.length-1].width%2){
        alert("you win!!!");
        init()
    }

// lose
if(player.position.y > canvas.height) {
   init()

}


    platforms.forEach(platform => {
    
    if (player.position.y + player.height<= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >=platform.position.x && player.position.x <= platform.position.x + platform.width){
        onTopOf=true;
    } else{ onTopOf=false}

    if(onTopOf==true){
        player.velocity.y=0
    }
    // collision platform left side
    if(keys.right.pressed && player.position.x+player.width >= platform.position.x && player.position.x+player.width <platform.position.x+platform.width && player.position.y < platform.position.y + platform.height && player.position.y +player.height >= platform.position.y){
        player.position.x-= 5

    } 
    // collision platform right side
    else if(keys.left.pressed && player.position.x <= platform.position.x+platform.width && player.position.x+player.width >= platform.position.x && player.position.y < platform.position.y + platform.height && player.position.y +player.height >= platform.position.y){
        player.position.x+= 5
    } 

}) 

// Collision with enemies 
enemies.forEach(enemy =>{
    if(player.position.x+player.width >= enemy.position.x && player.position.x+player.width <enemy.position.x+enemy.width && player.position.y < enemy.position.y + enemy.height && player.position.y +player.height >= enemy.position.y){
        player.position.x-= 10
        player.health-=1
    } 

    else if(player.position.x <= enemy.position.x+enemy.width && player.position.x+player.width >= enemy.position.x && player.position.y < enemy.position.y + enemy.height && player.position.y +player.height >= enemy.position.y){
        player.position.x+= 10
        player.health-=1
    } 
})

// sweepers 
sweepers.forEach(sweeper=>{
    platforms.forEach(platform =>{
        if (sweeper.position.y ===platform.position.y-20 && sweeper.position.x >= platform.position.x && sweeper.position.x +sweeper.width <= platform.position.x+platform.width){
            sweeper.sweepIndex = platforms.indexOf(platform)
        }
        if(sweeper.position.y === platforms[sweeper.sweepIndex].position.y-20 && sweeper.position.x+sweeper.width>=platforms[sweeper.sweepIndex].position.x+platforms[sweeper.sweepIndex].width ){
           sweeper.velocity.x= -2
        } else if (sweeper.position.y === platforms[sweeper.sweepIndex].position.y-20 && sweeper.position.x<=platforms[sweeper.sweepIndex].position.x){
            sweeper.velocity.x = 2
        }
        
    })
})
// scrolling compensation
sweepers.forEach( sweeper=> {
    if(keys.right.pressed && player.position.x === 400 && sweeper.velocity.x===2){
        sweeper.position.x -=5

    } else if(keys.right.pressed && player.position.x === 400 && sweeper.velocity.x===-2){
        sweeper.position.x -=5

    } else if(keys.left.pressed && player.position.x === 100 && sweeper.velocity.x===2){
        sweeper.position.x +=5

    } else if(keys.right.pressed && player.position.x === 100 && sweeper.velocity.x===-2){
        sweeper.position.x +=5

    }
})
// collision with sweeper
sweepers.forEach(sweeper =>{
    if(player.position.x+player.width >= sweeper.position.x && player.position.x+player.width <sweeper.position.x+sweeper.width && player.position.y < sweeper.position.y + sweeper.height && player.position.y +player.height >= sweeper.position.y){
        player.position.x-= 15
        player.health-=5
    } 

    else if(player.position.x <= sweeper.position.x+sweeper.width && player.position.x+player.width >= sweeper.position.x && player.position.y < sweeper.position.y + sweeper.height && player.position.y +player.height >= sweeper.position.y){
        player.position.x+= 15
        player.health-=5
    } 
})

// attacking sweeper
if (player.facingLeft===true){
    player.attackbox.width = -40
   } 
   else if (keys.right.pressed) {
    player.attackbox.width = 70
   }

    sweepers.forEach ((sweeper, i)=> {
        if(keys.down.pressed && player.attackbox.position.x + player.attackbox.width >= sweeper.position.x && player.attackbox.position.x+player.attackbox.width-player.width <= sweeper.position.x+sweeper.width && player.attackbox.position.y+player.attackbox.height>= sweeper.position.y && player.attackbox.position.y< sweeper.position.y+sweeper.height && player.isAttacking===true){
            console.log('downstrike!')
            setTimeout(()=> {
                sweepers.splice(i, 1)
            })
        }
      
    })


// spawn enemies

frames++

if ( player.facingLeft===true){
    console.log("facing left")
}

// console.log(scrollOffset)
if (player.health<=0){
    init()
}


// end animate loop
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
            keys.down.pressed=true
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
            
            case 32:
                player.attack()
                console.log('hya')
                break

    }
})

addEventListener("keyup", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log ('left release')
            keys.left.pressed=false
            break

            case 83:
            keys.down.pressed=false
            console.log ('down release')
            break

            case 68:
            console.log ('right release')
            keys.right.pressed=false
            break
            
            
            // case 87:
            // console.log ('up')
            // player.velocity.y -= 20
            // break
    }

})