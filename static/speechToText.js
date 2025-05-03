window.addEventListener('DOMContentLoaded', () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  console.log("SpeechRecognition:", window.SpeechRecognition || window.webkitSpeechRecognition);


  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

  // Set recognition parameters
    recognition.lang = "en-US"; // Language: US English
    recognition.interimResults = true; // Real-time transcription
    recognition.maxAlternatives = 1; // Limit to one alternative
    recognition.continuous = true; // Keep listening until stopped

  // UI Elements
    const outputElement = document.getElementById("result");
    const startButton = document.getElementById("start-btn");

    console.log("Output Element:", outputElement);
    console.log("Start Button:", startButton);

    let isRecognitionActive = false; // Custom flag for recognition status

  // Predefined dictionary for correction
    const wordDictionary = ["hello", "world", "good", "morning", "fine", "thank", "you", "how", "are"];

  // Function to calculate Levenshtein Distance
    function getLevenshteinDistance(a, b) {
      const matrix = [];
      for (let i = 0; i <= b.length; i++) matrix[i] = [i];
      for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
           matrix[i][j] = matrix[i - 1][j - 1];
          } else {
           matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1) // deletion
          );
        }
      }
    }
      return matrix[b.length][a.length];
  }

  // Function to find the closest match in the dictionary
    function findClosestMatch(word, dictionary) {
      let minDistance = Infinity;
      let closestWord = word;

      dictionary.forEach((dictWord) => {
        const distance = getLevenshteinDistance(word, dictWord);
        if (distance < minDistance) {
          minDistance = distance;
          closestWord = dictWord;
        }
      });

      return closestWord;
    }

  // Function to start or stop the speech recognition
    function toggleRecognition() {
      if (isRecognitionActive) {
        recognition.stop();
        isRecognitionActive = false;
        startButton.textContent = "Start Listening";
        console.log("Speech recognition stopped.");
      } else {
        recognition.start();
        isRecognitionActive = true;
        startButton.textContent = "Stop Listening";
        console.log("Speech recognition started. Please speak.");
      }
    }

  // Event when speech is recognized
    recognition.onresult = function (event) {
      console.log("Speech Recognition Event:", event.results);

      let outputText = "";
      let correctedText = "";

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript.trim().toLowerCase();
        const confidence = result[0].confidence;

        console.log(`Recognized: ${transcript} | Confidence: ${confidence}`);

        const words = transcript.split(" ");
        words.forEach((word) => {
         let correctedWord = word;
         if (confidence < 0.7) correctedWord = findClosestMatch(word, wordDictionary);

         outputText += `${word} `;
         correctedText += `${correctedWord} `;
        });
      }

    // Display original and corrected text
      outputElement.innerHTML = `
       <strong>Original:</strong> ${outputText}<br>
       <strong>Corrected:</strong> ${correctedText}
      `;
    };

  // Handle errors
    recognition.onerror = function (event) {
      console.error("Error occurred: " + event.error);
    };

  // Stop recognition when speech ends
    recognition.onspeechend = function () {
      console.log("Speech recognition ended.");
    };

  // Add event listener to start/stop button
    startButton.addEventListener("click", toggleRecognition);
  } else {
    console.log("Speech recognition is not supported in this browser.");
  }
})
