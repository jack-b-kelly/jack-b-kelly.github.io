document.addEventListener('DOMContentLoaded', () => {
    const pageOrder = ['index.html', 'project1.html', 'project2.html', 'project3.html'];
  
    function getCurrentPage() {
      const path = window.location.pathname;
      const file = path.substring(path.lastIndexOf('/') + 1);
      return file === '' ? 'index.html' : file;
    }
  
    const overlay = document.getElementById('page-transition-overlay');
  
    function expandOverlay() {
      gsap.set(overlay, {width: 0, height: 0, pointerEvents: 'auto'});
      return gsap.to(overlay, {
        width: '100vw',
        height: '100vh',
        duration: 0.6,
        ease: 'power2.inOut'
      }).then();
    }
  
    function shrinkOverlay() {
      return gsap.to(overlay, {
        width: 0,
        height: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        pointerEvents: 'none'
      }).then();
    }
  
    async function transitionToPage(targetUrl) {
      await expandOverlay();
      window.location.href = targetUrl;
    }
  
    window.addEventListener('load', () => {
      gsap.set(overlay, {width: '100vw', height: '100vh', pointerEvents: 'auto'});
      shrinkOverlay();
      gsap.from(document.body, {opacity: 0, duration: 0.8});
    });
  
    document.getElementById('downBtn').addEventListener('click', () => {
      const currentPage = getCurrentPage();
      const currentIndex = pageOrder.indexOf(currentPage);
      if (currentIndex < pageOrder.length - 1) {
        transitionToPage(pageOrder[currentIndex + 1]);
      }
    });
  
    document.getElementById('upBtn').addEventListener('click', () => {
      const currentPage = getCurrentPage();
      const currentIndex = pageOrder.indexOf(currentPage);
      if (currentIndex > 0) {
        transitionToPage(pageOrder[currentIndex - 1]);
      }
    });
  });