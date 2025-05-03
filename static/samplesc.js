document.getElementById('speakBtn').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value;

    if (textInput.trim() !== "") {
        const speech = new SpeechSynthesisUtterance(textInput);
        
        // Set voice options if necessary
        // speech.voice = speechSynthesis.getVoices()[0];
        
        speech.onstart = () => {
            document.getElementById('progress').innerText = "Speaking...";
        };

        speech.onend = () => {
            document.getElementById('progress').innerText = "Finished!";
        };

        // Speak the text
        window.speechSynthesis.speak(speech);
    } else {
        alert("Please enter some text");
    }
});