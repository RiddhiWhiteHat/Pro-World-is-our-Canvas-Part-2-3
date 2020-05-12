var database

var drawing = [];
var currentPath,button2,title,title2,title3,show,clearButton,erase , hi = 1;
var isDrawing = false;
var sprite = [];


function setup(){
  canvas = createCanvas(400,400);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);


  button2 = createButton('Upload on Canvas');
  button2.position(10,420)

  button2.size(100,50);
  button2.mousePressed(showDrawing,)
  
  var config = {
    apiKey: "AIzaSyD3Nvy2OOYEjeik3tPG1I7wqoA1WXIkyJo",
    authDomain: "the-world-is-our-canvas.firebaseapp.com",
    databaseURL: "https://the-world-is-our-canvas.firebaseio.com",
    storageBucket: "the-world-is-our-canvas.appspot.com",
    messagingSenderId: "195400053417",
  };
  firebase.initializeApp(config);
  database = firebase.database();

  clearButton = createButton('Clear Drawing');
  clearButton.position(165,420)
  clearButton.size(100,25);
  clearButton.mousePressed(clearDrawing)

  var button1 = createButton('Upload in Database');
  button1.position(315,420)
  button1.size(100,50);
  button1.mousePressed(saveDrawing)
 

}


function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}
var rects = [];
function draw(){

   background("Black");
 
  if (isDrawing){
    var point = {
      x: mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }

  fill("white");

  strokeWeight(10);
  stroke("white");
  noFill();
  for(var i = 0; i<drawing.length; i++){
     path = drawing[i];
    beginShape();
    for( j = 0; j<path.length; j++){
      vertex(path[j].x,path[j].y)

      
    }
    endShape();
  }  
  drawSprites();

}

function saveDrawing(){
  var ref = database.ref('/').set({
    drawing : drawing
  });
}

function gotData(data){

  var ref = database.ref('/');
  ref.on('value', gotData, errData)

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i< keys.length; i++ ){
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    var ahref = createButton('#', key);  
    
    ahref.mousePressed(showDrawing);
    ahref.parent(li);     
    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(){


  var ref = database.ref('/');
  ref.on('value', oneDrawing, errData);

  function oneDrawing(data){
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing                                                                                                                  //.
  }
}

function clearDrawing(){
  drawing = [];
}

function era(){
  hi = 2
}