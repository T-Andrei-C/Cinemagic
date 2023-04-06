export default function MovieDetails({
  movie,
  onClick,
  addOrRemove,
  checkFavorite,
  addToCart,
  deleteCart,
  quantity,
  checkCart,
  minusQuanitity,
  plusQuanitity
}) {

  return (
    <div className="one-movie">
      <div className="details-1">
        <div class="item-1">
          <img src={movie.Poster} alt={movie.Title}/>
        </div>
        <div className="item-2">
          <div className="main-details">
            <h2>{movie.Title}</h2>
            <p><b>Release Date:</b> {movie.Released}</p>
            <p><b>Runtime:</b> {movie.Runtime}</p>
            <p><b>Genres:</b> {movie.Genre}</p>
            <p><b>Directors:</b> {movie.Director}</p>
            <p><b>Writers:</b> {movie.Writer}</p>
            <p><b>Actors:</b> {movie.Actors}</p>
            <p><b>Plot:</b> {movie.Plot}</p>
            <p><b>IMDb Rating:</b> {movie.imdbRating}</p>
            <p><b>Awards:</b> {movie.Awards}</p>
          </div>
          <div className="add-remove">
            <button className="add-remove-favs" onClick={addOrRemove}>{checkFavorite}</button>

        {checkCart === "Item In Cart" ? (
          <div>
            <button onClick={quantity.some(item => item.Title === movie.Title ? item.Quantity - 1 : '') ? minusQuanitity :  () => {deleteCart()}}>-</button>
            <p>{quantity.map(item => item.Title === movie.Title ? item.Quantity : '')}</p>
            <button onClick={plusQuanitity}>+</button>
          </div>
        ) : (
          <button className="add-remove-cart" onClick={() => {addToCart()}}>
            {checkCart}
          </button>
        )}
          </div>
        </div>
      </div>
      <div className="details-2">
        <button className="back-btn" onClick={onClick}>Back</button>
      </div>
    </div>
  )
}
  