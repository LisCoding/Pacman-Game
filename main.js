var world =
[[2,2,2,2,2,2,2,2,2],
 [2,1,1,1,1,1,1,1,2],
 [2,2,1,0,1,2,1,1,2],
 [2,1,1,2,1,1,1,1,2],
 [2,1,1,1,1,1,1,1,2],
 [2,1,1,0,1,1,0,1,2],
 [2,1,0,1,1,0,1,1,2],
 [2,1,1,1,1,2,1,1,2],
 [2,1,1,1,1,2,1,1,2],
 [2,1,1,2,2,2,1,2,2],
 [2,1,1,1,1,1,1,1,2],
 [2,1,1,0,1,1,1,1,2],
 [2,1,1,1,2,1,1,1,2],
 [2,1,1,1,1,1,1,1,2],
 [2,1,1,0,2,1,0,1,2],
 [2,1,0,1,1,0,1,1,2],
 [2,1,2,1,1,1,1,1,2],
 [2,2,2,2,2,2,2,2,2]
];
console.log(world);
function displayWorld() {
  var display = "";
  for(var i = 0; i < world.length; i++){
    display += "<div class='row'>";
    for(var j = 0; j < world[i].length; j++){
      var value = world[i][j];
      if(value === 0){
        display += "<div class='empty'></div>"
      }
      else if( value === 2){
        display += "<div class='brick'></div>"
      }
      else if( value === 1){
        display += "<div class='coin'></div>"
      }
    }
    display +="</div>"
  }
  document.getElementById('world').innerHTML = display;
}
displayWorld();

function displayPacman() {
  document.getElementById('pacman').style.left = pacman;

}
