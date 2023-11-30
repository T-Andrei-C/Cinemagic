export const getAllMovies = async (setLoading) => {
    try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/api/movies");
        setLoading(false);
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('Fetch aborted');
        } else {
            console.log(error.message);
        }
    }
}

export const getMovieByTitle = async (title) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/movies/" + title);
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('Fetch aborted');
        } else {
            console.log(error.message);
        }
    }
}