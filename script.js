// Mobile nav toggle
const btn = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
if (btn) {
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

//Project section logic

// slider.js
(function initSliders() {
  document.querySelectorAll('.card-slider').forEach((slider) => {
    const track = slider.querySelector('.slides');
    const imgs  = Array.from(track.querySelectorAll('img'));
    const prev  = slider.querySelector('.prev');
    const next  = slider.querySelector('.next');
    const dotsWrap = slider.querySelector('.dots');

    // Build dots dynamically if empty
    if (!dotsWrap.children.length) {
      imgs.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dotsWrap.appendChild(dot);
      });
    }
    const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

    let index = 0;
    let timer = null;

    // Make each image exactly the slider width (prevents % translate quirks)
    function setSizes() {
      const w = slider.clientWidth;
      imgs.forEach(img => { img.style.width = w + 'px'; });
      track.style.width = (w * imgs.length) + 'px';
      jumpTo(index); // keep current slide aligned on resize
    }

    function setActiveDot(i) {
      dots.forEach((d, di) => d.classList.toggle('active', di === i));
    }

    function jumpTo(i) { // no animation (for init/resize)
      index = (i + imgs.length) % imgs.length;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${slider.clientWidth * index}px)`;
      requestAnimationFrame(() => {
        track.style.transition = 'transform .6s ease-in-out';
      });
      setActiveDot(index);
    }

    function goTo(i) { // animated
      index = (i + imgs.length) % imgs.length;
      track.style.transform = `translateX(-${slider.clientWidth * index}px)`;
      setActiveDot(index);
    }

    function nextSlide() { goTo(index + 1); }
    function prevSlide() { goTo(index - 1); }

    // Controls
    if (next) next.addEventListener('click', () => { nextSlide(); restart(); });
    if (prev) prev.addEventListener('click', () => { prevSlide(); restart(); });
    dots.forEach(d =>
      d.addEventListener('click', () => { goTo(parseInt(d.dataset.index, 10)); restart(); })
    );

    // Auto-slide
    function start() { if (!timer) timer = setInterval(nextSlide, 4000); }
    function stop()  { clearInterval(timer); timer = null; }
    function restart(){ stop(); start(); }

    // Pause on hover & when tab is hidden
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    // Keep alignment on resize
    window.addEventListener('resize', setSizes);

    // Init
    setSizes();
    jumpTo(0);
    start();
  });
})();


//connect gmail with contact form

  // Collect form dat
  function sendMail() {
    let nameField = document.getElementById("name");
    let emailField = document.getElementById("email");
    let messageField = document.getElementById("message");
  
    let parms = {
      from_name: nameField.value,
      from_email: emailField.value,
      message: messageField.value,
      time: new Date().toLocaleString() // sends current time
    };
  
    // Send email using EmailJS
    emailjs.send("service_qab5zde", "template_5nxfvtd", parms)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("✅ Message sent successfully!");
  
        // ✅ Clear the fields after success
        nameField.value = "";
        emailField.value = "";
        messageField.value = "";
      }, function(error) {
        console.log('FAILED...', error);
        alert("❌ Failed to send message.");
      });
  }
  
// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
