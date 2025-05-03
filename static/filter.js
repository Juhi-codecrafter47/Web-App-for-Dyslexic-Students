document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const voiceButton = document.getElementById("voice-button");
    const resultsDiv = document.getElementById("results");
    const errorMessage = document.getElementById("error-message");

    // Check if SpeechRecognition API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error("Speech Recognition API is not supported in this browser.");
        voiceButton.disabled = true;
        voiceButton.title = "Voice search is not supported in your browser.";
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    // Start voice recognition when button is clicked
    voiceButton.addEventListener("click", () => {
        errorMessage.textContent = ""; // Clear previous errors
        recognition.start();
    });

    // Handle voice input result
    recognition.onresult = function(event) {
        const voiceText = event.results[0][0].transcript.trim();
    
        if (!voiceText) {
            errorMessage.textContent = "No speech detected. Please try again.";
            return;
        }

        searchInput.value = voiceText; // Display recognized text in the input field
        searchButton.click(); // Trigger the search function
    };

    // Handle errors in speech recognition
    recognition.onerror = function(event) {
        console.error("Speech Recognition Error:", event.error);
        errorMessage.textContent = "Error recognizing speech. Try again.";
    };

    // Search function when button is clicked
    searchButton.addEventListener("click", function () {
        const query = searchInput.value.trim();
        if (!query) {
            errorMessage.textContent = "Please enter a search query.";
            resultsDiv.innerHTML = "";
            return;
        }

        // Fetch recommendations from Flask API
        fetch(`http://127.0.0.1:5000/recommend?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = ""; // Clear previous results
                errorMessage.textContent = ""; // Clear any error messages

                if (!data || data.length === 0) {
                    resultsDiv.innerHTML = "<p>No recommendations found.</p>";
                    return;
                }

                // Display clickable recommendations
                data.forEach(item => {
                    if (item.subject_template) {
                        const resultItem = document.createElement("a");
                        resultItem.classList.add("result-item");
                        resultItem.href = `http://127.0.0.1:5000/learn/${item.subject_template.replace('.html', '')}`;
                        resultItem.innerHTML = `<h3>${item.Title}</h3>`;
                        resultItem.style.display = "block";
                        resultItem.style.textDecoration = "none";
                        resultItem.style.color = "black";
                        resultItem.style.padding = "5px";

                        resultsDiv.appendChild(resultItem);
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching recommendations:", error);
                errorMessage.textContent = "Error fetching data. Try again.";
            });
    });
});
