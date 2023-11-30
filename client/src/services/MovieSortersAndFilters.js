
const descending = "Sorted Z-A | Sort A-Z";
const ascending = "Sorted A-Z | Sort Z-A";
const sortByTitle = "Sort by Title";

export const ascendingSorting = (movies) => [...movies].sort((a, b) => a.Title.localeCompare(b.Title));
export const descendingSorting = (movies) => [...movies].sort((a, b) => b.Title.localeCompare(a.Title));

export const sorter = (e, setMoviesToDisplay, movies) => {
    if (e.target.innerText === sortByTitle || e.target.innerText === descending) {
        setMoviesToDisplay(ascendingSorting(movies));
        e.target.innerText = ascending;
    } else if (e.target.innerText === ascending) {
        setMoviesToDisplay(descendingSorting(movies));
        e.target.innerText = descending;
    }
};

export const search = (e, setSearchPhrase, setMoviesToDisplay, movies) => {
    const filterByPhrase = movies.filter(
        (movie) => movie.Title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMoviesToDisplay(filterByPhrase);
    setSearchPhrase(e.target.value);
};

export const filterByGenre = (e, setMoviesToDisplay, movies) => {
    const filteredByGenre = movies.filter(movie => movie.Genre.includes(e.target.value));
    setMoviesToDisplay(filteredByGenre);
}