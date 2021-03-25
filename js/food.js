class food {
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.grid = 32;
        this.update();
    }

    // Cập nhật thức ăn
    update(){
        this.x = Math.floor(Math.random() * 15 + 2) * this.grid;
        this.y = Math.floor(Math.random() * 13 + 4) * this.grid;
    }

    // Vẽ thức ăn
    draw(){
        this.imgFood = new Image();
        this.imgFood.src = 'img/food.png';
        this.game.context.drawImage(this.imgFood,this.x,this.y); 
    }

}
