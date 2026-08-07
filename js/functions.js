
const translations = {
    mg:{
        connexion:"Miditra",
        logout:"Hivoaka",
        confirmLogout:"Hivoaka ny session ve ianao ?",
        dashboard:"Dashboard",
        espace:"Espace",
        labelMavitrika:"🏆 Mpikambana mavitrika",
        labelFampianarana:"📚 Fampianarana",
        premiumTitle:"Hetsika & Valisoa",
        premiumText:"Araho ny fandrosoanao, mahazoa mari-boninahitra ary raiso ny bonus isan'andro.",
        home:"Trano",
        bible:"Baiboly",
        chat:"Tafatafa",
        exploreBible:"Handinika ny Baiboly",
        joinChat:"Hiditra amin'ny Chat",
        premiumZone:"Faritra Premium",
        cats:["Rehetra","Toriteny","Faminaniana","Hira","Vaovao"]
    },
    fr:{
        connexion:"Connexion",
        logout:"Déconnexion",
        confirmLogout:"Voulez-vous quitter votre session ?",
        dashboard:"Dashboard",
        espace:"Mon espace",
        labelMavitrika:"🏆 Membres Actifs",
        labelFampianarana:"📚 Enseignements",
        premiumTitle:"Espace Fidélité & Récompenses",
        premiumText:"Suivez votre progression, débloquez des badges spirituels et récupérez vos bonus quotidiens.",
        home:"Accueil",
        bible:"Bible",
        chat:"Chat",
        exploreBible:"Explorer la Bible",
        joinChat:"Rejoindre le Chat",
        premiumZone:"Zone Premium",
        cats:["Tous","Sermons","Prophéties","Chants","Actualité"]
    },
    en:{
        connexion:"Login",
        logout:"Logout",
        confirmLogout:"Do you want to log out?",
        dashboard:"Dashboard",
        espace:"My Space",
        labelMavitrika:"🏆 Active Members",
        labelFampianarana:"📚 Teachings",
        premiumTitle:"Loyalty & Rewards Zone",
        premiumText:"Track your progress, unlock spiritual badges, and claim your daily rewards.",
        home:"Home",
        bible:"Bible",
        chat:"Chat",
        exploreBible:"Explore Bible",
        joinChat:"Join Chat",
        premiumZone:"Premium Zone",
        cats:["All","Sermons","Prophecies","Songs","News"]
    }
};

const API_URL = 'https://apokalypsy.com/api/articles/list';
const LEADERBOARD_API_URL = 'https://apokalypsy.com/api/users/leaderboard';
const STATS_API_URL = 'https://apokalypsy.com/api/global/stats';

let allArticles = [];
let currentCategoryIndex = 0; 
let currentPage = 1;
const itemsPerPage = 5;
let articlesLoadedSuccessfully = false; // Nouvelle variable pour suivre l'état du chargement des articles

const categoryMapping = {
    1: 'sermons',
    2: 'propheties',
    3: 'chants',
    4: 'actualite'
};

/* =========================
   LANG & BADGES MANAGEMENT
========================= */
function changeLanguage() {

    const select = document.getElementById("langSwitcher");

    if (!select) {
        console.warn("L'élément langSwitcher n'est pas encore disponible. L'en-tête n'est peut-être pas encore chargé.");
        return;
    }

    const lang = select.value;
    const t = translations[lang]; // ✅ AJOUT IMPORTANT

    document.getElementById('label-mavitrika').innerText = t.labelMavitrika;
    document.getElementById('label-fampianarana').innerText = t.labelFampianarana;
    document.getElementById('premium-banner-title').innerText = t.premiumTitle;
    document.getElementById('premium-banner-text').innerText = t.premiumText;

    document.getElementById('menu-home').innerText = t.home;
    document.getElementById('menu-bible').innerText = t.bible;
    document.getElementById('menu-chat').innerText = t.chat;

    // Mise à jour des textes dynamiques dans hero et premium banner
    document.getElementById('hero-btn-explore-bible').innerText = t.exploreBible;
    document.getElementById('hero-btn-join-chat').innerText = t.joinChat;
    document.getElementById('premium-zone-text').innerText = t.premiumZone;

    const catList = document.getElementById('cat-list');
    const icons = ['grid','book-open','zap','music','globe'];

    catList.innerHTML = t.cats.map((name, i) => `
        <div class="cat-badge ${i === currentCategoryIndex ? 'active' : ''}" onclick="selectCategory(${i})">
            <i data-feather="${icons[i]}"></i>
            ${name}
        </div>
    `).join('');

    updateAuthDisplay();
    feather.replace();

    if (allArticles.length > 0) {
        renderArticles();
    }
}

/* =========================
   FILTRAGE DES CATÉGORIES
========================= */
function selectCategory(index) {
    currentCategoryIndex = index;
    currentPage = 1;

    const badges = document.querySelectorAll('#cat-list .cat-badge');
    badges.forEach((badge, idx) => {
        if(idx === index) {
            badge.classList.add('active');
        } else {
            badge.classList.remove('active');
        }
    });

    renderArticles();
}

/* =========================
   LEADERBOARD
========================= */
async function fetchLeaderboard(){
    try {
        const response = await fetch(`${LEADERBOARD_API_URL}?t=${Date.now()}`);
        if (!response.ok) throw new Error("Erreur de récupération");
        
        const topUsers = await response.json();
        renderLeaderboard(topUsers);
    } catch (error) {
        console.warn("Erreur lors de la récupération du classement. Utilisation des données par défaut :", error);
        renderLeaderboard([
            { username: "Pastor Mailhol", points: 1520 },
            { username: "Daniel A.", points: 950 },
            { username: "Sarah M.", points: 780 }
        ]);
    }
}

function renderLeaderboard(users) {
    const container = document.getElementById('leaderboard-podium');
    if (!container) return;

    const u1 = users[0] || { username: "-", points: 0 };
    const u2 = users[1] || { username: "-", points: 0 };
    const u3 = users[2] || { username: "-", points: 0 };

    const getInitials = (name) => {
        if (!name || name === "-") return "??";
        const parts = name.trim().split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    container.innerHTML = `
        <div class="rank-card rank-2 animated-box">
            <div class="avatar">
                ${getInitials(u2.username)}
                <div class="rank-badge">2</div>
            </div>
            <div class="name">${escapeHTML(u2.username)}</div>
            <div class="user-pts">${u2.points} PTS</div>
        </div>

        <div class="rank-card rank-1 animated-box">
            <div class="avatar">
                ${getInitials(u1.username)}
                <div class="rank-badge">1</div>
            </div>
            <div class="name">${escapeHTML(u1.username)}</div>
            <div class="user-pts">${u1.points} PTS</div>
        </div>

        <div class="rank-card rank-3 animated-box">
            <div class="avatar">
                ${getInitials(u3.username)}
                <div class="rank-badge">3</div>
            </div>
            <div class="name">${escapeHTML(u3.username)}</div>
            <div class="user-pts">${u3.points} PTS</div>
        </div>
    `;

    observeElements();
}

/* =========================
   ARTICLES
========================= */
async function fetchArticles(){
    try{
        const response = await fetch(`${API_URL}?t=${Date.now()}`);
        allArticles = await response.json();
        articlesLoadedSuccessfully = true; // Indique que les articles ont été chargés avec succès
        renderArticles();
    }catch(e){
        console.error("Erreur API Articles :", e); // Ajout de l'objet d'erreur pour un meilleur débogage
        articlesLoadedSuccessfully = false; // Indique que le chargement des articles a échoué
        renderArticles(); // Appeler renderArticles pour afficher le message d'erreur approprié
    }
}

function renderArticles(){
    const container = document.getElementById('articles-container');
    container.innerHTML = '';

    let filteredArticles = allArticles;

    if (currentCategoryIndex !== 0) {
        const targetCategoryValue = categoryMapping[currentCategoryIndex];
        filteredArticles = allArticles.filter(article => {
            return article.category === targetCategoryValue;
        });
    }

    if (filteredArticles.length === 0) {
        if (!articlesLoadedSuccessfully && allArticles.length === 0) {
            // Message d'erreur spécifique en cas d'échec de l'API
            container.innerHTML = `
                <div style="text-align:center; padding:50px 10px; color:var(--danger); font-weight:700;">
                    Impossible de charger les articles pour le moment. Veuillez réessayer plus tard.
                </div>`;
        } else {
            // Message si aucun article ne correspond au filtre (ou si l'API a réussi mais n'a rien renvoyé)
            container.innerHTML = `
                <div style="text-align:center; padding:50px 10px; color:var(--text-muted); font-weight:700;">
                    Tsy misy fampianarana mifanaraka amin'ity sokajy ity. / Aucun article dans cette catégorie.
                </div>`;
        }
        updatePaginationControls(0);
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

    pageItems.forEach(article => {
        const img = article.image_url || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800';
        const dateObj = new Date(article.created_at);
        const formattedDate = dateObj.toLocaleDateString('fr-FR', {
            day:'numeric',
            month:'long',
            year:'numeric'
        });

        // Détection de la langue active (Priorité au sélecteur du header, puis au localStorage, puis au tag HTML, puis 'mg')
        const langSelect = document.getElementById('langSwitcher');
        const currentLang = (langSelect ? langSelect.value : null) || localStorage.getItem('lang') || document.documentElement.lang || 'mg';
        
        let readMoreText = "Hijery ny lahatsoratra";
        if (currentLang === 'fr') {
            readMoreText = "Voir l'article";
        } else if (currentLang === 'en') {
            readMoreText = "Read more";
        }

        container.insertAdjacentHTML('beforeend',`
            <div class="bible-card">
                <div class="card-image" style="background-image:url('${img}')"></div>
                <div class="card-body">
                    <div class="card-meta">
                        <div class="card-author">
                            <i data-feather="user"></i>
                            <span>Admin Apokalypsy</span>
                        </div>
                        <div class="card-date">${formattedDate}</div>
                    </div>
                    <div class="card-title">${escapeHTML(article.title)}</div>
                    <div class="card-text">${escapeHTML(article.content).substring(0,110)}...</div>
                    
                    <button class="btn-read-more" 
                        data-title="${escapeHTML(article.title)}" 
                        data-content="${escapeHTML(article.content)}" 
                        data-image="${img}">
                        ${readMoreText} <i data-feather="arrow-right"></i>
                    </button>
                </div>
            </div>
        `);
    });

    updatePaginationControls(filteredArticles.length);
    observeElements();
    feather.replace();
}

function updatePaginationControls(totalItems){
    const controls = document.getElementById('pagination-controls');
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if(totalPages <= 1){
        controls.innerHTML = '';
        return;
    }

    controls.innerHTML = `
        <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i data-feather="chevron-left"></i>
        </button>
        <span style="font-weight:900;">${currentPage} / ${totalPages}</span>
        <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i data-feather="chevron-right"></i>
        </button>
    `;
    feather.replace();
}

function changePage(page){
    currentPage = page;
    renderArticles();
    window.scrollTo({ top:450, behavior:'smooth' });
}

/* =========================
   ANIMATION
========================= */
function observeElements(){
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('animate');
            }
        });
    },{ threshold:0.1 });

    document.querySelectorAll('.rank-card, .bible-card').forEach(el=>observer.observe(el));
}

function escapeHTML(str){
    return str
        ? str.replace(/[&<>'"]/g, tag => ({
            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            "'":'&#39;',
            '"':'&quot;'
        }[tag] || tag))
        : '';
}

/* =========================
   AUTHZONE UI
========================= */
function updateAuthDisplay(){
    const authZone = document.getElementById('auth-zone');
    const lang = document.getElementById('langSwitcher').value;
    const t = translations[lang];

    const userName = localStorage.getItem('user_name');
    const userRole = localStorage.getItem('user_role');

    if(userName){
        let menuButton = '';
        if(userRole === 'ROLE_ADMIN'){
            menuButton = `
                <button class="top-btn btn-dashboard" onclick="window.location.href='admin/dashboard_admin.html'">
                    <i data-feather="layout"></i> ${t.dashboard}
                </button>
            `;
        }else{
            menuButton = `
                <button class="top-btn btn-user" onclick="window.location.href='utilisateur/espace_personnel.html'">
                    <i data-feather="user"></i> ${t.espace}
                </button>
            `;
        }

        authZone.innerHTML = `
            ${menuButton}
            <button class="top-btn btn-logout" onclick="logout()">
                <i data-feather="log-out" title="Déconnexion"></i> 
            </button>
        `;
    }else{
        authZone.innerHTML = `
            <a href="login/connexion.html" style="text-decoration:none;">
                <button class="top-btn btn-login">
                    <i data-feather="log-in"></i> ${t.connexion}
                </button>
            </a>
        `;
    }
    feather.replace();
}

async function fetchGlobalStats() {
    try {
        const response = await fetch(`${STATS_API_URL}?t=${Date.now()}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des statistiques");

        const stats = await response.json();

        const membersCount = stats.total_members >= 1000 
            ? `+${(stats.total_members / 1000).toFixed(1)}K`.replace('.0', '')
            : stats.total_members;

        const articlesCount = stats.total_articles >= 1000
            ? `+${(stats.total_articles / 1000).toFixed(1)}K`.replace('.0', '')
            : stats.total_articles;

        document.getElementById('stat-members').innerText = membersCount;
        document.getElementById('stat-articles').innerText = articlesCount;

    } catch (error) {
        console.warn("Erreur lors de la récupération des statistiques globales. Utilisation des données par défaut :", error);
        document.getElementById('stat-members').innerText = "+12K";
        document.getElementById('stat-articles').innerText = "+580";
    }
}

/* =========================
   LOGOUT
========================= */
function logout(){
    const lang = document.getElementById('langSwitcher').value;
    const t = translations[lang];

    if(confirm(t.confirmLogout)){
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_role');
        window.location.reload();
    }
}

/* =========================
   INIT
========================= */
window.onload = () => {
    const savedLang = localStorage.getItem('app_lang');
    if(savedLang && document.getElementById('langSwitcher')){
        document.getElementById('langSwitcher').value = savedLang;
    }
    // Appelle changeLanguage pour appliquer les traductions initiales et les badges de catégorie.
    changeLanguage(); 

    fetchLeaderboard();
    fetchArticles();
    fetchGlobalStats();
};
/* =========================
   GESTION DU MODAL D'ARTICLE
========================= */
/* =========================
   GESTION DU MODAL D'ARTICLE
========================= */
function openArticleModal(title, content, image) {
    const modal = document.getElementById('article-modal');
    const modalImg = document.getElementById('modal-article-img');
    const modalTitle = document.getElementById('modal-article-title');
    const modalText = document.getElementById('modal-article-text');

    modalTitle.innerText = decodeURIComponent(title);
    modalText.innerHTML = decodeURIComponent(content);

    if (image && image !== 'null' && image !== '') {
        modalImg.src = image;
        modalImg.style.display = 'block';
    } else {
        modalImg.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.feather) feather.replace();
}

function closeArticleModal() {
    const modal = document.getElementById('article-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fermeture au clic en dehors de la boîte du modal
window.addEventListener('click', (e) => {
    const modal = document.getElementById('article-modal');
    if (e.target === modal) {
        closeArticleModal();
    }
});

// Écouteur global pour intercepter les clics sur les boutons "Vaky bebe kokoa"
document.addEventListener('click', function(event) {
    const btn = event.target.closest('.btn-read-more');
    if (btn) {
        const title = btn.getAttribute('data-title');
        const content = btn.getAttribute('data-content');
        const image = btn.getAttribute('data-image');
        openArticleModal(title, content, image);
    }
});