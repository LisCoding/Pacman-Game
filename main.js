//Set up play Area
var world =
[[2,2,2,2,2,2,2,2,2],
[2,0,1,1,1,2,1,1,2],
[2,1,1,4,3,2,1,1,2],
[2,1,1,2,1,1,1,1,2],
[2,3,1,2,2,2,2,1,2],
[2,1,1,1,1,2,0,1,2],
[2,1,0,1,1,2,1,1,2],
[2,1,1,0,3,1,0,1,2],
[2,1,1,1,4,2,2,2,2],
[2,2,2,2,1,1,1,2,2],
[2,0,1,1,1,1,1,1,2],
[2,1,1,1,1,2,1,1,2],
[2,1,1,2,1,1,1,1,2],
[2,1,1,2,2,2,2,1,2],
[2,3,1,4,1,1,0,1,2],
[2,1,1,1,1,0,1,3,2],
[2,1,1,0,1,1,0,1,2],
[2,2,2,2,2,2,2,2,2]
];
var cellSize = 30;
var pacman = {
  x: 1,
  y: 1
}
var ghost1 = {
  x: 3,
  y: 2,
  name: "ghost1",
  dir: 'u'
}
var ghost2 = {
  x: 4,
  y: 8,
  name: "ghost2",
  dir: 'd'
}
var ghost3 = {
  x: 3,
  y: 14,
  name: "ghost3",
  dir: 'l'
}
//declare main variables
var ghosts = [ghost1, ghost2, ghost3];
var score = 0;
var lifes = 3;
var win = false;
//this function is in charge of displaying the pacman world
function displayWorld() {
  var display = "";
  for(var i = 0; i < world.length; i++){
    display += "<div class='row'>";
    for(var j = 0; j < world[i].length; j++){
      var value = world[i][j];
      if(value === 0 || value === 4){
        display += "<div class='empty'></div>"
      }
      else if( value === 2){
        display += "<div class='brick'></div>"
      }
      else if( value === 1){
        display += "<div class='coin'></div>"
      }
      else if( value === 3){
        display += "<div class='cherry'></div>"
      }
    }
    display +="</div>"
  }
  document.getElementById('world').innerHTML = display;
}

//displaying  pacman
function displayPacman() {
  document.getElementById('pacman').style.left = pacman.x*cellSize + "px";
  document.getElementById('pacman').style.top = pacman.y*cellSize + "px";
}

//displaying  Ghost
function displayGhost(ghost) {
  document.getElementById(ghost.name).style.left = ghost.x*cellSize + "px";
  document.getElementById(ghost.name).style.top = ghost.y*cellSize + "px";
}

displayWorld();
displayPacman();

for (var i = 0, len = ghosts.length; i < len; i++) {
  displayGhost(ghosts[i]);
}

//this function is in charge of moving the pacman and moving ghost
function moves() {
  document.onkeydown = function(e) {
    if (lifes < 1 || win) {
      return;
    }

    for (var i = 0, len = ghosts.length; i < len; i++) {
      moveGhost(ghosts[i])
    }
    var dir = e.keyCode;
    var y = pacman.y;
    var x = pacman.x;
    if((dir === 37) && (world[y][x-1] !== 2)){
      document.getElementById('pacman').style.transform = "rotate(180deg)"
      pacman.x --;
    }
    else if((dir === 39) && (world[y][x+1] !== 2)){
      document.getElementById('pacman').style.transform = "rotate(0deg)"
      pacman.x ++;
    }
    else if((dir === 40) && (world[y + 1][x] !== 2)){
      document.getElementById('pacman').style.transform = "rotate(90deg)"
      pacman.y ++;
    }
    else if((dir === 38) && (world[y - 1][x] !== 2)){
      document.getElementById('pacman').style.transform = "rotate(280deg)"
      pacman.y --;
    }
    if(world[pacman.y][pacman.x] === 1){
      world[pacman.y][pacman.x] = 0;
      score += 10;
      document.getElementById('score').innerHTML = score;
      displayWorld();
    }
    else if(world[pacman.y][pacman.x] === 3){
      world[pacman.y][pacman.x] = 0;
      score += 50;
      document.getElementById('score').innerHTML = score;
      displayWorld();
    }

    for (var i = 0, len = ghosts.length; i < len; i++) {
      checkGhostHit(ghosts[i])
    }
    displayPacman();
  }
}

//Keep track of collition and keep track of ghost lifes
function checkGhostHit(ghost) {
  if (ghost.x == pacman.x && ghost.y == pacman.y) {
    displayPacman();
    if (lifes > 1) {
      setTimeout(function() { alert("You lost a life"); }, 50);
      document.getElementById('life' + lifes).style = "display:none";
      lifes--;
    } else if (lifes == 1) {
      setTimeout(function() { alert("You're dead RIP"); }, 50);
      document.getElementById('pacman').style = "display:none";
      document.getElementById('life' + lifes).style = "display:none";
      lifes = 0;
    }
  } else {
    var cleared = true;
    for (var i = 0, len1 = world.length; i < len1 && cleared; i++) {
      row = world[i];
      for (var j = 0, len2 = row.length; j < len2 && cleared; j++) {
        if (world[i][j] == 1) {
          cleared = false;
        }
      }
    }
    if (cleared && win == false) {
      win = true;
      setTimeout(function() { alert("You are a winner!!!"); }, 50);
      var winImg = Math.floor(Math.random() * 2) + 1;
      document.getElementById("wrapper").innerHTML = "<img id='winImg' src='images/win" + winImg + ".gif'>";
    }
  }
}


function moveGhost(ghost) {
  var dx = 0;
  var dy = 0;
  if (ghost.dir == 'u') {
    dy = -1;
  }
  if (ghost.dir == 'd') {
    dy = 1;
  }
  if (ghost.dir == 'l') {
    dx = -1;
  }
  if (ghost.dir == 'r') {
    dx = 1;
  }
  if (world[ghost.y + dy][ghost.x + dx] === 2 || 0 == Math.floor(Math.random() * 5)) {
    var r = Math.floor(Math.random() * 4);
    switch (r) {
      case 0:
      ghost.dir = 'r';
      break;
      case 1:
      ghost.dir = 'l';
      break;
      case 2:
      ghost.dir = 'u';
      break;
      case 3:
      ghost.dir = 'd';
      break;
    }
    moveGhost(ghost);
    return;
  }

  ghost.x += dx;
  ghost.y += dy;

  displayGhost(ghost);
  checkGhostHit(ghost);
}
//This is an optional method in case we would like to move the ghost based in interval
//setInterval(function () {
// for (var i = 0, len = ghosts.length; i < len; i++) {
//   moveGhost(ghosts[i])
// }
//}, 1000)

function game() {
  moves();
}
game();
