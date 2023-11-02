export const getAllMovies = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/movies");
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('Fetch aborted');
        } else {
            console.log(error.message);
        }
    }
}