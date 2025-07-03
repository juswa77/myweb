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
    // Adjusted shadow for 3D tilt in dark mode for better visibility
    const shadowColor = isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'; // White for dark, black for light

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 20px ${shadowColor}`;
  });

  card.addEventListener('mouseleave', () => {
    // Revert to original transform and shadow based on current mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    const defaultShadow = isDarkMode ? '0 8px 30px rgba(0, 0, 0, 0.5)' : '0 8px 24px rgba(0, 0, 0, 0.2)';

    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    card.style.boxShadow = defaultShadow;
  });

  card.addEventListener('mouseenter', () => {
    // Ensure smooth transition for transform and box-shadow on mouseenter
    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
  });

  // Prevent context menu on long press for mobile compatibility
  card.addEventListener('contextmenu', (e) => {
    e.preventDefault();
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

setInterval(createBubble, 400);

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
    // Re-apply correct initial card shadows immediately after mode change
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
});
