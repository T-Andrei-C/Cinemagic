import {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import {getFavoriteMovies} from "../services/CRUDFavoriteMovies";
import FavoritesButton from "../components/FavoritesButton";

export default function FavoriteMovies() {

    const [favorites, setFavorites] = useState([]);
    const [favoriteToSave, setFavoriteToSave] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFavoriteMovies(setLoading).then(movies => setFavorites(movies));
    }, [favoriteToSave]);

    const sortByLongestRuntime = () => {
        setFavorites(previous => [...previous].sort((a, b) => parseInt(b.Runtime) - parseInt(a.Runtime)))
    }

    const sortByShortestRuntime = () => {
        setFavorites(previous => [...previous].sort((a, b) => parseInt(a.Runtime) - parseInt(b.Runtime)))
    }

    const sortByRating = () => {
        setFavorites(previous => [...previous].sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)))
    }

    return loading ?
        <Loading/>
        : favorites.length !== 0 ?
            (
                <div className='wraper'>
                    <div className='fav-btns'>
                        <button onClick={sortByLongestRuntime}>Longest Runtime</button>
                        <button onClick={sortByShortestRuntime}>Shortest Runtime</button>
                        <button onClick={sortByRating}>Best Rated</button>
                    </div>
                    <div className='favorites'>
                        {favorites && favorites.map((favorite, i) => (
                            <div className='favorite' key={i}>
                                <img src={favorite.Poster} alt={favorite.Title}/>
                                <div>
                                    <h3>{favorite.Title}
                                        <FavoritesButton movie={favorite} setFavoriteToSave={setFavoriteToSave} favoriteMovies={favorites}/>
                                    </h3>
                                    <p><b>Release Date:</b> {favorite.Released}</p>
                                    <p><b>IMDb Rating:</b> {favorite.imdbRating}</p>
                                    <p><b>Runtime:</b> {favorite.Runtime}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : <div className="no-products">
                    <p>You have no favorite movies!</p>
                </div>
}
