//GSAP and Barba js functions for page transitions.
function delay(n) {
    n=n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);  
     });
}

function pageTransition(){
    var tl = gsap.timeline();
    
    tl.to(".loading-screen",{
        duration: 1.2,
        width: '100%',
        left: '0%',
        ease: "Expo.easeInOut"
    });

    console.log(window.location.pathname);
    
    if (window.location.pathname == '/index.html'){
      setTimeout(()=>{
        requestAnimationFrame(animate);
      },1000);
    }
    
    else if (window.location.pathname == '/Projects/scenedetector.html'|| window.location.pathname == '/Projects/meltdown.html' || window.location.pathname == '/Projects/dropbox.html' ){
      setTimeout(()=>{
        cancelAnimationFrame(startStop);
        context.clearRect(0, 0, canvas.width, canvas.height);
      },1000);
    
    }

    else{


      setTimeout(()=>{ 
        cancelAnimationFrame(startStop);
        requestAnimationFrame(one_frame);

      },1000);
    }


    tl.to(".loading-screen",{
        duration: 1,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInout",
        delay: 0.3

    });
    tl.set(".loading-screen", {left: "-100%"});
}

function contentAnimation(){
    var tl = gsap.timeline();
    tl.from(".animate-this",{ duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2
    });
}

$(function(){
    barba.init({
        sync: true,

        transitions: [
            {
                async leave(data){
                    const done = this.async();
                    pageTransition();
                    await delay(1000);
                    done();
                },

                async enter(data){
                    contentAnimation();
                },

                async once(data){
                    contentAnimation();
                }
            }
        ]
        
    })
})

//Home page BG animation

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var width = window.innerWidth*2;
var height = window.innerHeight*2;
canvas.height = height;
canvas.width = width;

// Each sucessive square is stacked counter-clockwise around the existing group. This array of pairs will instruct the direction each arc takes within the square.
var directions = [
 [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1]
  ];

// This will help instruct where each successive arc is placed.
var arcs = [
  [0, 1.5],
  [1.5, 1],
  [1, 0.5],
  [0.5, 0]
];

var colors = [
  ['#908F79'],
  ['#908F79'],
  ['#908F79'],
  ['#908F79']
];

var size = 5;
var startX = (width - size) / 2;
var startY = (height - 5) / 2;

function fibonacciSpiral(startX, startY, size, lastValue, value, step, xAdjust, yAdjust, lastYAdjust, i) {
  if (i > 3) {
    i = 0;
  }
  if (step == 1) {
    var yAdjust = size;
    //var lastYAdjust = 10;
  }
  if (value > 6008) {
    return
  } else {
    context.arc(startX + xAdjust * directions[i][0], startY + yAdjust * directions[i][1], value * size, arcs[i][0] * Math.PI, arcs[i][1] * Math.PI, true);
    i++
    if ((step % 2 == 0)) {
      var old = yAdjust;
      fibonacciSpiral(startX, startY, size, value, (lastValue + value), (step + 1), xAdjust, Math.pow((Math.sqrt(lastYAdjust) + Math.sqrt(yAdjust)), 2), old, i)

    }
    else {
      fibonacciSpiral(startX, startY, size, value, (lastValue + value), (step + 1), xAdjust + yAdjust, yAdjust, lastYAdjust, i)
    }

  }
}

var ways = [
  [-1, -1],
  [-1, -1],
  [-1, +1],
  [+1, -1] 
];

function drawRect(startX, startY, size, moveX, moveY, lastValue, value, i) {
  if (value > 6008) {
    return
  }


  context.fillStyle = colors[i];


  context.fillRect(startX + ways[i][0] * moveX * size, startY + ways[i][1] * moveY * size, value * size, value * size);
  context.rect(startX + ways[i][0] * moveX * size, startY + ways[i][1] * moveY * size, value * size, value * size);
  if (i == 3) {
    drawRect(startX, startY, size, (moveX + moveY), (lastValue + value + moveY), value, (lastValue + value), 0);
  } else if (i == 0) {
    drawRect(startX, startY, size, (lastValue + value + moveX), moveY, value, (lastValue + value), (i + 1));
  } else if (i == 1) {
    drawRect(startX, startY, size, moveX, (value - moveY), value, (lastValue + value), (i + 1));
  } else {
    drawRect(startX, startY, size, value - moveX, (lastValue - moveY), value, (lastValue + value), (i + 1));

  }
}

// I arrived at the value for size visually, just trying to eliminate jumpiness. There should be a way to compute this precisely...
var size = 0.2;
var startStop;
var i = 0
var j = 0
function animate() {
  if (size >1.3) {
    size = 0.2;
  }
  
  context.beginPath()  
 
  fibonacciSpiral(startX, startY, size, 1, 1, 0, 0, 0, 0, 0);
 
  //color animation can go here
  const randomColor = ["#" + Math.floor(Math.random() * 16777215).toString(16)]
  if (j % 225 == 0){ 

    colors[i]=randomColor;
    context.fillStyle = colors[i];
    }

    drawRect(startX, startY, size, 0, 1, 1, 1, 0);
  context.strokeStyle = 'white'
  context.lineWidth = 1;
  //context.stroke();
  size = size * 1.027;
  
  startStop = requestAnimationFrame(animate);
  

  i++
  j++
  if(i>3){
    i=0
  }
}

function one_frame() {
  if (size >1.3) {
    size = 0.2;
  }
  
  context.beginPath()  
 
  fibonacciSpiral(startX, startY, size, 1, 1, 0, 0, 0, 0, 0);
 
  //color animation can go here
  const randomColor = ["#" + Math.floor(Math.random() * 16777215).toString(16)]
  if (j % 225 == 0){ 

    colors[i]=randomColor;
    context.fillStyle = colors[i];
    }

    drawRect(startX, startY, size, 0, 1, 1, 1, 0);
  context.lineWidth = 1;
  //context.stroke();
  size = size * 1.027;
  i++
  j++
  if(i>3){
    i=0
  }
}

requestAnimationFrame(animate);




 

