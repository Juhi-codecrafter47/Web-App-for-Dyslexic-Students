document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("close-popup");
    const popupButton = document.getElementById("popup-button");

    // Show popup automatically after 3 seconds
    setTimeout(() => {
        popup.style.display = "block";
    }, 3000);

    // Close popup when close (×) button is clicked
    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Close popup when "Cool!" button is clicked
    popupButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Close popup when clicking outside the content
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
