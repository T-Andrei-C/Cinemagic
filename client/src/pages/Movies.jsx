import {useState, useEffect, useRef} from "react";
import Movie from "../components/Movie";
import MovieDetails from "./MovieDetails";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {addToFavoriteMovies, deleteFromFavoriteMovies, getFavoriteMovies} from "../services/CRUDFavoriteMovies";
import {addItemToCart, deleteItemFromCart, getCartItems, updateCartQuantity} from "../services/CRUDCart";
import {useNavigate} from "react-router-dom";

export default function Movies({movies}) {
    let [moviesToDisplay, setMoviesToDisplay] = useState(movies);
    let [copyMovies, setCopyMovies] = useState(movies);
    const [searchPhraze, setSearchPhraze] = useState("");
    const [renderOne, setRenderOne] = useState(null);
    const [favorites, setFavorites] = useState(null);
    const [cart, setCart] = useState(null);
    const [favoriteToSave, setFavoriteToSave] = useState([]);
    const [itemToSave, setItemToSave] = useState([]);
    const genres = [...new Set(movies.map((movie) => movie.Genre).join(",").replace(/\s/g, '').split(","))];
    const btnRef = useRef();
    const navigate = useNavigate();

    const zaaz = "Sorted Z-A | Sort A-Z";
    const azza = "Sorted A-Z | Sort Z-A";
    const sbt = "Sort by Title";

    useEffect(() => {
        getFavoriteMovies().then(movies => setFavorites(movies));
    }, [favoriteToSave]);


    useEffect(() => {
        getCartItems().then(items => setCart(items));
    }, [itemToSave]);

    const sortingFunction = (array, reverse = false) =>
        [...array].sort((a, b) =>
            reverse
                ? b.Title.localeCompare(a.Title)
                : a.Title.localeCompare(b.Title)
        );

    const sorter = (e) => {
        if (e.target.innerText === sbt || e.target.innerText === zaaz) {
            setMoviesToDisplay((previous) => sortingFunction(previous));
            e.target.innerText = azza;
        } else if (e.target.innerText === azza) {
            setMoviesToDisplay((previous) => sortingFunction(previous, true));
            e.target.innerText = zaaz;
        }
    };

    const search = (e) => {
        moviesToDisplay = copyMovies;
        const filterByPhraze = moviesToDisplay.filter(
            (movie) => movie.Title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setMoviesToDisplay(filterByPhraze);
        setSearchPhraze(e.target.value);
        btnRef.current.innerText = sbt;
    };

    const filterByGenre = (e) => {
        const filteredByGenre = movies.filter(movie => movie.Genre.includes(e.target.value))
        setMoviesToDisplay(filteredByGenre);
        setCopyMovies(filteredByGenre);
        btnRef.current.innerText = sbt;
    }

    const isFavorite = (movie) => {
        if (favorites.length) {
            const has = (element) => element.Title === movie.Title;
            return favorites.some(has) ? <AiFillHeart/> : <AiOutlineHeart/>;
        }
        return <AiOutlineHeart/>;
    };

    const addOrRem = (item) =>
        // isFavorite(item).type.name === <AiOutlineHeart/>.type.name
        //     ? addToFavorites(item)
        //     : deleteFromFavorites(item);
        isFavorite(item).type.name === <AiOutlineHeart/>.type.name
            ? addToFavoriteMovies(item, setFavoriteToSave)
            : deleteFromFavoriteMovies(item, setFavoriteToSave);

    const isInCart = (movie) => {
        if (cart.length) {
            const has = (element) => element.Title === movie.Title;
            return cart.some(has) ? "Item In Cart" : "Add to Cart"
        }
        return "Add to Cart";
    }

    const addToCart = async (movie) => {
        const request = await fetch("http://localhost:5000/cart", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({...movie})
        })
        const response = await request.json();
        setItemToSave(previous => [...previous, movie]);
    }

    const deleteFromCart = async (movie) => {
        const movieToDelete = JSON.parse(JSON.stringify(movie));
        const request = await fetch("http://localhost:5000/cart", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({title: movieToDelete.Title})
        })
        const response = await request.json();
        console.log(response);
        setItemToSave(previous => [...previous, movie]);
    }

    const updateQuanitity = async (movie, e) => {
        const currentMovie = cart.find(item => item.Title === movie.Title);
        const quantity = e.target.innerText === "+" ? currentMovie.Quantity + 1 : currentMovie.Quantity - 1;

        const movieCopy = {Title: movie.Title, Quantity: quantity, Price: (movie.Price * quantity).toFixed(2)}

        const request = await fetch("http://localhost:5000/cart", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(movieCopy)
        })
        const response = await request.json();
        setItemToSave(previous => [...previous, movie]);
    }

    return (
        <>
            <div className="movies">
                <div className="sort-btns">
                    <select onChange={filterByGenre}>
                        <option disabled selected>Genres</option>
                        {genres && genres.map((genre, i) => <option key={i}>{genre}</option>)}
                    </select>
                    <button className="sort" onClick={sorter} ref={btnRef}>
                        {sbt}
                    </button>
                    <input
                        type="text"
                        placeholder="-- Search Movie --"
                        value={searchPhraze}
                        onChange={search}
                    />
                </div>
                <div className="all-movies">
                    {favorites && moviesToDisplay && cart &&
                        moviesToDisplay.map((movie, i) =>
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

