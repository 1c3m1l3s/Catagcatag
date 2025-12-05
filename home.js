
// NAV SCROLL ACTIVE LINK

window.addEventListener('scroll', () => {
  let current = "";
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


// SLIDE-IN IMAGE (ABOUT / SKILLS SECTION)

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.slide-image, .slide-text');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view'); 
      }
    });
  }, { threshold: 0.20});

  images.forEach(img => observer.observe(img));
});

// SLIDE-IN IMAGE FOR CONTACT SECTION
document.addEventListener('DOMContentLoaded', () => {
    const contactImg = document.querySelector('.contact-left img');

    if (contactImg) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('in-view'); // triggers slide-up
                }
            });
        }, { threshold: 0.2 }); // trigger when 20% of the image is visible

        observer.observe(contactImg);
    }
});

// SMOOTH SCROLL ON NAV LINK CLICK
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Wait for the scroll to finish and recheck slide-in elements
      setTimeout(() => {
        document.querySelectorAll('.slide-image').forEach(img => {
          const rect = img.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            img.classList.add('in-view');
          }
        });
      }, 800); // timing for smooth scroll
    }
  });
});


//MOVING PICTURES
const row = document.querySelector('.image-row');
const container = document.querySelector('.pictures-content');

function updateAnimationDistance() {
    // Total row width minus container width
    const distance = row.scrollWidth - container.clientWidth;
    // Set CSS variable for animation
    row.style.setProperty('--move-distance', `-${distance}px`);
}

// Run on load
updateAnimationDistance();

// Optional: update on window resize
window.addEventListener('resize', updateAnimationDistance);

