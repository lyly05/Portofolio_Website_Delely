import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { space } from 'postcss/lib/list';
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.oneclick = () => {
  menuIcon.classList.toggle('bx.x');
  navbar.classList.toggle('active');
};

document.querySelectorAll('.circular-progress').forEach((progress) => {
  const value = progress.getAttribute('data-progress');
  const progressValue = progress.querySelector('.progress-value');

  let startValue = 0;
  const endValue = parseInt(value);
  const duration = 2000; // Durasi animasi dalam milidetik
  const startTime = performance.now();

  function animateProgress(timestamp) {
    const elapsed = timestamp - startTime;
    const progressPercentage = Math.min(elapsed / duration, 1); // Normalisasi waktu

    startValue = Math.floor(progressPercentage * endValue);
    progressValue.textContent = `${startValue}%`;

    // Update circular progress
    const color = progress.getAttribute('data-color');
    progress.style.setProperty('--progress', `${startValue}`);
    progress.style.setProperty('background', `conic-gradient(${color} ${startValue}%, #e0e0e0 ${startValue}%)`);

    if (startValue < endValue) {
      requestAnimationFrame(animateProgress);
    }
  }

  requestAnimationFrame(animateProgress);
});

document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Sesuaikan jika navbar fixed
        behavior: 'smooth'
      });
    }
  });
});


// script.js

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  
  contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      
      // Ambil nilai input
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      
      // Validasi sederhana
      if (!name || !email || !message) {
          alert("Harap isi semua bidang");
          return;
      }
      
      if (!email.includes("@")) {
          alert("Masukkan email yang valid");
          return;
      }
      
      // Kirim data ke backend
      try {
          const response = await fetch("http://localhost:5000/contact", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email, message }),
          });
          
          const result = await response.json();
          alert(result.message);
          contactForm.reset();
      } catch (error) {
          console.error("Error:", error);
          alert("Terjadi kesalahan, coba lagi nanti");
      }
  });
});
