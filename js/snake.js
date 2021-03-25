'use strict';
class snake{
    constructor(game){
        this.game = game;
        this.grid = 32;
        this.x = 9 * this.grid;
        this.y = 10 * this.grid;
        this.dx = 0;
        this.dy = 0;
        this.cell = [];
        this.maxCell = 1;
    }

    update(){
        // Cập nhật tọa độ        
        this.x += this.dx;
        this.y += this.dy;

        // Cập nhật thân rắn
        this.cell.unshift({
            x: this.x,
            y: this.y
        });
        if(this.cell.length > this.maxCell){
            this.cell.pop();
        }
        
        // kiểm tra sự kiện keydown
        this.catchHandle();
        
    }

    // Vẽ rắn
    draw(){
        for(let i = 0; i < this.cell.length; i++ ){
            this.game.context.fillStyle = (i == 0)? 'rgb(3, 68, 25' : 'white';
            this.game.context.fillRect(this.cell[i].x,this.cell[i].y,this.grid,this.grid);
        }        
    }
    
    // Hàm bBắt sự kiện di chuyển bằn phím
    catchHandle(){
        document.addEventListener('keydown',(e)=>{
            switch(true){
                case e.which ==  37 && this.dx == 0:
                    this.left = new Audio();
                    this.left.src = 'audio/left.mp3';
                    this.left.play();
                    this.dx = -this.grid;
                    this.dy = 0;
                    this.game.start = true;
                    break;
                case e.which ==  38 && this.dy == 0 :
                    this.up = new Audio();
                    this.up.src = 'audio/up.mp3';
                    this.up.play();
                    this.dy = -this.grid;
                    this.dx = 0;
                    this.game.start = true;
                    break;
                case e.which ==  39 && this.dx == 0 :
                    this.right = new Audio();
                    this.right.src = 'audio/right.mp3';
                    this.right.play();
                    this.dx = +this.grid;
                    this.dy = 0;
                    this.game.start = true;
                    break;
                case e.which ==  40 && this.dy == 0 :
                    this.down = new Audio();
                    this.down.src = 'audio/down.mp3';
                    this.down.play();
                    this.dy = +this.grid;
                    this.dx = 0;
                    this.game.start = true;
                    break;

            }            
        });
    }

    // Hàm sự kiện rắng ăn 
    eat(x,y) {
        if(this.x == x && this.y == y){
            this.maxCell++;
            this.eatFood = new Audio();
            this.eatFood.src = 'audio/eat.mp3'
            this.eatFood.play();
            return true;
        }
        return false;
    }

    // Thua
    checkEndGame(){
        if (
            this.x < this.grid ||
            this.x > 17 * this.grid ||
            this.y < 3 * this.grid ||
            this.y > 17 * this.grid ||
            this.checkEatSnake()
            ) {
            
                this.dead = new Audio();
                this.dead.src = 'audio/dead.mp3';
                this.dead.play();
                return true;
            }
    }

    checkEatSnake(){
        // for(let i = 1; i < this.cell.length; i++){
        //     if( this.x == this.cell[i].x  && this.y == this.cell[i].y){
        //         return true;
        //     } else return false; 

        // }

    }
}