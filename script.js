let currentQuestion = 1;
let selectedEmotion = null;
let scores = {
    action: 0,
    comedy: 0,
    drama: 0,
    scifi: 0,
    horror: 0,
    fantasy: 0,
    romance: 0,
    thriller: 0
};

function nextQuestion(qNum) {
    // Handle validation
    if (qNum === 1) {
        const selected = document.querySelector('input[name="q1"]:checked');
        if (!selected) {
            alert("Please select an option to continue!");
            return;
        }
        scores[selected.value] += 2;
    }
    
    if (qNum === 2) {
        const checkboxes = document.querySelectorAll('#q2 input[type="checkbox"]:checked');
        if (checkboxes.length === 0) {
            alert("Please select at least one quality!");
            return;
        }
        checkboxes.forEach(cb => {
            scores[cb.value] += 1;
        });
    }
    
    if (qNum === 3) {
        const selected = document.querySelector('input[name="q3"]:checked');
        if (!selected) {
            alert("Please select a vacation option!");
            return;
        }
        scores[selected.value] += 2;
    }
    
    if (qNum === 4 && !selectedEmotion) {
        alert("Please select an emotion!");
        return;
    }
    
    // Hide current question, show next
    document.getElementById('q' + qNum).style.display = 'none';
    document.getElementById('q' + (qNum + 1)).style.display = 'block';
    currentQuestion++;
    
    // Update progress bar
    updateProgress();
}

function selectEmotion(emotion) {
    // Reset all buttons
    const buttons = document.querySelectorAll('.btn-quiz');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    event.target.classList.add('active');
    selectedEmotion = emotion;
    scores[emotion] += 3; // This emotion is weighted more
    
    // Enable the next button
    document.getElementById('q4-next').disabled = false;
}

function updateProgress() {
    const progressPercent = ((currentQuestion - 1) / 5) * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';
}

function showResults() {
    // Check if user selected at least 2 genres in question 5
    const genreChecks = document.querySelectorAll('.genre-check:checked');
    if (genreChecks.length < 2 || genreChecks.length > 3) {
        alert("Please select 2-3 genres that you currently watch!");
        return;
    }
    
    // Add scores from question 5
    genreChecks.forEach(check => {
        scores[check.value] += 2;
    });
    
    // Determine top genre
    let topGenre = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    // Results data
    const results = {
        action: {
            title: "Action",
            description: "You're adventurous, energetic, and thrive on excitement! You appreciate clear goals and overcoming challenges.",
            movies: "Mad Max: Fury Road, John Wick, Mission Impossible"
        },
        comedy: {
            title: "Comedy",
            description: "You have a great sense of humor and don't take life too seriously. You value joy and laughter in your daily life.",
            movies: "Superbad, Bridesmaids, Thor: Ragnarok"
        },
        drama: {
            title: "Drama",
            description: "You're thoughtful and empathetic, with a deep appreciation for human emotions and complex relationships.",
            movies: "The Shawshank Redemption, Marriage Story, Nomadland"
        },
        scifi: {
            title: "Science Fiction",
            description: "Your curious mind loves exploring big ideas, future possibilities, and the intersection of humanity and technology.",
            movies: "Arrival, Interstellar, Blade Runner 2049"
        },
        horror: {
            title: "Horror",
            description: "You enjoy the thrill of fear in a controlled environment and appreciate psychological depth and tension.",
            movies: "Hereditary, Get Out, The Witch"
        },
        fantasy: {
            title: "Fantasy",
            description: "You have a vivid imagination and appreciate the wonder of magical worlds and epic storytelling.",
            movies: "Lord of the Rings, Pan's Labyrinth, The Princess Bride"
        },
        romance: {
            title: "Romance",
            description: "You value emotional connections and believe in the power of love to transform lives.",
            movies: "Before Sunrise, The Notebook, Pride & Prejudice"
        },
        thriller: {
            title: "Thriller",
            description: "You enjoy intelligent stories with suspense and unexpected twists that keep you guessing.",
            movies: "Gone Girl, Prisoners, Parasite"
        }
    };
    
    // Display results
    document.getElementById('result-genre').innerText = results[topGenre].title;
    document.getElementById('result-description').innerText = results[topGenre].description;
    document.getElementById('movie-recommendations').innerHTML = "<strong>Movies you might enjoy:</strong> " + results[topGenre].movies;
    
    // Hide quiz, show results
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}

function restartQuiz() {
    // Reset all values
    currentQuestion = 1;
    selectedEmotion = null;
    scores = {
        action: 0,
        comedy: 0,
        drama: 0,
        scifi: 0,
        horror: 0,
        fantasy: 0,
        romance: 0,
        thriller: 0
    };
    
    // Reset UI
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    
    // Show first question, hide others
    for (let i = 1; i <= 5; i++) {
        document.getElementById('q' + i).style.display = i === 1 ? 'block' : 'none';
    }
    
    // Reset progress bar
    document.getElementById('progress-bar').style.width = '0%';
    
    // Reset form inputs
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelectorAll('.btn-quiz').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('q4-next').disabled = true;
}