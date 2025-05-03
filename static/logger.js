document.addEventListener("DOMContentLoaded", function () {
    let username = document.body.getAttribute("data-username"); // Get username from PHP
    if (!username) return; // Ensure user is logged in

    document.querySelectorAll(".log-interaction").forEach(element => {
        element.addEventListener("click", function () {
            let contentId = this.getAttribute("data-content-id");
            let page = document.body.getAttribute("data-page"); // Detect page name

            if (!contentId) {
                console.error("Missing content ID!");
                return;
            }

            fetch("db_functions.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ 
                    username: username, 
                    content_id: contentId,
                    page: page  // Send page info for better tracking
                })
            })
            .then(response => response.json())
            .then(data => console.log("Logged interaction:", data))
            .catch(error => console.error("Error logging interaction:", error));
        });
    });
});
