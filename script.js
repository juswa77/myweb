// 3D tilt effect
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    // Check if dark mode is active to apply appropriate shadow color
    const isDarkMode = document.body.classList.contains('dark-mode');
    const shadowColor = isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'; // White for dark, black for light

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 20px ${shadowColor}`;
  });

  card.addEventListener('mouseleave', () => {
    // Revert to original transform and shadow based on current mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    const defaultShadow = isDarkMode ? '0 4px 10px rgba(255, 255, 255, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)'; // White for dark, black for light

    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    card.style.boxShadow = defaultShadow;
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
  });
});

// Floating coffee bubbles
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

setInterval(createBubble, 105);

// Tab functionality and Dark Mode logic
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const cardSections = document.querySelectorAll('.card-section');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Function to apply dark mode based on preference
  const applyDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
    } else {
      body.classList.remove('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
    }
    // Re-apply correct card shadows immediately after mode change
    document.querySelectorAll('.card').forEach(card => {
        const currentShadow = isDarkMode ? '0 4px 10px rgba(255, 255, 255, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)';
        card.style.boxShadow = currentShadow;
    });
  };

  // Check for saved dark mode preference on load
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'enabled') {
    applyDarkMode(true);
  } else {
    applyDarkMode(false); // Ensure light mode is applied if no preference or disabled
  }

  // Dark mode toggle event listener
  darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      applyDarkMode(false);
      localStorage.setItem('darkMode', 'disabled');
    } else {
      applyDarkMode(true);
      localStorage.setItem('darkMode', 'enabled');
    }
  });

  // Existing tab functionality
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      // Remove 'active' from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' to the clicked button
      button.classList.add('active');

      // Hide all card sections
      cardSections.forEach(section => section.classList.add('hidden'));

      // Show the selected card section
      document.querySelector(`.card-section[data-category="${category}"]`).classList.remove('hidden');
    });
  });

  // Floating Cat Logic
  const floatingCat = document.getElementById('floatingCat');
  const catSpeechBubble = document.getElementById('catSpeechBubble');

  const messages = [
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

  let messageTimeout;

  function showRandomMessage() { // Renamed to better reflect its new behavior
    clearTimeout(messageTimeout); // Clear any existing timeout

    // Pick a new random index every time
    const randomIndex = Math.floor(Math.random() * messages.length);
    catSpeechBubble.textContent = messages[randomIndex];
    catSpeechBubble.style.opacity = '1';
    catSpeechBubble.style.visibility = 'visible';

    // Hide the message after 7 seconds
    messageTimeout = setTimeout(() => {
      catSpeechBubble.style.opacity = '0';
      catSpeechBubble.style.visibility = 'hidden';
    }, 7000);
  }

  // Show a message when the cat is clicked
  floatingCat.addEventListener('click', showRandomMessage);

  // Show an initial message on load
  showRandomMessage();
});
