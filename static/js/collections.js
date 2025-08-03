document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('collections-search');
  const linksList = document.getElementById('links-list');
  const projectsGrid = document.getElementById('projects-grid');
  
  if (!searchInput || !linksList || !projectsGrid) return;
  
  const linkItems = linksList.querySelectorAll('.link-item');
  const projectCards = projectsGrid.querySelectorAll('.project-card');
  
  function filterCollections(searchTerm) {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    // Filter links
    linkItems.forEach(item => {
      const searchableText = item.getAttribute('data-searchable');
      if (searchableText.includes(normalizedSearch)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
    
    // Filter projects
    projectCards.forEach(card => {
      const searchableText = card.getAttribute('data-searchable');
      if (searchableText.includes(normalizedSearch)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show/hide empty messages
    const visibleLinks = Array.from(linkItems).filter(item => item.style.display !== 'none');
    const visibleProjects = Array.from(projectCards).filter(card => card.style.display !== 'none');
    
    // Update sections visibility based on results
    const linksSection = linksList.closest('.collection-section');
    const projectsSection = projectsGrid.closest('.collection-section');
    
    if (visibleLinks.length === 0 && normalizedSearch !== '') {
      if (!linksList.querySelector('.no-results')) {
        const noResults = document.createElement('li');
        noResults.className = 'no-results tc-light t-s';
        noResults.textContent = 'No links found';
        linksList.appendChild(noResults);
      }
    } else {
      const noResults = linksList.querySelector('.no-results');
      if (noResults) noResults.remove();
    }
    
    if (visibleProjects.length === 0 && normalizedSearch !== '') {
      if (!projectsGrid.querySelector('.no-results')) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results tc-light t-s';
        noResults.textContent = 'No projects found';
        projectsGrid.appendChild(noResults);
      }
    } else {
      const noResults = projectsGrid.querySelector('.no-results');
      if (noResults) noResults.remove();
    }
  }
  
  // Add debounce for better performance
  let searchTimeout;
  searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterCollections(e.target.value);
    }, 200);
  });
  
  // Handle search on Enter key
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(searchTimeout);
      filterCollections(e.target.value);
    }
  });
});