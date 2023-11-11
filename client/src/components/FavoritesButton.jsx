import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useEffect, useState} from "react";
import {
    addToFavoriteMovies,
    deleteFromFavoriteMovies,
    getFavoriteMovie,
    getFavoriteMovies
} from "../services/CRUDFavoriteMovies";

const FavoritesButton = ({movie, favoriteMovies, setFavoriteToSave}) => {

    const isFavorite = () => {
        if (favoriteMovies?.length) {
            return favoriteMovies?.some(favorite => favorite.Title === movie.Title) ? <AiFillHeart/> : <AiOutlineHeart/>;
        }
        return <AiOutlineHeart/>;
    };

    const addOrRemoveFavoriteMovie = () =>
        isFavorite(movie).type.name === <AiOutlineHeart/>.type.name
            ? addToFavoriteMovies(movie).then(m => setFavoriteToSave(previous => [...previous, m]))
            : deleteFromFavoriteMovies(movie).then(m => setFavoriteToSave(previous => [...previous, m]));

    return (
        <button className="add-remove-favorites" onClick={() => addOrRemoveFavoriteMovie(movie)}>
            {isFavorite(movie)}
        </button>
    )
}

export default FavoritesButton;