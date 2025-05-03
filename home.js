// Open the popup when clicking the "Show Fun Fact" button
document.getElementById("open-popup").addEventListener("click", function () {
  document.getElementById("popup").style.display = "block";
});

// Close popup when clicking the "X" button
document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
});

// Close popup when clicking the "Cool!" button
document.getElementById("popup-button").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
});

// Close popup when clicking outside the popup box
window.addEventListener("click", function (event) {
  let popup = document.getElementById("popup");
  if (event.target === popup) {
      popup.style.display = "none";
  }
});
