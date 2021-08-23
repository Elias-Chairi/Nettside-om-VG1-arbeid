let antallBaller;
let ballHastighet;
let botHastighet;
let ballStorrelse = 20
let tidVedStart = 0;
let økningsTeller = 1;
let ballMaxFart;

let gjorEnGang = false;
let gjorEnGang2 = false;
let gjorEnGang3 = false;
let gjorEnGang4 = false;
let gjorEnGang5 = false;
let gjorEnGang6 = false;
let timerBall2 = 0;
let timerBall3 = 0;
let timerBall4 = 0;
let timerBall5 = 0;
let timerBall6 = 0;

let rekkertLengde = 100;
let rekkertTykkelse = 20;

let baller = [];
let rekkert1;
let rekkert2;

let RETNING;
let RETNING2;

let detteErVansklig = false;
let start;
let etterKnappenErTrykket = false;
let spilletErFerdig = false;
let duTapte = false;


function setup() {
  createCanvas(500, 700);

  rekkert1 = new rekkert(height - 70); // bestemmer høyde
  rekkert2 = new rekkert(70);
  rekkert2.x = width / 2; //startPos

  start = new startMeny();

}


function draw() {
  background(220);

  if (spilletErFerdig === false) {

    if (etterKnappenErTrykket === true) {

      rectMode(CENTER);
      noFill();
      stroke(150);
      rect(width / 2, height / 2, 150); // dette er pyntefirkanten

      //Fartsøkning
      {
        if (tidVedStart !== 0 && tidVedStart + 50 < millis() && baller[0].xFart < ballMaxFart && baller[0].xFart > -ballMaxFart) { // fartsøkning

          if (baller[0].xFart > 0) {
            baller[0].xFart = baller[0].xFart + 0.01;
          } else {
            baller[0].xFart = baller[0].xFart - 0.01;
          }

          if (baller[0].yFart > 0) {
            baller[0].yFart = baller[0].yFart + 0.01;
          } else {
            baller[0].yFart = baller[0].yFart - 0.01;
          }


          if (økningsTeller === 100) { //  økning i bothastighet
            botHastighet = 2.5
          }
          if (økningsTeller === 200) {
            botHastighet = 5;
          }
          if (økningsTeller === 300 && detteErVansklig === true) {
            botHastighet = 8;
          }

          økningsTeller = økningsTeller + 1;

          tidVedStart = millis();
        }
      }

      rekkert1.display();
      rekkert1.move();

      rekkert2.display();
      rekkert2.moveBot();


      for (let i = 0; i <= baller.length - 1; i = i + 1) {
        baller[i].display();
        baller[i].move();
        baller[i].sprett();
      }

      ////MEDIUM og VANSKLIG endringer underveis
      {
        if (baller[0].xFart > ballMaxFart && gjorEnGang === false && baller[0].y > height - 100) { //MEDIUM og VANSKLIG ball 2
          if (detteErVansklig === true) {
            ballHastighet = 8;
            botHastighet = 15;
          } else {
            ballHastighet = 5;
            botHastighet = 10;
          }
          pushNyBall(random(0, width - ballStorrelse), 95);
          baller[1].yFart = ballHastighet;
          gjorEnGang = true;
          timerBall2 = millis() + 5000;
        }

        if (timerBall2 !== 0 && timerBall2 < millis() && gjorEnGang2 === false) { //MEDIUM og VANSKLIG ball 3
          if (detteErVansklig === true) {
            ballHastighet = 8;
            botHastighet = 20;
          } else {
            ballHastighet = 5;
            botHastighet = 15;
          }
          pushNyBall(random(0, width - ballStorrelse), 95);
          baller[2].yFart = ballHastighet;
          gjorEnGang2 = true;
          timerBall3 = millis() + 5000;
        }

        if (timerBall3 !== 0 && timerBall3 < millis() && gjorEnGang3 === false) { //MEDIUM og VANSKLIG ball 4
          if (detteErVansklig === true) {
            ballHastighet = 8;
            botHastighet = 45;
          } else {
            ballHastighet = 5;
            botHastighet = 30;
          }
          pushNyBall(random(0, width - ballStorrelse), 95);
          baller[3].yFart = ballHastighet;
          gjorEnGang3 = true;
          timerBall4 = millis() + 5000;
        }

        if (timerBall4 !== 0 && timerBall4 < millis() && gjorEnGang4 === false) { //MEDIUM og VANSKLIG ball 5
          if (detteErVansklig === true) {
            ballHastighet = 8;
          } else {
            ballHastighet = 5;
          }
          pushNyBall(random(0, width - ballStorrelse), 95);
          baller[4].yFart = ballHastighet;
          gjorEnGang4 = true;
          timerBall5 = millis() + 5000;
        }

        if (timerBall5 !== 0 && timerBall5 < millis() && gjorEnGang5 === false) { //MEDIUM og VANSKLIG ball 6
          if (detteErVansklig === true) {
            ballHastighet = 8;
          } else {
            ballHastighet = 5;
          }
          pushNyBall(random(0, width - ballStorrelse), 95);
          baller[5].yFart = ballHastighet;
          gjorEnGang5 = true;
          timerBall6 = millis() + 5000;
        }

        if (timerBall6 !== 0 && timerBall6 < millis() && gjorEnGang6 === false) { //MEDIUM og VANSKLIG ball 7
          if (detteErVansklig === true) {
            ballHastighet = 8;
          } else {
            ballHastighet = 5;
          }
          pushNyBall(random(0, width - ballStorrelse), 95);
          baller[6].yFart = ballHastighet;
          gjorEnGang6 = true;
        }
      }


    } else {
      start.display();
      start.trykk();
    }


  } else {

    if (duTapte === true) { // taper-skjerm
      rectMode(CORNER);
      fill("red");
      rect(0, 0, width, height);
      fill(255);
      textSize(80);
      text("Du tapte", width / 2, height / 2);
    } else { // vinner-skjerm
      rectMode(CORNER);
      fill("green");
      rect(0, 0, width, height);
      fill(255);
      textSize(80);
      text("Du vant", width / 2, height / 2);
    }
  }
}


class ball {

  constructor(x, y, xFart, yFart) {
    this.x = x;
    this.y = y;
    this.xFart = xFart;
    this.yFart = yFart;
  }

  display() {
    noStroke();
    fill(0);
    rectMode(CORNER);
    rect(this.x, this.y, ballStorrelse);
  }

  move() {
    this.x = this.x + this.xFart;
    this.y = this.y + this.yFart;

    if (this.y < 0 - ballStorrelse) { //vinn
      spilletErFerdig = true;
    }
    if (this.y > height) { //tap
      spilletErFerdig = true;
      duTapte = true;
    }
  }

  sprett() {
    if (this.x > width - ballStorrelse || this.x < 0) { // sprett i veggene
      this.xFart = this.xFart * -1;
    }

    if (this.y + ballStorrelse > rekkert1.y - rekkertTykkelse / 2 && this.y + ballStorrelse < rekkert1.y + rekkertTykkelse / 2 - 1 && this.x > rekkert1.x - rekkertLengde / 2 - ballStorrelse && this.x < rekkert1.x + rekkertLengde / 2) { // sprett i hovedrekkert
      this.yFart = this.yFart * -1;
    }

    if (this.y > rekkert2.y - rekkertTykkelse / 2 && this.y < rekkert2.y + rekkertTykkelse / 2 - 1 && this.x > rekkert2.x - rekkertLengde / 2 - ballStorrelse && this.x < rekkert2.x + rekkertLengde / 2) { // sprett i bot-rekkert
      this.yFart = this.yFart * -1;
    }
  }
}

class rekkert {

  constructor(y) { //y = høyde
    this.x = mouseX;
    this.y = y;
  }

  display() {
    stroke(0);
    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, rekkertLengde, rekkertTykkelse); //begge blir vist/de ser like ut
  }

  move() {
    this.x = mouseX;
  }

  moveBot() {
    for (let i = 0; i < baller.length; i = i + 1) {

      if (baller[i].y < width / 2 && baller[i].y > 0 && baller[i].yFart < 0) { // gå etter ballen
        if (baller[i].x + ballStorrelse / 2 > this.x) {
          this.x = this.x + botHastighet;
        } else {
          this.x = this.x - botHastighet;
        }
      }
    }
  }

}

class startMeny {

  constructor() { //y = høyde
    this.x = width / 3;
    this.y = height / 6;

    stroke(0);
    strokeWeight(4);
    textSize(40);
    textAlign(CENTER);
  }

  display() { // gjør at fargen blir litt mørkere når du har musa over
    if (mouseX > this.x && mouseX < this.x + width / 3 &&
      mouseY > this.y * 2 && mouseY < this.y * 2 + 50) {
      fill(200);
    } else {
      fill(255)
    }
    rect(this.x, this.y * 2, width / 3, 50);
    text("lett", this.x + width / 3 / 2, this.y * 2 + 40);

    if (mouseX > this.x && mouseX < this.x + width / 3 &&
      mouseY > this.y * 3 && mouseY < this.y * 3 + 50) {
      fill(200);
    } else {
      fill(255)
    }
    rect(this.x, this.y * 3, width / 3, 50);
    text("medium", this.x + width / 3 / 2, this.y * 3 + 40);

    if (mouseX > this.x && mouseX < this.x + width / 3 &&
      mouseY > this.y * 4 && mouseY < this.y * 4 + 50) {
      fill(200);
    } else {
      fill(255)
    }
    rect(this.x, this.y * 4, width / 3, 50);
    text("vansklig", this.x + width / 3 / 2, this.y * 4 + 40);

  }

  trykk() {
    if (mouseX > this.x && mouseX < this.x + width / 3 &&
      mouseY > this.y * 2 && mouseY < this.y * 2 + 50 && mouseIsPressed) { //lett
      etterKnappenErTrykket = true;
      ballHastighet = 1;
      botHastighet = 1.4;
      pushNyBall(random(width / 2 - 75, width / 2 + 75 - ballStorrelse), random(height / 2 - 75, height / 2 + 75 - ballStorrelse));
      ballMaxFart = 100;
      tidVedStart = millis(); // starter hastighetsøkning
    }

    if (mouseX > this.x && mouseX < this.x + width / 3 &&
      mouseY > this.y * 3 && mouseY < this.y * 3 + 50 && mouseIsPressed) { //medium
      etterKnappenErTrykket = true;
      ballHastighet = 1;
      botHastighet = 1.4;
      pushNyBall(random(width / 2 - 75, width / 2 + 75 - ballStorrelse), random(height / 2 - 75, height / 2 + 75 - ballStorrelse));
      ballMaxFart = 5;
      tidVedStart = millis(); // starter hastighetsøkning
    }

    if (mouseX > this.x && mouseX < this.x + width / 3 &&
      mouseY > this.y * 4 && mouseY < this.y * 4 + 50 && mouseIsPressed) { //vansklig
      etterKnappenErTrykket = true;
      ballHastighet = 1;
      botHastighet = 1.4;
      pushNyBall(random(width / 2 - 75, width / 2 + 75 - ballStorrelse), random(height / 2 - 75, height / 2 + 75 - ballStorrelse));
      ballMaxFart = 8;
      tidVedStart = millis(); // starter hastighetsøkning
      detteErVansklig = true;
    }


  }

}

function pushNyBall(x, y) {

  let startRetning = int(random(1, 3));
  let startRetning2 = int(random(1, 3));

  if (startRetning === 1) {
    RETNING = ballHastighet;
  } else {
    RETNING = -ballHastighet;
  }
  if (startRetning2 === 1) {
    RETNING2 = ballHastighet;
  } else {
    RETNING2 = -ballHastighet;
  }
    // velger om x- og y-fart skal starte negativt eller positivt
  baller.push(new ball(x, y, RETNING, RETNING2));

}
