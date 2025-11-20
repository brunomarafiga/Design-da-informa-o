// Dark mode toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');

    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Menu hambúrguer toggle
function toggleMenu() {
    const overlay = document.getElementById('menuOverlay');
    const drawer = document.getElementById('menuDrawer');

    overlay.classList.toggle('active');
    drawer.classList.toggle('active');

    if (drawer.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Toggle submenu in mobile drawer
function toggleSubmenu(event, submenuId) {
    event.preventDefault();
    event.stopPropagation();

    const submenu = document.getElementById(submenuId);
    const expandIcon = event.currentTarget.querySelector('.expand-icon');

    // Toggle submenu visibility
    submenu.classList.toggle('active');

    // Rotate icon
    if (submenu.classList.contains('active')) {
        expandIcon.style.transform = 'rotate(180deg)';
    } else {
        expandIcon.style.transform = 'rotate(0deg)';
    }
}

// Global posts array to support filtering
let allPosts = [];

// Load posts from JSON
async function loadPosts() {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;

    try {
        const response = await fetch('posts.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        allPosts = await response.json();

        // Initial render
        renderPosts(allPosts);

        // Setup event listeners for filters
        setupFilters();

    } catch (error) {
        console.error('Error loading posts:', error);
        newsContainer.innerHTML = '<p>Não foi possível carregar as notícias.</p>';
    }
}

function renderPosts(posts) {
    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = '';

    if (posts.length === 0) {
        newsContainer.innerHTML = '<p>Nenhuma notícia encontrada com os filtros selecionados.</p>';
        return;
    }

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'news-card';

        // Determine tag class and icon
        let tagClass = 'tag-blue';
        let iconClass = 'fa-newspaper';
        const tag = post.tag || '#Notícia';

        if (tag.includes('Exposição') || tag.includes('Artes') || tag.includes('Cultura')) {
            tagClass = 'tag-purple';
            iconClass = 'fa-palette';
        }
        else if (tag.includes('Eventos') || tag.includes('Seminário')) {
            tagClass = 'tag-orange';
            iconClass = 'fa-calendar-star';
        }
        else if (tag.includes('ClubedoLivro') || tag.includes('Leitura')) {
            tagClass = 'tag-green';
            iconClass = 'fa-book-open';
        }
        else if (tag.includes('Capacitação') || tag.includes('Curso')) {
            tagClass = 'tag-teal';
            iconClass = 'fa-chalkboard-user';
        }
        else if (tag.includes('Bolsa') || tag.includes('Estágio')) {
            tagClass = 'tag-yellow';
            iconClass = 'fa-briefcase';
        }
        else if (tag.includes('Alerta') || tag.includes('Aviso')) {
            tagClass = 'tag-red';
            iconClass = 'fa-triangle-exclamation';
        }
        else if (tag.includes('Gestão') || tag.includes('Planejamento')) {
            tagClass = 'tag-slate';
            iconClass = 'fa-users-gear';
        }
        else if (tag.includes('Acordo') || tag.includes('Recurso')) {
            tagClass = 'tag-cyan';
            iconClass = 'fa-handshake';
        }
        else if (tag.includes('Resultado') || tag.includes('Edital')) {
            tagClass = 'tag-emerald';
            iconClass = 'fa-clipboard-check';
        }

        card.innerHTML = `
            <div class="news-image ${tagClass}">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            <div class="news-content">
                <span class="tag ${tagClass}"><i class="fa-solid ${iconClass}"></i> ${tag}</span>
                <h3 class="news-title">
                    <a href="${post.link}" target="_blank">${post.title}</a>
                </h3>
                <time class="news-date"><i class="fa-regular fa-calendar"></i> ${post.date}</time>
                <p class="news-excerpt">${post.excerpt}</p>
            </div>
        `;

        // Add click event to open link
        if (post.link) {
            card.addEventListener('click', (e) => {
                // Prevent double navigation if clicking the link directly
                if (!e.target.closest('a')) {
                    window.location.href = post.link;
                }
            });
        }

        newsContainer.appendChild(card);
    });
}

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const tagFilter = document.getElementById('tagFilter');
    const yearFilter = document.getElementById('yearFilter');

    if (!searchInput || !tagFilter || !yearFilter) return;

    function filterPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedTag = tagFilter.value;
        const selectedYear = yearFilter.value;

        const filtered = allPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm) ||
                post.excerpt.toLowerCase().includes(searchTerm);
            const matchesTag = selectedTag === '' || (post.tag && post.tag.includes(selectedTag));
            const matchesYear = selectedYear === '' || post.date.includes(selectedYear);

            return matchesSearch && matchesTag && matchesYear;
        });

        renderPosts(filtered);
    }

    searchInput.addEventListener('input', filterPosts);
    tagFilter.addEventListener('change', filterPosts);
    yearFilter.addEventListener('change', filterPosts);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Load posts
    loadPosts();
});
