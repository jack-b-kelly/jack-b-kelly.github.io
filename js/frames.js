const frameContainer = document.getElementById('frameContainer');

// Load 10 images
const frames = [];
for (let i = 1; i <= 10; i++) {
  const img = document.createElement('img');
  img.src = `Assets/MLB_Frames/output_${String(i).padStart(4, '0')}.jpg`;
  img.classList.add('frame');
  if (i !== 1) {
    img.classList.add('hidden'); // Hide all but the first frame
  } else {
    img.classList.add('large'); // First frame starts large
  }
  frameContainer.appendChild(img);
  frames.push(img);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const sequence = async () => {
  while (true) {
    // STEP 1: Show only the large first frame
    frames.forEach((frame, i) => {
      if (i === 0) {
        frame.classList.remove('hidden');
        frame.classList.add('large');
      } else {
        frame.classList.add('hidden');
        frame.classList.remove('rise-fade');
      }
    });
    frameContainer.classList.remove('expanded');
    await wait(1500);

    // STEP 2: Shrink first frame
    frames[0].classList.remove('large');
    await wait(600);

    // STEP 3: Expand all frames smoothly
    frames.forEach(frame => frame.classList.remove('hidden'));
    frameContainer.classList.add('expanded');
    await wait(1500);

    // STEP 4: Pause
    await wait(1000);

    // STEP 5: Animate frames 3 and 7
    [2, 6].forEach(i => frames[i].classList.add('rise-fade'));
    await wait(1500);

    // STEP 6: Reset
    [2, 6].forEach(i => frames[i].classList.remove('rise-fade'));

    // STEP 7: Fade out all but the first frame
    frames.forEach((frame, i) => {
      if (i !== 0) frame.classList.add('hidden');
    });
    frameContainer.classList.remove('expanded');
    frames[0].classList.add('large');
    await wait(1000);
  }
};

sequence();