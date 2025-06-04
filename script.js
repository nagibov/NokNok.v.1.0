document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let isAnimating = false;
  
  // Initialize
  prepareSlides();
  updateSlides(true); // Initial load without animation
  
  // Event listeners
  document.getElementById('prev')?.addEventListener('click', prevSlide);
  document.getElementById('next')?.addEventListener('click', nextSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Swipe navigation for touch devices
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      nextSlide(); // Swipe left
    } else if (touchEndX - touchStartX > 50) {
      prevSlide(); // Swipe right
    }
  }
  
  function prepareSlides() {
    slides.forEach((slide, index) => {
      if (index !== currentSlide) {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      }
      
      // Prepare slide elements for animation
      const content = slide.querySelector('.slide-content');
      const circles = slide.querySelectorAll('.bg-circle');
      const listItems = slide.querySelectorAll('li');
      const tableRows = slide.querySelectorAll('tr');
      
      if (content) {
        content.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        content.style.transform = 'translateY(40px)';
        content.style.opacity = '0';
      }
      
      circles.forEach((circle, i) => {
        circle.style.transition = `transform ${0.6 + i * 0.2}s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity ${0.6 + i * 0.2}s ease`;
        circle.style.transform = 'scale(0.8)';
        circle.style.opacity = '0';
      });
      
      listItems.forEach((item, i) => {
        item.style.transition = `transform ${0.4 + i * 0.1}s ease, opacity ${0.4 + i * 0.1}s ease`;
        item.style.transform = 'translateX(-20px)';
        item.style.opacity = '0';
      });
      
      tableRows.forEach((row, i) => {
        row.style.transition = `transform ${0.3 + i * 0.08}s ease, opacity ${0.3 + i * 0.08}s ease`;
        row.style.transform = 'translateY(10px)';
        row.style.opacity = '0';
      });
    });
  }
  
  function prevSlide() {
    if (currentSlide > 0 && !isAnimating) {
      isAnimating = true;
      exitAnimation(slides[currentSlide], 'right', () => {
        currentSlide--;
        updateSlides();
      });
    }
  }
  
  function nextSlide() {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      isAnimating = true;
      exitAnimation(slides[currentSlide], 'left', () => {
        currentSlide++;
        updateSlides();
      });
    }
  }
  
  function exitAnimation(slide, direction, callback) {
    const content = slide.querySelector('.slide-content');
    const translateX = direction === 'left' ? '-30px' : '30px';
    
    if (content) {
      content.style.transform = `translateX(${translateX})`;
      content.style.opacity = '0';
    }
    
    setTimeout(() => {
      slide.style.opacity = '0';
      setTimeout(() => {
        slide.style.display = 'none';
        callback();
      }, 300);
    }, 300);
  }
  
  function updateSlides(noAnimation = false) {
    const slide = slides[currentSlide];
    slide.style.display = 'flex';
    
    // Slight delay to ensure display change is rendered first
    setTimeout(() => {
      slide.style.opacity = '1';
      
      if (!noAnimation) {
        animateSlideElements(slide);
      } else {
        // For initial load, show elements without animation
        resetSlideElements(slide);
      }
      
      isAnimating = false;
    }, 50);
  }
  
  function animateSlideElements(slide) {
    const content = slide.querySelector('.slide-content');
    const circles = slide.querySelectorAll('.bg-circle');
    const listItems = slide.querySelectorAll('li');
    const tableRows = slide.querySelectorAll('tr');
    
    // Animate main content
    if (content) {
      setTimeout(() => {
        content.style.transform = 'translateY(0)';
        content.style.opacity = '1';
      }, 100);
    }
      // Animate background circles with delay - keep them semi-transparent
    circles.forEach((circle, i) => {
      setTimeout(() => {
        circle.style.transform = 'scale(1)';
        circle.style.opacity = '0.05'; // Keep them faded with 5% opacity
      }, 300 + i * 150);
    });
    
    // Animate list items with staggered delay
    listItems.forEach((item, i) => {
      setTimeout(() => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '1';
      }, 500 + i * 100);
    });
    
    // Animate table rows with staggered delay
    tableRows.forEach((row, i) => {
      setTimeout(() => {
        row.style.transform = 'translateY(0)';
        row.style.opacity = '1';
      }, 500 + i * 80);
    });
  }
  
  function resetSlideElements(slide) {
    // Reset all animations for initial load
    const content = slide.querySelector('.slide-content');
    const circles = slide.querySelectorAll('.bg-circle');
    const listItems = slide.querySelectorAll('li');
    const tableRows = slide.querySelectorAll('tr');
    
    if (content) {
      content.style.transform = 'translateY(0)';
      content.style.opacity = '1';
    }
      circles.forEach(circle => {
      circle.style.transform = 'scale(1)';
      circle.style.opacity = '0.05'; // Keep them faded with 5% opacity
    });
    
    listItems.forEach(item => {
      item.style.transform = 'translateX(0)';
      item.style.opacity = '1';
    });
    
    tableRows.forEach(row => {
      row.style.transform = 'translateY(0)';
      row.style.opacity = '1';
    });
  }
});
