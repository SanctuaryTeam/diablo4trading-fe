window.addEventListener('DOMContentLoaded', function() {
  const termsCheckbox = document.getElementById('termsCheckbox');
  const submitButton = document.getElementById('submitButton');
  const overlay = document.getElementById('overlay');

  let countdown = 3.8;
  let timerInterval;

  function updateButtonState() {
    if (termsCheckbox.checked) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  function startCountdown() {
    updateButtonState();
    countdown = 10;
    timerInterval = setInterval(function() {
      countdown--;
      submitButton.textContent = `Wait ${countdown}s`;
      if (countdown === 0) {
        clearInterval(timerInterval);
        overlay.style.display = 'block'; // Show the overlay after 10 seconds
        setTimeout(showImage, 3800); // Display image after 5 seconds
      }
    }, 1000);
  }

  function showImage() {
    // Hide other content and display only the image
    document.body.innerHTML = '<div id="overlay"><img src="public/images/entry.gif" alt="img"></div>';
    setTimeout(redirectToLink, 0); // Redirect after 5 seconds
  }

  function redirectToLink() {
    window.location.href = 'http://localhost:5173/en/trade/search/seasonal';
  }

  termsCheckbox.addEventListener('change', function() {
    updateButtonState();
  });

  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (termsCheckbox.checked && !submitButton.disabled) {
      startCountdown();
    } else if (!termsCheckbox.checked) {
      alert('Please check the terms before clicking the button.');
    } else if (submitButton.disabled) {
      alert('Please wait 10 seconds before clicking the button.');
    }
  });
});
