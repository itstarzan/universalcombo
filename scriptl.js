// Function to handle button redirects
function redirectTo(page) {
    if (page === 't.me/tzan_22') {
        return; // Let the anchor tag handle Telegram link
    }
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
function initBackgroundAnimation() {
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
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // Store original text content for restoration
    const originalContent = {};
    const searchableElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, td');
    
    searchableElements.forEach((el, index) => {
        originalContent[index] = el.innerHTML;
    });
    
    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // Clear previous highlights
        searchableElements.forEach((el, index) => {
            el.innerHTML = originalContent[index];
        });
        
        // Clear previous results
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        
        if (searchTerm.length < 2) {
            return;
        }
        
        let resultsFound = 0;
        const matches = [];
        
        // Search through content
        searchableElements.forEach((el, elementIndex) => {
            const content = el.textContent.toLowerCase();
            const originalHTML = originalContent[elementIndex];
            
            if (content.includes(searchTerm)) {
                // Create highlighted version
                let highlightedHTML = originalHTML;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                highlightedHTML = highlightedHTML.replace(regex, '<span class="highlight" id="match-$&-${elementIndex}-$&">$1</span>');
                el.innerHTML = highlightedHTML;
                
                // Get context for search results
                const startIndex = content.indexOf(searchTerm);
                const contextStart = Math.max(0, startIndex - 20);
                const contextEnd = Math.min(content.length, startIndex + searchTerm.length + 20);
                let context = content.substring(contextStart, contextEnd);
                
                if (contextStart > 0) context = '...' + context;
                if (contextEnd < content.length) context += '...';
                
                // Highlight the term in the context
                const highlightedContext = context.replace(
                    new RegExp(`(${searchTerm})`, 'gi'), 
                    '<span class="result-match">$1</span>'
                );
                
                matches.push({
                    element: el,
                    context: highlightedContext,
                    elementIndex: elementIndex
                });
                
                resultsFound++;
            }
        });
        
        // Display results
        if (resultsFound > 0) {
            searchResults.classList.add('active');
            
            matches.forEach((match, index) => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `<div class="result-context">${match.context}</div>`;
                resultItem.addEventListener('click', () => {
                    // Remove active class from all highlights
                    document.querySelectorAll('.highlight.active').forEach(el => {
                        el.classList.remove('active');
                    });
                    
                    // Add active class to clicked highlight
                    const highlights = match.element.querySelectorAll('.highlight');
                    if (highlights.length > 0) {
                        highlights[0].classList.add('active');
                        
                        // Scroll to the element
                        highlights[0].scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                });
                
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.classList.add('active');
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        }
    }
    
    // Event listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call
    
    initBackgroundAnimation();
    initSearch();
});

// Table Data Fill
const models = [
    "coming soon",

    // Add more models as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('modelsTableBody');
    
    models.forEach((model, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${model}</td>
        `;
        tableBody.appendChild(row);
    });
});