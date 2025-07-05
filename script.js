// 3D tilt effect for .card elements (used on index.html)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    const isDarkMode = document.body.classList.contains('dark-mode');
    const shadowColor = isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)';

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 20px ${shadowColor}`;
  });

  card.addEventListener('mouseleave', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const defaultShadow = isDarkMode ? '0 4px 10px rgba(255, 255, 255, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)';

    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    card.style.boxShadow = defaultShadow;
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
  });
});

// Floating coffee bubbles (universal)
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.style.left = `${Math.random() * 100}vw`;
  bubble.style.width = `${10 + Math.random() * 20}px`;
  bubble.style.height = bubble.style.width;
  bubble.style.animationDuration = `${8 + Math.random() * 4}s`;
  document.querySelector('.bubbles-container').appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 12000);
}


// NEW:
const isMobile = window.innerWidth <= 768;
const bubbleInterval = isMobile ? 300 : 150;
setInterval(createBubble, bubbleInterval);



// Function to apply dark mode (declared globally for initial load check)
const applyDarkMode = (isDarkMode) => {
  const body = document.body;
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (isDarkMode) {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('dark-mode');
    if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Re-apply correct card shadows immediately after mode change for index.html cards
  document.querySelectorAll('.card').forEach(card => {
    const currentShadow = isDarkMode ? '0 4px 10px rgba(255, 255, 255, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)';
    card.style.boxShadow = currentShadow;
  });

  // Handle about-me-container shadow if it exists on the page
  const aboutMeCard = document.querySelector('.about-me-container');
  if (aboutMeCard) {
    const currentAboutMeShadow = isDarkMode ? '0 8px 30px rgba(0, 0, 0, 0.5)' : '0 8px 30px rgba(0, 0, 0, 0.2)';
    aboutMeCard.style.boxShadow = currentAboutMeShadow;
  }
  // No specific shadow adjustment needed for .skincare-container as it uses CSS for dark mode
};

// Check for saved dark mode preference on load (runs immediately)
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
  applyDarkMode(true);
} else {
  applyDarkMode(false); // Ensure light mode is applied if no preference or disabled
}


// All other DOM-related logic runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const cardSections = document.querySelectorAll('.card-section');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body; // Re-declare for scope within DOMContentLoaded

  // Dark mode toggle event listener
  if (darkModeToggle) { // Ensure button exists before adding listener
    darkModeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        applyDarkMode(false);
        localStorage.setItem('darkMode', 'disabled');
      } else {
        applyDarkMode(true);
        localStorage.setItem('darkMode', 'enabled');
      }
    });
  }

  // Existing tab functionality
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      cardSections.forEach(section => section.classList.add('hidden'));
      document.querySelector(`.card-section[data-category="${category}"]`).classList.remove('hidden');
    });
  });

  // --- Floating Cat Logic (Generalized) ---
  // This function handles the floating cat's message display for any page
  function setupFloatingCat(messages) {
    const floatingCat = document.getElementById('floatingCat');
    const catSpeechBubble = document.getElementById('catSpeechBubble');

    if (floatingCat && catSpeechBubble) {
      let messageTimeout;

      function showNextMessage() {
        clearTimeout(messageTimeout);

        const randomIndex = Math.floor(Math.random() * messages.length);
        catSpeechBubble.textContent = messages[randomIndex];
        catSpeechBubble.style.opacity = '1';
        catSpeechBubble.style.visibility = 'visible';

        messageTimeout = setTimeout(() => {
          catSpeechBubble.style.opacity = '0';
          catSpeechBubble.style.visibility = 'hidden';
        }, 7000); // 7 seconds
      }

      floatingCat.addEventListener('click', showNextMessage);
      showNextMessage(); // Initial message on load
    }
  }

  // Determine which page we are on and apply specific logic
  const isIndexPage = document.querySelector('.card-section[data-category="personal"]'); // Unique to index.html
  const isMePage = document.querySelector('.about-me-container'); // Unique to me.html
  const isSkincarePage = document.querySelector('.skincare-container'); // Unique to skincare.html

  if (isIndexPage) {
    const indexMessages = [
      "Meow! Welcome to Karen's corner!",
      "Hope you're having a purr-fect day!",
      "Stay pawsitive!",
      "Did you know Karen loves cats? That's me!",
      "Karen enjoys a good scoop of ice cream!",
      "Eating is one of Karen's favorite hobbies!",
      "Psst... Karen loves to annoy her BF! 😉",
      "You're doing great, keep going!",
      "A little progress each day adds up to big results.",
      "Believe in yourself, just like Karen believes in naps!",
      "Don't forget to smile today!",
      "Have a meow-tastic time exploring!",
      "When Karen's bored, she alters her hair!",
      "Karen loves sending random reels to her BF on all social media!",
      "Karen's love language is literally physical!",
      "She really, really loves her man!",
      "Karen keeps asking for night outs, knowing it'll probably never happen! 😂",
      "She has a lot of cats in their house!",
      "When Karen sees a cat, her eyes turn into paw-shaped eyes! 🐾"
    ];
    setupFloatingCat(indexMessages);
  } else if (isMePage) {
    const meMessages = [
      "This is what I've been telling you!"
    ];
    setupFloatingCat(meMessages);
  } else if (isSkincarePage) {
    const skincareMessages = [
      "Remember to hydrate for glowing skin!",
      "SPF is your best friend!",
      "Gentle cleansing is key!",
      "Consistency is crucial in skincare!",
      "Listen to your skin's needs!",
      "Don't forget your neck, meow!"
    ];
    setupFloatingCat(skincareMessages);

    // --- Floating Navigation Logic for skincare.html ---
    const floatingNavButtons = document.querySelectorAll('.floating-nav-button');
    if (floatingNavButtons.length > 0) {
        floatingNavButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default anchor jump
                const targetId = button.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth' // Smooth scroll to the section
                    });
                }
            });
        });
    }
  }
});





//Spotify player
const spotifyToggle = document.getElementById('spotifyToggle');
const floatingSpotifyPlayer = document.getElementById('floatingSpotifyPlayer');

// Check saved visibility
const savedSpotifyVisibility = localStorage.getItem('spotifyPlayerVisible');
if (savedSpotifyVisibility === 'visible') {
  floatingSpotifyPlayer.classList.remove('hidden-player');
} else if (savedSpotifyVisibility === 'hidden' || savedSpotifyVisibility === null) {
  floatingSpotifyPlayer.classList.add('hidden-player'); // default to hidden
}


spotifyToggle.addEventListener('click', () => {
  floatingSpotifyPlayer.classList.toggle('hidden-player');

  // Save visibility preference
  const state = floatingSpotifyPlayer.classList.contains('hidden-player') ? 'hidden' : 'visible';
  localStorage.setItem('spotifyPlayerVisible', state);
});







  const cat = document.getElementById("floatingCat");
  const bubble = document.getElementById("catSpeechBubble");
  const messages = [
    "Don't be shy, I don't bite 🐾",
    "Tell hooman what can be better 😺",
    "You can stay anonymous, I won't tell 😼",
    "Your feedback makes us purr~ 🐈",
    "Meow if something feels off!",
  ];

  let index = 0;
  let intervalId = null;

  // Tap to toggle speech bubble
  cat.addEventListener("click", () => {
    bubble.classList.toggle("show");

    // If showing, start rotating messages
    if (bubble.classList.contains("show")) {
      bubble.innerText = messages[index];
      intervalId = setInterval(() => {
        index = (index + 1) % messages.length;
        bubble.innerText = messages[index];
      }, 5000);
    } else {
      clearInterval(intervalId);
    }
  });




let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-images img");
const carouselImages = document.querySelector(".carousel-images");
const totalSlides = slides.length;

document.querySelector(".next").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

function updateCarousel() {
  carouselImages.style.transform = `translateX(-${currentSlide * 100}%)`;
}
