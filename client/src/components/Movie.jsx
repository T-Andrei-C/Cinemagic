import FavoritesButton from "./FavoritesButton";
import AddToCartButton from "./AddToCartButton";

export default function Movie({
    movie,
    cart,
    onClick,
    favoriteMovies,
    setFavoriteToSave,
    setItemToSave
}) {

    return (
        <div className="movie">
            <img src={movie.Poster} alt={movie.Title} onClick={onClick}/>
            <div>
                <h3>{movie.Title}</h3>
                <p>${movie.Price}</p>
            </div>
            <div>
                <FavoritesButton movie={movie} favoriteMovies={favoriteMovies} setFavoriteToSave={setFavoriteToSave}/>
                <AddToCartButton movie={movie} cart={cart} setItemToSave={setItemToSave}/>
            </div>
        </div>
    );
}
