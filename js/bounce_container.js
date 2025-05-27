const imagePaths = [
  'Assets/shipping_server/images/degas.jpg',
  'Assets/shipping_server/images/PicassoGuernica.jpg',
  'Assets/shipping_server/images/starry_night.jpg',
  'Assets/shipping_server/images/the-goldfish.jpg',
  'Assets/shipping_server/images/elder.jpg',
  'Assets/shipping_server/images/abaporu.jpg',
];

const container = document.getElementById('bouncing-container');
const images = [];

function getMargin() {
  return {
    x: container.offsetWidth * 0.2,
    y: container.offsetHeight * 0.2
  };
}

imagePaths.forEach((src) => {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('bouncing-image');

  const imgSize = 60; // Assuming image size is 60x60
  const margin = getMargin();

  // Random starting position within 5% bounds
  const maxX = container.offsetWidth - margin.x - imgSize;
  const maxY = container.offsetHeight - margin.y - imgSize;
  const minX = margin.x;
  const minY = margin.y;

  const startX = Math.random() * (maxX - minX) + minX;
  const startY = Math.random() * (maxY - minY) + minY;

  img.style.left = startX + 'px';
  img.style.top = startY + 'px';

  container.appendChild(img);

  images.push({
    el: img,
    x: startX,
    y: startY,
    dx: 2 + Math.random() * 2,
    dy: 2 + Math.random() * 2,
    size: imgSize
  });
});

function animate() {
  const margin = getMargin();

  images.forEach(img => {
    img.x += img.dx;
    img.y += img.dy;

    // Bounce off 5% margin boundaries
    if (img.x <= margin.x || img.x >= container.offsetWidth - margin.x - img.size) {
      img.dx *= -1;
      img.x = Math.max(margin.x, Math.min(img.x, container.offsetWidth - margin.x - img.size));
    }
    if (img.y <= margin.y || img.y >= container.offsetHeight - margin.y - img.size) {
      img.dy *= -1;
      img.y = Math.max(margin.y, Math.min(img.y, container.offsetHeight - margin.y - img.size));
    }

    img.el.style.left = img.x + 'px';
    img.el.style.top = img.y + 'px';
  });

  requestAnimationFrame(animate);
}

animate();