class DVD {
  constructor(surface, logo) {
    this.s = surface
    //dimentions
    this.width = this.s.width;
    this.height = this.s.height;
    this.offsetX =  this.width/20 //10% of the width IDK just because graphics traslation or some shit  
    this.offsetY =  this.height/20 //10% of the height
    //positionm
    this.posX = random(-this.width / 2, this.width / 2);
    this.posY = random(-this.height / 2, this.height / 2);
    //speed
    this.speedX = 1;
    this.speedY = 1;
    //image
    this.logo = logo;
    this.logoW = this.width/5;
    this.logoH = this.height/5;
    //color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    //hit corner // counter
    this.corner = 0;
  }

  doTheThing() {
    this.setBgColor();
    this.bounce();
    this.detectCorner();
    this.showLogo();
  }

  bounce() {
    //movement
    this.posX = this.posX + this.speedX;
    this.posY = this.posY + this.speedY;

    //x axis bounce
    if (this.posX + this.logoW >= (this.width/2 - this.offsetX)) {
      this.speedX = -this.speedX;
      this.posX = (this.width/2 - this.offsetX) - this.logoW;

      this.changeLogoColor();

    } else if (this.posX <= -this.width/2) {
      this.speedX = -this.speedX;
      this.posX = -this.width/2;

      this.changeLogoColor();
    }
    //y axis bounce
    if (this.posY + this.logoH >= (this.height/2 - this.offsetY) ) {
      this.speedY = -this.speedY;
      this.posY = (this.height/2-this.offsetY) - this.logoH;

      this.changeLogoColor();

    } else if (this.posY <= -this.height / 2) {
      this.speedY = -this.speedY;
      this.posY = -this.height / 2;

      this.changeLogoColor();
    }
  }
 
  detectCorner(){
    if (this.posX === -this.width / 2 && this.posY === -this.height / 2){
      this.corner = 100;
    }else if(this.posX === -this.width / 2 && this.posY === (this.height/2-this.offsetY  - this.logoH)){
      this.corner = 100;
    }else if(this.posX === (this.width/2-this.offsetX-this.logoW) && this.posY === -this.height / 2){
      this.corner = 100;
    }else if(this.posX === (this.width/2-this.offsetX-this.logoW) && this.posY === (this.height/2-this.offsetY  - this.logoH)){
      this.corner = 100;
    }
  }

  changeLogoColor() {
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  changeBgColor() {
    this.s.background(random(255), random(255), random(255));
    this.corner = this.corner - 1;
  }

  setBgColor(){
    if (this.corner === 0) {
      this.s.clear();
    } else {
      this.changeBgColor();
    }
  }

  showLogo() {
    this.s.tint(this.r, this.g, this.b);
    this.s.image(this.logo, this.posX, this.posY, this.logoW, this.logoH);
  }

}
