// JavaScript to handle subject selection and displaying content
// JavaScript to handle search bar filtering
document.getElementById('search-bar').addEventListener('input', function () {
    let filter = this.value.toLowerCase();
    let subjectCards = document.querySelectorAll('.subject-card');

    subjectCards.forEach(function (card) {
        let subject = card.querySelector('h3').textContent.toLowerCase();
        
        // If subject includes the search term, display it, otherwise hide it
        if (subject.includes(filter)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

function showSubject(subject) {
    document.querySelectorAll('.subject-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const subjectTitle = document.getElementById('subject-title');
            const subjectContent = document.getElementById('subject-content');
            const subjectName = card.querySelector('h3').textContent;
    
            // Update the title of the subject content section based on clicked subject
            subjectTitle.textContent = subjectName;
    
            // Hide the subject categories and show the selected subject's content
            document.querySelector('.subject-categories').classList.add('hidden');
            subjectContent.classList.remove('hidden');
        });
    });
}
function goBack() {
    // Go back to the subject categories view
    document.getElementById('subject-content').classList.remove('hidden');
    document.querySelector('.subject-categories').classList.remove('hidden');
}
function logInteraction(username, content_id) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "db_functions.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Interaction logged:', xhr.responseText);
        }
    };
    xhr.send("action=logInteraction&username=" + encodeURIComponent(username) + "&content_id=" + encodeURIComponent(content_id));
}

