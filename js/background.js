class background {
    constructor(game){
        this.game = game;
    }

    draw(){
        this.game.canvas.width = 608;
        this.game.canvas.height = 608;
        this.imgBG = new Image();
        this.imgBG.src = 'img/ground.png';
        this.game.context.drawImage(this.imgBG,0,0,608,608);
    }

}