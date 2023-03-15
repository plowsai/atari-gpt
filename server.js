// Define your routes
const routes = {
    '/pacman/index.html': 'pacman/index.html',
    '/pong/index.html': 'pong/index.html',
    '/invaders': 'invaders/index.html',
  };
  
  // Set up the HTML structure
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const container = document.querySelector('#content');
  
  // Load the initial page
  loadPage(window.location.pathname);
  
  // Listen for changes in the browser's URL
  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
  });
  
  // Function to load a page
  function loadPage(pathname) {
    // Get the corresponding HTML file from the routes object
    const filename = routes[pathname];
    if (!filename) return;
  
    // Load the HTML file and insert it into the container element
    fetch(filename)
      .then(response => response.text())
      .then(html => {
        header.innerHTML = getHeader(html);
        container.innerHTML = getContent(html);
        footer.innerHTML = getFooter(html);
      });
  }
  
  // Helper functions to extract header, content, and footer from the HTML file
  function getHeader(html) {
    return html.match(/<header>([\s\S]*?)<\/header>/i)[0];
  }
  
  function getContent(html) {
    return html.match(/<main>([\s\S]*?)<\/main>/i)[0];
  }
  
  function getFooter(html) {
    return html.match(/<footer>([\s\S]*?)<\/footer>/i)[0];
  }
  