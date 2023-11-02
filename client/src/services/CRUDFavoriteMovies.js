export const getFavoriteMovies = async (setFavorites) => {
    try {
        const response = await fetch("http://localhost:5000/favorites");
        const data = await response.json();
        setFavorites(data);
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('Fetch aborted');
        } else {
            console.log(error.message);
        }
    }
}

export const addToFavoriteMovies = async (movie, setFavoriteToSave) => {
    const request = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({...movie}),
    });
    const response = await request.json();
    console.log(response);
    setFavoriteToSave((previous) => [...previous, movie]);
}

export const deleteFromFavoriteMovies = async (movie, setFavoriteToSave) => {
    const request = await fetch("http://localhost:5000/favorites", {
        method: "DELETE",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title: movie.Title}),
    });
    const response = await request.json();
    console.log(response);
    setFavoriteToSave((previous) => [...previous, movie]);
}