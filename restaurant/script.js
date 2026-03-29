// Sticky Navbar
window.addEventListener('scroll', function() {
    let navbar = document.querySelector('.navbar');
    let hero = document.querySelector('.hero');
    let navPlaceholder = document.getElementById('nav-placeholder');
    if (!navbar || !hero || !navPlaceholder) return;
    let heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom > 0) {
        navbar.classList.add('fixed');
        navPlaceholder.style.height = navbar.offsetHeight + 'px';
        navPlaceholder.style.display = 'block';
    } else {
        navbar.classList.remove('fixed');
        navPlaceholder.style.height = '0px';
        navPlaceholder.style.display = 'none';
    }
});

// Offers Slider
let offerCards = document.querySelectorAll('.offer-cards .card');
let offerPrev = document.querySelector('.offer-prev');
let offerNext = document.querySelector('.offer-next');
let offerIndex = 0;
function showOffer(i) {
    offerCards.forEach(function(card, idx) {
        card.classList.toggle('active', idx === i);
    });
}
showOffer(offerIndex);
if (offerPrev && offerNext) {
    offerPrev.onclick = function() {
        offerIndex = (offerIndex - 1 + offerCards.length) % offerCards.length;
        showOffer(offerIndex);
    };
    offerNext.onclick = function() {
        offerIndex = (offerIndex + 1) % offerCards.length;
        showOffer(offerIndex);
    };
    setInterval(function() {
        offerIndex = (offerIndex + 1) % offerCards.length;
        showOffer(offerIndex);
    }, 3000);
}

// Gallery Lightbox
let galleryImgs = document.querySelectorAll('.gallery-grid img');
let lightbox = document.getElementById('lightbox');
let lbImg = document.getElementById('lightbox-img');
let lbClose = document.getElementById('lightbox-close');
let lbPrev = document.querySelector('.lb-prev');
let lbNext = document.querySelector('.lb-next');
let galleryIndex = 0;
function openLightbox(i) {
    galleryIndex = i;
    lbImg.src = galleryImgs[galleryIndex].src;
    lightbox.classList.remove('hidden');
}
galleryImgs.forEach(function(img, i) {
    img.onclick = function() { openLightbox(i); };
});
if (lbClose) lbClose.onclick = function() { lightbox.classList.add('hidden'); };
if (lbPrev) lbPrev.onclick = function() {
    galleryIndex = (galleryIndex - 1 + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[galleryIndex].src;
};
if (lbNext) lbNext.onclick = function() {
    galleryIndex = (galleryIndex + 1) % galleryImgs.length;
    lbImg.src = galleryImgs[galleryIndex].src;
};
lightbox.onclick = function(e) {
    if (e.target === lightbox) lightbox.classList.add('hidden');
};

// Footer Form Validation
let form = document.querySelector('.contact-form');
if (form) {
    let nameInput = form.querySelector('input[placeholder="Full Name"]');
    let emailInput = form.querySelector('input[placeholder="Email Address"]');
    let subjectInput = form.querySelector('input[placeholder="Subject"]');
    let messageInput = form.querySelector('textarea');
    function showError(input, msg) {
        let err = input.nextElementSibling;
        if (!err || err.tagName !== 'P') {
            err = document.createElement('p');
            err.style.color = 'red';
            input.parentNode.insertBefore(err, input.nextSibling);
        }
        err.textContent = msg;
    }
    function clearError(input) {
        let err = input.nextElementSibling;
        if (err && err.tagName === 'P') err.textContent = '';
    }
    form.onsubmit = function(e) {
        let valid = true;
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Full Name is required.');
            valid = false;
        } else { clearError(nameInput); }
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required.');
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
            showError(emailInput, 'Enter a valid email address.');
            valid = false;
        } else { clearError(emailInput); }
        if (!subjectInput.value.trim()) {
            showError(subjectInput, 'Subject is required.');
            valid = false;
        } else { clearError(subjectInput); }
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required.');
            valid = false;
        } else { clearError(messageInput); }
        e.preventDefault();
        if (valid) {
            alert('Message sent!');
            form.reset();
            clearError(nameInput);
            clearError(emailInput);
            clearError(subjectInput);
            clearError(messageInput);
        }
    };
}