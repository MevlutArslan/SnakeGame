window.onload = () =>{
    const canvas = document.getElementById("snake");
    const ctx = canvas.getContext("2d");
    document.getElementById("replay").onclick = ()=>{
        document.location.reload();
    };
    
    
    
    document.addEventListener("keydown",direction);

    let block = 30;

    let d = "RIGHT";

    function direction(event){
        if(event.keyCode == 39 && d != "LEFT"){
            d = "RIGHT"
        }
        if(event.keyCode == 37 && d != "RIGHT"){
            d = "LEFT"
        }
        if(event.keyCode == 38 && d != "DOWN"){
            d = "UP"
        }
        if(event.keyCode == 40 && d != "UP"){
            d = "DOWN"
        }
    }

   
    
    let food  = {
        x: Math.floor(Math.random() * 20) * block,
        y: Math.floor(Math.random() * 20) * block
    }
    

    let snake = [
        {
            x:block*10,
            y:block*10
        },
        {
            x:block*9,
            y:block*10
        },
        {
            x:block*8,
            y:block*10
        }
    ];

    let points = 0;
    let isDead = false;
    
    function checkCollision(head,body){
        for(let i = 0;i< body.length;i++){
            if(head.x == body[i].x && head.y == body[i].y){
                return true;
            }
        }
        
            return false;
        
    }
        function draw(){
            isDead = false;
            ctx.clearRect(0,0,block*20,block*20);
            
            for(let i = 0; i < snake.length; i++){
    
                let colour = (i == 0) ? "green" : "yellow";
                ctx.fillStyle = colour; 
                ctx.fillRect(snake[i].x,snake[i].y,block,block);
    
                ctx.fillStyle = "black";
                ctx.strokeRect(snake[i].x,snake[i].y,block,block);
            }
    
            ctx.fillStyle = "red";
            ctx.fillRect(food.x,food.y,block,block);
    
            let headX = snake[0].x;
            let headY = snake[0].y;
            
            if( d == "LEFT"){
                headX -= block;
            }
            else if( d == "UP"){
                headY -= block;
            } 
            else if( d == "RIGHT"){
                headX += block;
            } 
            else if( d == "DOWN"){
                headY += block;
            } 

            if(headX == food.x && headY == food.y){
                points++;
                food={
                    x: Math.floor(Math.random() * 20) * block,
                    y: Math.floor(Math.random() * 20) * block
                }
            }else{
                snake.pop();
            }
            let newHead = {
                x: headX,
                y: headY
            };
    
            if(headX < 0-block || headX > block*20 || headY < 0-block || headY > block*20 || checkCollision(newHead,snake)){
               isDead = true;
               clearInterval(gameLoop);
            } 
            
            if(isDead){
                saveScore.style.visibility = "visible";
            }
            
            snake.unshift(newHead);
            ctx.font = "bold 20px Open Sans Blue";
            ctx.textAlign = "left";
            ctx.fillText("Score : " + points, 10,20);
        }
        
    let saveScore = document.getElementById("saveScore")
    saveScore.addEventListener("click",saveS);

    let playerName = document.getElementById("userName");

    let submit = document.getElementById("submitS");
    submit.addEventListener("click",submitScore);



        //functions
        function saveS(){
            console.log("runs")
            playerName.style.visibility = "visible";
            submit.style.visibility = "visible";
        }

        function submitScore(){
            database.collection("HighScores").add({
                name: playerName.value,
                points
            });
        }
  

    const gameLoop = setInterval(draw,100)
}



//Prevent scrolling

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false)







   
