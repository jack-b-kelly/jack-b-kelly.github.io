/* ================================
   JS #1 EMAIL APP - Tab & Buttons
================================= */
(function() {
  const app = document.getElementById('emailApp');
  if (!app) return;

  // Tab switching
  app.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      app.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      app.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      tab.classList.add('active');
      app.querySelector(`#${tabId}`).classList.add('active');
    });
  });

  // Toggle play/stop buttons
  app.querySelectorAll('.playBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.innerText = btn.innerText === 'Play' ? 'Stop' : 'Play';
    });
  });
})();

/* ================================
   JS #2 TERMINAL - Scroll-triggered
================================= */
(function() {
  const terminal = document.getElementById('terminal');
  if (!terminal) return;

  const sites = [
    { name: "example1.com", emails: ["email1@example.com", "email2@example.com", "email3@example.com"] },
    { name: "example2.com", emails: ["contact@example2.com", "info@example2.com"] },
    { name: "example3.com", emails: ["hello@example3.com", "support@example3.com", "team@example3.com"] }
  ];

  let siteIndex = 0, lineIndex = 0, charIndex = 0, timeoutId = null;
  let running = false;

  function typeLine() {
    if (!running) return;

    const site = sites[siteIndex];
    const lines = [`Scraping ${site.name} --------->`, ...site.emails];

    if (lineIndex < lines.length) {
      const line = lines[lineIndex];
      if (charIndex <= line.length) {
        terminal.innerHTML = terminal.innerHTML.replace(/<span class="cursor"><\/span>/g, '');
        terminal.innerHTML += line.charAt(charIndex) + '<span class="cursor"></span>';
        charIndex++;
        timeoutId = setTimeout(typeLine, 90);
      } else {
        terminal.innerHTML = terminal.innerHTML.replace(/<span class="cursor"><\/span>/g, '');
        terminal.innerHTML += '<br>';
        lineIndex++;
        charIndex = 0;
        timeoutId = setTimeout(typeLine, 400);
      }
    } else {
      siteIndex = (siteIndex + 1) % sites.length;
      lineIndex = 0;
      charIndex = 0;
      if (siteIndex === 0) terminal.innerHTML = '';
      timeoutId = setTimeout(typeLine, 800);
    }
  }

  function start() { if (!running) { running = true; typeLine(); } }
  function destroy() { running = false; clearTimeout(timeoutId); terminal.innerHTML = ''; siteIndex = lineIndex = charIndex = 0; }

  new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? start() : destroy());
  }, { threshold: 0.1 }).observe(terminal);
})();

/* ================================
   JS #3 MELTDOWN - Scroll-triggered
================================= */
(function() {
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const r = document.getElementById("r");
  const g = document.getElementById("g");
  const b = document.getElementById("b");
  const startBtn = document.getElementById("start");
  const timerEl = document.getElementById("timer");
  const statsEl = document.getElementById("stats");
  const scoreEl = document.getElementById("scoreboard");
  const messageEl = document.getElementById("message");

  if (!canvas1 || !canvas2 || !r || !g || !b || !startBtn) return;

  let color1 = [0,0,0], color2 = [0,0,0];
  let score = 0, highScore = 0, civilians = 5000000, evacuated = 0, accuracy = [], round = 0;
  let timerId = null, timeLeft = 10, running = false;

  function rgb([r,g,b]) { return `rgb(${r},${g},${b})`; }
  function randomColor() { return [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)]; }
  function updateScoreboard() { scoreEl.textContent = `Score: ${score}\n\nHigh Score: ${highScore}`; }
  function updateColor() { color1 = [+r.value,+g.value,+b.value]; canvas1.style.background = rgb(color1); }

  [r,g,b].forEach(s => s.addEventListener("input", updateColor));

  function colorDifference(c1,c2) {
    let [r1,g1,b1] = c1, [r2,g2,b2] = c2;
    let dr=r1-r2,dg=g1-g2,db=b1-b2,rBar=(r1+r2)/2;
    let diff=Math.sqrt((2+rBar/256)*dr*dr + 4*dg*dg + (2+(255-rBar)/256)*db*db);
    return Math.abs(Math.round((diff/765-1)*100));
  }

  function startRound() {
    if (!running) return;
    clearInterval(timerId);

    if (round>0){
      let pts=colorDifference(color1,color2);
      accuracy.push(pts);
      score+=pts;
      if (score>highScore) highScore=score;
      updateScoreboard();
      if (pts<=60){gameOver(); return;}
    }

    round++; timeLeft=10; timerEl.style.color="#D3FF33";
    color2=randomColor(); canvas2.style.background=rgb(color2);
    messageEl.style.display="none"; [r,g,b].forEach(s=>s.style.display="block");
    startBtn.textContent="Fire\nCounter Ray";
    updateScoreboard();
    timerId=setInterval(tick,1000);
  }

  function tick() {
    timerEl.textContent=`Time: ${timeLeft}`;
    if(timeLeft<=3) timerEl.style.color="red";

    let evac=Math.floor(Math.random()*90000)+10000;
    civilians=Math.max(0,civilians-evac);
    evacuated+=evac;

    let avgAccuracy=accuracy.length ? (accuracy.reduce((a,b)=>a+b,0)/accuracy.length).toFixed(2) : 0;
    statsEl.textContent=`Accuracy: ${avgAccuracy}\n\nRemaining Civilians:\n${civilians}`;
    timeLeft--;
    if(timeLeft<0) gameOver();
  }

  function gameOver() {
    clearInterval(timerId);
    updateScoreboard();
    messageEl.style.display="block";
    messageEl.textContent=`Your score was ${score}.\nYou saved ${evacuated} civilians.\n\n${civilians} civilians' eyes melted and brains exploded horribly.\n\nPlay again?`;
    [r,g,b].forEach(s=>s.style.display="none");
    canvas1.style.background="grey"; canvas2.style.background="grey";
    score=0;civilians=5000000;evacuated=0;accuracy=[];round=0;
    updateScoreboard(); startBtn.textContent="Play Again";
  }

  function start() { running=true; }
  function destroy() { running=false; clearInterval(timerId); timerId=null; }

  new IntersectionObserver(entries=>{
    entries.forEach(entry=>entry.isIntersecting ? start() : destroy());
  }, {threshold:0.1}).observe(canvas1);

  startBtn.addEventListener("click", startRound);
})();

/* ================================
   JS #4 FRAME ANIMATION - Scroll-triggered
================================= */
(function() {
  const frameContainer = document.getElementById('frameContainer');
  if(!frameContainer) return;

  const frames = [];
  for(let i=1;i<=10;i++){
    const img=document.createElement('img');
    img.src=`images/MLB_Frames/output_${String(i).padStart(4,'0')}.jpg`;
    img.classList.add('frame'); 
    if(i!==1) img.classList.add('hidden'); else img.classList.add('large');
    frameContainer.appendChild(img);
    frames.push(img);
  }

  function wait(ms){ return new Promise(resolve=>setTimeout(resolve,ms)); }

  let running = false, sequenceId=null;

  async function sequence(){
    while(running){
      frames.forEach((frame,i)=>{
        if(i===0){frame.classList.remove('hidden'); frame.classList.add('large');}
        else {frame.classList.add('hidden'); frame.classList.remove('rise-fade');}
      });
      frameContainer.classList.remove('expanded'); await wait(1500);
      frames[0].classList.remove('large'); await wait(600);
      frames.forEach(f=>f.classList.remove('hidden')); frameContainer.classList.add('expanded'); await wait(1500);
      await wait(1000);
      [2,6].forEach(i=>frames[i].classList.add('rise-fade')); await wait(1500);
      [2,6].forEach(i=>frames[i].classList.remove('rise-fade'));
      frames.forEach((f,i)=>{if(i!==0) f.classList.add('hidden');});
      frameContainer.classList.remove('expanded'); frames[0].classList.add('large'); await wait(1000);
    }
  }

  function start(){ running=true; sequence(); }
  function destroy(){ running=false; frames.forEach(f=>f.classList.add('hidden')); frames[0].classList.add('large'); }

  new IntersectionObserver(entries=>{
    entries.forEach(entry=>entry.isIntersecting ? start() : destroy());
  }, {threshold:0.1}).observe(frameContainer);

})();

/* ================================
   JS #5 BOUNCE ANIMATION - Scroll-triggered
================================= */
(function() {
  const container = document.getElementById('bouncing-container');
  if(!container) return;

  const imagePaths = [
    'images/degas.jpg',
    'images/PicassoGuernica.jpg',
    'images/starry_night.jpg',
    'images/the-goldfish.jpg',
    'images/elder.jpg',
    'images/abaporu.jpg',
  ];

  const images=[];
  let running=false, animFrame=null;

  function getMargin(){ return {x:container.offsetWidth*0.2, y:container.offsetHeight*0.2}; }

  function setup(){
    images.length=0;
    imagePaths.forEach(src=>{
      const img=document.createElement('img'); img.src=src; img.classList.add('bouncing-image');
      const imgSize=60; const margin=getMargin();
      const maxX=container.offsetWidth-margin.x-imgSize; const maxY=container.offsetHeight-margin.y-imgSize;
      const minX=margin.x; const minY=margin.y;
      const startX=Math.random()*(maxX-minX)+minX; const startY=Math.random()*(maxY-minY)+minY;
      img.style.left=startX+'px'; img.style.top=startY+'px';
      container.appendChild(img);
      images.push({el:img,x:startX,y:startY,dx:2+Math.random()*2,dy:2+Math.random()*2,size:imgSize});
    });
  }

  function animate(){
    if(!running) return;
    const margin=getMargin();
    images.forEach(img=>{
      img.x+=img.dx; img.y+=img.dy;
      if(img.x<=margin.x||img.x>=container.offsetWidth-margin.x-img.size){img.dx*=-1;img.x=Math.max(margin.x,Math.min(img.x,container.offsetWidth-margin.x-img.size));}
      if(img.y<=margin.y||img.y>=container.offsetHeight-margin.y-img.size){img.dy*=-1;img.y=Math.max(margin.y,Math.min(img.y,container.offsetHeight-margin.y-img.size));}
      img.el.style.left=img.x+'px'; img.el.style.top=img.y+'px';
    });
    animFrame=requestAnimationFrame(animate);
  }

  function start(){ if(!running){ running=true; setup(); animate(); } }
  function destroy(){ running=false; images.forEach(i=>i.el.remove()); images.length=0; cancelAnimationFrame(animFrame); }

  new IntersectionObserver(entries=>{
    entries.forEach(entry=>entry.isIntersecting ? start() : destroy());
  }, {threshold:0.1}).observe(container);

})();