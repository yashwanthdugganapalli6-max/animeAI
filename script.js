const animeData = [
    {
        title: "Fullmetal Alchemist: Brotherhood",
        genres: ["action", "fantasy"],
        mood: ["motivational", "hyped"],
        length: ["long"],
        rating: ["teen"],
        summary: "Two brothers search for a Philosopher's Stone after a failed alchemical ritual to bring their mother back to life.",
        episodes: "64 Episodes",
        matchReason: "Matches your love for high-stakes action and motivational character growth."
    },
    {
        title: "Your Name (Kimi no Na wa)",
        genres: ["romance", "fantasy"],
        mood: ["sad", "happy"],
        length: ["movie"],
        rating: ["everyone"],
        summary: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
        episodes: "Movie (107 mins)",
        matchReason: "Perfect if you want a beautiful, emotional journey with a touch of the supernatural."
    },
    {
        title: "Haikyuu!!",
        genres: ["sports"],
        mood: ["motivational", "happy", "hyped"],
        length: ["long"],
        rating: ["everyone"],
        summary: "A short but determined boy aims to restore the glory of his school's volleyball team.",
        episodes: "85+ Episodes",
        matchReason: "The ultimate motivational high if you enjoyed sports and teamwork themes."
    },
    {
        title: "Violet Evergarden",
        genres: ["romance", "drama"],
        mood: ["sad", "chill"],
        length: ["short"],
        rating: ["teen"],
        summary: "An ex-soldier 'Auto Memory Doll' learns about emotions and love through ghostwriting letters for others.",
        episodes: "13 Episodes",
        matchReason: "Matches your chill/sad mood with breathtaking visuals and emotional depth."
    },
    {
        title: "Spy x Family",
        genres: ["action", "comedy"],
        mood: ["happy", "chill"],
        length: ["short", "medium"],
        rating: ["teen"],
        summary: "A spy builds a fake family to complete a mission, unaware that his wife is an assassin and his daughter is a psychic.",
        episodes: "25+ Episodes",
        matchReason: "Great for a happy, chill experience with fun action and wholesome family vibes."
    },
    {
        title: "Steins;Gate",
        genres: ["scifi", "mystery"],
        mood: ["hyped", "sad"],
        length: ["medium"],
        rating: ["teen"],
        summary: "A self-proclaimed mad scientist accidentally discovers time travel through a modified microwave.",
        episodes: "24 Episodes",
        matchReason: "High stakes, mind-bending mystery that perfectly fits a hyped/mystery preference."
    },
    {
        title: "Mushishi",
        genres: ["fantasy", "mystery"],
        mood: ["chill"],
        length: ["medium"],
        rating: ["teen"],
        summary: "A wanderer travels around solving mystical problems caused by ethereal lifeforms known as Mushi.",
        episodes: "26 Episodes",
        matchReason: "The gold standard for a chill, atmospheric fantasy experience."
    },
    {
        title: "Cyberpunk: Edgerunners",
        genres: ["scifi", "action"],
        mood: ["hyped", "sad"],
        length: ["short"],
        rating: ["mature"],
        summary: "A street kid tries to survive in a technology-obsessed city of the future by becoming an Edgerunner.",
        episodes: "10 Episodes",
        matchReason: "Fast-paced, mature sci-fi action with a powerful emotional core."
    },
    {
        title: "Kaguya-sama: Love is War",
        genres: ["romance"],
        mood: ["happy", "hyped"],
        length: ["long"],
        rating: ["teen"],
        summary: "Two student council geniuses engage in psychological warfare to trick the other into confessing their love first.",
        episodes: "37+ Episodes",
        matchReason: "Perfect for a happy mood and fans of romance who enjoy strategic, hilarious interactions."
    },
    {
        title: "Psycho-Pass",
        genres: ["scifi", "mystery", "action"],
        mood: ["hyped"],
        length: ["medium"],
        rating: ["mature"],
        summary: "In a future where justice is measured by a brain scan, a rookie inspector hunts down those whose 'Psycho-Pass' is clouded.",
        episodes: "22 Episodes",
        matchReason: "Fits your mature rating and hyped mood with a gripping sci-fi narrative."
    }
];

document.getElementById('recommendation-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const mood = document.getElementById('mood').value;
    const genre = document.getElementById('genre').value;
    const length = document.getElementById('length').value;
    const rating = document.getElementById('rating').value;

    generateRecommendations(mood, genre, length, rating);
});

function generateRecommendations(mood, genre, length, rating) {
    const resultsSection = document.getElementById('results');
    const listContainer = document.getElementById('recommendation-list');
    const bestPickContainer = document.getElementById('best-pick-container');

    // Filter logic
    let matches = animeData.filter(anime => {
        const genreMatch = anime.genres.includes(genre);
        const moodMatch = anime.mood.includes(mood);
        const lengthMatch = anime.length.includes(length);
        const ratingMatch = anime.rating.includes(rating);

        // Prioritize genre and mood, loosen others if needed
        return (genreMatch || moodMatch);
    });

    // Score matches
    matches = matches.map(anime => {
        let score = 0;
        if (anime.genres.includes(genre)) score += 3;
        if (anime.mood.includes(mood)) score += 3;
        if (anime.length.includes(length)) score += 1;
        if (anime.rating.includes(rating)) score += 1;
        return { ...anime, score };
    }).sort((a, b) => b.score - a.score).slice(0, 5);

    // If no good matches, just take top 5 diverse ones
    if (matches.length === 0) {
        matches = animeData.slice(0, 5);
    }

    // Display Results
    listContainer.innerHTML = '';
    resultsSection.classList.remove('hidden');

    matches.forEach((anime, index) => {
        if (index === 0) return; // Save best for last

        const card = document.createElement('div');
        card.className = 'anime-card glass';
        card.innerHTML = `
            <div class="anime-title">${anime.title}</div>
            <div class="anime-match">Match Score: ${Math.round((anime.score / 8) * 100)}%</div>
            <p class="anime-summary">${anime.summary}</p>
            <div class="anime-meta">
                <span>${anime.episodes}</span> | 
                <span>${anime.matchReason}</span>
            </div>
        `;
        listContainer.appendChild(card);
    });

    // Inject Best Pick
    const best = matches[0];
    bestPickContainer.innerHTML = `
        <div class="best-pick-card glass">
            <span class="best-badge">AI Best Choice</span>
            <div class="anime-title" style="font-size: 2.5rem; margin-bottom: 1rem;">${best.title}</div>
            <p class="anime-summary" style="font-size: 1.1rem; margin-bottom: 2rem;">${best.summary}</p>
            <div class="anime-match">${best.matchReason}</div>
            <div class="anime-meta" style="margin-top: 2rem;">Total Length: ${best.episodes}</div>
        </div>
    `;

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}
