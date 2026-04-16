// OneConsumer Documentation

document.addEventListener('DOMContentLoaded', function () {

  // ===========================
  // Collapsible sidebar sections
  // ===========================

  document.querySelectorAll('.sidebar-section-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = this.closest('.sidebar-nav-section');
      var subnav = section.querySelector('.sidebar-subnav');
      var isOpen = section.classList.contains('open');

      section.classList.toggle('open', !isOpen);
      subnav.classList.toggle('open', !isOpen);
      this.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // ===========================
  // Search
  // ===========================

  var searchInput = document.getElementById('search-input');
  var searchClear = document.getElementById('search-clear');
  var searchResults = document.getElementById('search-results');
  var searchResultsList = document.getElementById('search-results-list');
  var sidebarNav = document.getElementById('sidebar-nav');

  if (!searchInput) return;

  var searchIndex = [];

  // Load search index
  fetch('/search.json')
    .then(function (res) { return res.json(); })
    .then(function (data) { searchIndex = data; })
    .catch(function () { /* search unavailable */ });

  function showNav() {
    searchResults.style.display = 'none';
    sidebarNav.style.display = '';
    searchClear.style.display = 'none';
  }

  function runSearch(query) {
    if (query.length < 2) { showNav(); return; }

    searchClear.style.display = 'block';
    sidebarNav.style.display = 'none';

    var results = searchIndex.filter(function (item) {
      var q = query.toLowerCase();
      return (item.title && item.title.toLowerCase().indexOf(q) !== -1) ||
             (item.content && item.content.toLowerCase().indexOf(q) !== -1);
    }).slice(0, 8);

    if (results.length === 0) {
      searchResultsList.innerHTML = '<li class="no-results">No results for "' + escapeHtml(query) + '"</li>';
    } else {
      searchResultsList.innerHTML = results.map(function (item) {
        var snippet = item.content ? item.content.substring(0, 80) + '…' : '';
        return '<li><a href="' + item.url + '">' +
          '<span class="result-title">' + escapeHtml(item.title) + '</span>' +
          (snippet ? '<span class="result-snippet">' + escapeHtml(snippet) + '</span>' : '') +
          '</a></li>';
      }).join('');
    }

    searchResults.style.display = 'block';
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  searchInput.addEventListener('input', function () {
    runSearch(this.value.trim());
  });

  searchClear.addEventListener('click', function () {
    searchInput.value = '';
    showNav();
    searchInput.focus();
  });

  // Close search on Escape
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      showNav();
      searchInput.blur();
    }
  });

  // ===========================
  // Mobile sidebar
  // ===========================

  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var sidebarBackdrop = document.getElementById('sidebar-backdrop');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      sidebarBackdrop.classList.toggle('open');
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarBackdrop.classList.remove('open');
    });
  }

  // ===========================
  // Smooth scroll for anchor links
  // ===========================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
