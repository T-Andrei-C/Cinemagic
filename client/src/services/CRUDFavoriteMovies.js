export const getFavoriteMovies = async () => {
    try {
        const response = await fetch("http://localhost:5000/favorites");
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('Fetch aborted');
        } else {
            console.log(error.message);
        }
    }
}

export const getFavoriteMovie = async (title) => {
    try {
        const response = await fetch("http://localhost:5000/favorites/" + title);
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('Fetch aborted');
        } else {
            console.log(error.message);
        }
        return null;
    }
}

export const addToFavoriteMovies = async (movie) => {
    const request = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({...movie}),
    });
    return movie;
}

export const deleteFromFavoriteMovies = async (movie) => {
    const request = await fetch("http://localhost:5000/favorites", {
        method: "DELETE",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title: movie.Title}),
    });
    return movie;
}