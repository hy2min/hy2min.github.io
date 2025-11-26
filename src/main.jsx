import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// GitHub Pages SPA redirect handler
// Handle the /?/path format from 404.html redirect
(function() {
  var location = window.location;
  var searchParams = new URLSearchParams(location.search);
  
  // Check if URL contains /?/path format (from 404.html redirect)
  if (location.search.startsWith('?/')) {
    // Extract path from query string
    var path = location.search.slice(2); // Remove '?/'
    // Replace ~and~ with &
    path = path.replace(/~and~/g, '&');
    // Split to get actual path and query params
    var pathParts = path.split('&');
    var actualPath = pathParts[0];
    var queryString = pathParts.slice(1).join('&');
    
    // Build new URL
    var newPath = actualPath || '/';
    var newSearch = queryString ? '?' + queryString : '';
    var newUrl = newPath + newSearch + location.hash;
    
    // Replace current URL without reload
    history.replaceState(null, '', newUrl);
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
