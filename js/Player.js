class Player {
  constructor() {
    this.name = null;
    this.id = null;
    this.positionX = 0;
    this.positionY = 0;
    this.fuel = 185;
    this.score = 0;
    this.rank = 0;
  }
  getCount(){
    var playerRef=database.ref("playerCount");
    playerRef.on("value",(data)=>{
      playerCount=data.val();
    })
  }

  updateCount(count){
    
    var playerRef=database.ref("/");
    playerRef.update({
      playerCount: count
    })
  }
  addPlayer(){
    var path = "players/player"+this.id;
    var playerRef=database.ref(path);
    playerRef.update({
      name: this.name,
      id:this.id,
      positionX : this.positionX,
      positionY : this.positionY,
      fuel:this.fuel,
      score:this.score,
      rank:this.rank
      
    })
  }
  updatePlayer(){
    var path = "players/player"+this.id;
    var playerRef=database.ref(path);
    playerRef.update({
      positionX : this.positionX,
      positionY : this.positionY,
      fuel: this.fuel,
      score: this.score,
      rank:this.rank
    })
  }
  static getAllPlayers(){
    var playersRef=database.ref("players");
    playersRef.on("value", (data)=>{
      allPlayers= data.val();
    })
  }
  getCarsAtEnd(){
    var carAtEnd = database.ref("carsAtEnd");
    carAtEnd.on("value", (data)=>{
      this.rank = data.val();
    })
  }
  static updateCarsAtEnd(count){
    var carsAtEnd=database.ref("/")
    carsAtEnd.update({
      carsAtEnd : count
    })
  }
}
