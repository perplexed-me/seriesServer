document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const modeButton = document.getElementById('modeButton');
    const lightbox = document.getElementById('lightbox');
    const movieFrame = document.getElementById('movieFrame');
    let isDarkMode = false;

    function fetchPopularMovies() {
        fetch('/api/movies/popular')
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => console.error('Error fetching popular movies:', error));
    }

    function fetchMoviesByQuery(query) {
        fetch(`/api/movies/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => console.error('Error fetching movies by query:', error));
    }

    function displayMovies(movies) {
        const moviesContainer = document.getElementById('movies');
        moviesContainer.innerHTML = ''; // Clear previous search results
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie');

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;
            // console.log(movie.id)
            img.addEventListener('click', function() {
                openMovieModal('https://vidsrc.xyz/embed/tv/' + movie.id);
            });

            const title = document.createElement('div');
            title.classList.add('title');
            title.textContent = movie.title;

            movieCard.appendChild(img);
            movieCard.appendChild(title);
            moviesContainer.appendChild(movieCard);
        });
    }

    // Event listener for input changes in the search bar
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            fetchMoviesByQuery(searchTerm);
        } else {
            fetchPopularMovies();
        }
    });

    // Event listener for mode toggle button
    modeButton.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        modeButton.textContent = isDarkMode ? 'Light' : 'Dark';
    });

    cngButton.addEventListener('click', function() {
        // Redirect to a page where the series can be watched
        // cngButton.textContent = 'Watch Series';
        window.open('');
    });

    // Function to open movie modal
    function openMovieModal(movieUrl) {
        // console.log(movieUrl)
        if (!movieFrame) {
            movieFrame = document.getElementById('movieFrame'); // Access movieFrame if not available
        }
        movieFrame.src = movieUrl;
        lightbox.style.display = 'block';
    }

    // Event listener for close button on lightbox
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('close-btn')) {
            lightbox.style.display = 'none';
            // Clear the movie URL to stop the video from playing
            movieFrame.src = '';
        }
    });

    // Fetch popular movies initially
    fetchPopularMovies();
});
