class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
    this.reset = createButton("restart");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  positionElements(){
    this.input.position(width/2-120,height/2-50);
    this.playButton.position(width/2-100, height/2);
    this.titleImg.position(100,50);
    this.reset.position(width-200, 100);
  }

  styleElements(){
    this.input.class('customInput');
    this.playButton.class('customButton');
    this.titleImg.class('gameTitle');
  }

  display(){
    this.positionElements();
    this.styleElements();
    this.handleMousePressed();
  }

  handleMousePressed(){
      this.playButton.mousePressed(()=>{
        console.log(this.input.value());
        playerCount=playerCount+1;
        player.updateCount(playerCount);
        debugger;
        player.name=this.input.value();
        player.id=playerCount;
        player.addPlayer();
        this.input.hide();
        this.playButton.hide();
        this.greeting.html("hello "+player.name)
        this.greeting.position(width/2 - 100, height/2);
      });

      this.reset.mousePressed(()=>{
        player.updateCount(0);
        game.updateState(0);
        database.ref("/").update({
          carsAtEnd:0,
          players:{}
        })
      })
  }

}
