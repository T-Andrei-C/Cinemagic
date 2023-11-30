import {useState, useEffect} from "react";
import Movie from "../components/Movie";
import {getFavoriteMovies} from "../services/CRUDFavoriteMovies";
import {getCartItems} from "../services/CRUDCart";
import {useNavigate} from "react-router-dom";
import {filterByGenre, search, sorter} from "../services/MovieSortersAndFilters";

export default function Movies({movies}) {
    const [moviesToDisplay, setMoviesToDisplay] = useState(movies);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);
    const [favoriteToSave, setFavoriteToSave] = useState([]);
    const [itemToSave, setItemToSave] = useState([]);
    const [loading, setLoading] = useState(false);

    const genres = [...new Set(movies.map((movie) => movie.Genre).join(",").replace(/\s/g, '').split(","))];
    const navigate = useNavigate();

    useEffect(() => {
        getFavoriteMovies(setLoading).then(movies => setFavorites(movies));
    }, [favoriteToSave]);


    useEffect(() => {
        getCartItems().then(items => setCart(items));
    }, [itemToSave]);

    return (
        <>
            <div className="movies">
                <div className="sort-btns">
                    <select onChange={(e) => filterByGenre(e, setMoviesToDisplay, movies)}>
                        <option disabled selected>Genres</option>
                        {genres && genres.map((genre, i) => <option key={i}>{genre}</option>)}
                    </select>
                    <button className="sort" onClick={(e) => sorter(e, setMoviesToDisplay, movies)}>
                        Sort by Title
                    </button>
                    <input
                        type="text"
                        placeholder="-- Search Movie --"
                        value={searchPhrase}
                        onChange={(e) => search(e, setSearchPhrase, setMoviesToDisplay, movies)}
                    />
                </div>
                <div className="all-movies">
                    {moviesToDisplay.map((movie, i) =>
                            <Movie
                                key={i}
                                movie={movie}
                                cart={cart}
                                onClick={() => navigate(`/${movie.Title}/details`)}
                                favoriteMovies={favorites}
                                setFavoriteToSave={setFavoriteToSave}
                                setItemToSave={setItemToSave}
                            />
                        )}
                </div>
            </div>
        </>
    );
}