/* filepath: js/includeHTML.js */
function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    elements.forEach(element => {
        const file = element.getAttribute('data-include');
        
        fetch(file)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Page not found');
            })
            .then(data => {
                element.innerHTML = data;
                element.removeAttribute('data-include');
                
                // Check if all includes are loaded
                const remainingIncludes = document.querySelectorAll('[data-include]');
                if (remainingIncludes.length === 0) {
                    // Initialize other scripts after all includes are loaded
                    initializeScripts();
                }
            })
            .catch(error => {
                element.innerHTML = '<p>Content could not be loaded.</p>';
                console.error('Error loading include:', error);
            });
    });
}

function initializeScripts() {
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        // Your particles.js initialization code here
    }
    
    // Initialize main.js functionality
    if (typeof initMainScript === 'function') {
        initMainScript();
    }
}

// Load includes when DOM is ready
document.addEventListener('DOMContentLoaded', includeHTML);