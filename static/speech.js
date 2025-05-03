// Check if browser supports the SpeechRecognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // If true, result will be provided in real-time
    recognition.maxAlternatives = 1; // Number of possible recognition alternatives

    const startBtn = document.getElementById('start-btn');
    const resultDiv = document.getElementById('result');

    // Start listening for speech
    startBtn.addEventListener('click', () => {
        recognition.start();
        console.log('Speech recognition started.');
    });

    // Capture result from recognition event
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript; // Get the speech transcript
        resultDiv.innerText = transcript; // Display the transcript
        console.log('Speech recognized:', transcript);
    });

    // Handle errors
    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
    });

    // Stop recognition when the speech ends
    recognition.addEventListener('end', () => {
        console.log('Speech recognition stopped.');
    });
} else {
    alert('Sorry, your browser does not support the SpeechRecognition API.');
}