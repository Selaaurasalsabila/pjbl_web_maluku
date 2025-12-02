const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle){
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
    });
});

const backToTop = document.querySelector('.back-to-top');
if(backToTop){
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top:0, behavior:'smooth' });
    });
}


const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const profileBtn = document.getElementById('profile-btn');

if(loginForm){
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const roleSelect = document.getElementById('role').value;

        if(username && password){
            localStorage.setItem('loggedIn','true');
            localStorage.setItem('username',username);
            localStorage.setItem('role',roleSelect);
            updateNavbarAfterLogin();
            loginForm.reset();
            window.location.href = "index.html";
        } else {
            alert('Username dan password harus diisi!');
        }
    });
}

function updateNavbarAfterLogin(){
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const username = localStorage.getItem('username');
    if(loginBtn && profileBtn){
        if(loggedIn){
            loginBtn.style.display = 'none';
            profileBtn.style.display = 'inline-block';
            profileBtn.textContent = "Profil";
        } else {
            loginBtn.style.display = 'inline-block';
            profileBtn.style.display = 'none';
        }
    }
}

if(profileBtn){
    profileBtn.addEventListener('click', () => {
        if(confirm('Apakah anda ingin logout?')){
            localStorage.clear();
            updateNavbarAfterLogin();
            window.location.href = "login.html";
        }
    });
}


const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
});


function initFavoriteButtons(){
    const favButtons = document.querySelectorAll('.fav-btn');
    favButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('favorited');
            btn.textContent = btn.classList.contains('favorited') ? '★ Favorit' : '☆ Favorit';
            const namaWisata = btn.closest('.card-wisata').querySelector('h3').textContent;
            if(btn.classList.contains('favorited')){
                alert(`${namaWisata} telah ditambahkan ke favorit!`);
            } else {
                alert(`${namaWisata} dihapus dari favorit!`);
            }
        });
    });
}


function goHome(){ window.location.href = "index.html"; }
function goInfo(){ window.location.href = "info.html"; }
function goLogin(){ window.location.href = "login.html"; }
function goKontak(){ window.location.href = "contact.html"; }
function goSearch(){ window.location.href = "search.html"; }


function performSearch(){
    let input = document.getElementById("searchInput")?.value.toLowerCase() || "";
    let cards = document.querySelectorAll("#gridWisata .card-wisata");

    cards.forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}


const contactForm = document.getElementById('contact-form');
if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        alert('Terima kasih atas kritik dan sarannya!');
        contactForm.reset();
    });
}


window.addEventListener("DOMContentLoaded", () => {
    
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if(!loggedIn && !window.location.href.includes("login.html")){
        window.location.href = "login.html";
        return;
    }

    
    let searchInputHome = document.getElementById("searchInputHome");
    if(searchInputHome){
        searchInputHome.addEventListener("focus", () => {
            window.location.href = "search.html";
        });
    }

    updateNavbarAfterLogin();
    initFavoriteButtons();
});
