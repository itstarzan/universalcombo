// Function to handle button redirects
function redirectTo(page) {
    window.location.href = `${page}.html`;
}

// Digital Clock Function
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours.toString().padStart(2, '0');
    
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('digitalClock').textContent = timeString;
}

// Background animation
document.addEventListener('DOMContentLoaded', function() {
    // Update clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call
    
    const bgAnimation = document.getElementById('bgAnimation');
    
    function createCircuit() {
        const circuit = document.createElement('div');
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        circuit.style.position = 'absolute';
        circuit.style.width = `${size}px`;
        circuit.style.height = `${size}px`;
        circuit.style.left = `${posX}px`;
        circuit.style.top = `${posY}px`;
        circuit.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        circuit.style.border = '1px solid rgba(84, 56, 179, 0.3)';
        circuit.style.opacity = Math.random() * 0.5;
        
        const duration = Math.random() * 10 + 10;
        circuit.style.animation = `float ${duration}s linear infinite`;
        
        bgAnimation.appendChild(circuit);
        
        setTimeout(() => {
            circuit.remove();
        }, duration * 1000);
    }
    
    // Create circuit elements periodically
    setInterval(createCircuit, 2000);
    
    // Create initial circuits
    for (let i = 0; i < 10; i++) {
        createCircuit();
    }
});