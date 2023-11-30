import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovieByTitle} from "../services/CRUDMovies";
import FavoritesButton from "../components/FavoritesButton";
import AddToCartButton from "../components/AddToCartButton";
import {getFavoriteMovies} from "../services/CRUDFavoriteMovies";
import {getCartItems} from "../services/CRUDCart";

const MovieDetails = () => {
    const [movie, setMovie] = useState([]);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favoriteToSave, setFavoriteToSave] = useState([]);
    const [itemToSave, setItemToSave] = useState([]);
    const {title} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getMovieByTitle(title).then(movie => setMovie(movie));
    }, [])

    useEffect(() => {
        getFavoriteMovies().then(movies => setFavorites(movies));
    }, [favoriteToSave]);


    useEffect(() => {
        getCartItems().then(items => setCart(items));
    }, [itemToSave]);

    const getUrlId = (url) => {
        return url?.split("/")[url.split("/").length-1]
    }

    return (
        <div className="one-movie">
            <div className="details-0">
                <iframe width="560" height="315"
                        src={`https://www.youtube.com/embed/${getUrlId(movie.Url)}`}
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                </iframe>
            </div>
            <div className="details-1">
                <div className="item-1">
                    <img src={movie.Poster} alt={movie.Title}/>
                </div>
                <div className="item-2">
                    <div className="main-details">
                        <h2>{movie.Title}</h2>
                        <p><strong>Release Date:</strong> {movie.Released}</p>
                        <p><strong>Runtime:</strong> {movie.Runtime}</p>
                        <p><strong>Genres:</strong> {movie.Genre}</p>
                        <p><strong>Directors:</strong> {movie.Director}</p>
                        <p><strong>Writers:</strong> {movie.Writer}</p>
                        <p><strong>Actors:</strong> {movie.Actors}</p>
                        <p><strong>Plot:</strong> {movie.Plot}</p>
                        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                        <p><strong>Awards:</strong> {movie.Awards}</p>
                    </div>
                    <div className="add-remove">
                        <FavoritesButton movie={movie} favoriteMovies={favorites} setFavoriteToSave={setFavoriteToSave}/>
                        <AddToCartButton movie={movie} cart={cart} setItemToSave={setItemToSave}/>
                    </div>
                </div>
            </div>
            <div className="details-2">
                <button className="back-btn" onClick={() => navigate("/")}>Back</button>
            </div>
        </div>
    )
}

export default MovieDetails;