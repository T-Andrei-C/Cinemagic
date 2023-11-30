import {addItemToCart, deleteItemFromCart, updateCartQuantity} from "../services/CRUDCart";

const AddToCartButton = ({cart, movie, setItemToSave}) => {
    const isInCart = () => {
        if (cart.length) {
            return cart.some(item => item.Title === movie?.Title) ? "Item In Cart" : "Add to Cart";
        }
        return "Add to Cart";
    }

    const addToCart = async () => {
        addItemToCart(movie).then(m => setItemToSave(previous => [...previous, m]));
    }

    const deleteFromCart = async () => {
        const movieToDelete = await JSON.parse(JSON.stringify(movie));
        deleteItemFromCart(movieToDelete).then(m => setItemToSave(previous => [...previous, m]));
    }

    const updateQuantity = async (e) => {
        const currentMovie = cart.find(item => item.Title === movie.Title);
        const quantity = e.target.innerText === "+" ? currentMovie.Quantity + 1 : currentMovie.Quantity - 1;

        const movieCopy = {Title: movie.Title, Quantity: quantity, Price: (movie.Price * quantity).toFixed(2)};

        updateCartQuantity(movieCopy).then(m => setItemToSave(previous => [...previous, m]));

    }
    return (
        isInCart() === "Item In Cart"? (
            <div className="cart-btns">
                <button type="button" onClick={cart.some(item => item.Title === movie.Title ? item.Quantity - 1 : '')
                    ? updateQuantity : () => deleteFromCart()}
                        className="first-cart-btn"
                        style={{borderRadius: '5px', padding: '0.5em 1em'}}>-
                </button>
                <p>{cart.map(item => item.Title === movie.Title ? item.Quantity : '')}</p>
                <button type="button" onClick={updateQuantity}>+</button>
            </div>
        ) : (
            <button type="button" className="add-remove-cart" onClick={addToCart}>
                {isInCart()}
            </button>
        )
    )
}

export default AddToCartButton;