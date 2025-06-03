document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  
  // Initialize
  updateSlides();
  
  // Event listeners
  document.getElementById('prev').addEventListener('click', prevSlide);
  document.getElementById('next').addEventListener('click', nextSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlides();
    }
  }
  
  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlides();
    }
  }
  
  function updateSlides() {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.style.display = 'flex';
        slide.style.opacity = '1';
      } else {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      }
    });
  }
});
