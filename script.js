function generateLightningBolt() {
    const lightningContainer = document.querySelector('.lightning-container');
    
    // Create a new lightning element
    const lightning = document.createElement('div');
    lightning.classList.add('lightning');
    
    // Set a random position for the lightning bolt
    const xPos = Math.random() * window.innerWidth; // Random horizontal position
    const yPos = Math.random() * window.innerHeight; // Random vertical position
    
    lightning.style.left = `${xPos}px`;
    lightning.style.top = `${yPos}px`;
    
    // Add random rotation to make the lightning more jagged
    const rotation = Math.random() * 40 - 20; // Random rotation between -20 and 20 degrees
    lightning.style.transform = `rotate(${rotation}deg)`;
    
    // Append the lightning to the container
    lightningContainer.appendChild(lightning);
    
    // Remove the lightning bolt after the animation is complete
    setTimeout(() => {
      lightning.remove();
    }, 300); // This time matches the animation duration
  }
  
  // Generate lightning bolts at random intervals
  setInterval(generateLightningBolt, Math.random() * 500 + 300); // Between 300ms and 800ms