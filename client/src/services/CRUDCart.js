export const getCartItems = async (setCart) => {
    try {
        const response = await fetch("http://localhost:5000/cart");
        const data = await response.json();
        setCart(data);
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('Fetch aborted');
        } else {
            console.log(error.message);
        }
    }
}

export const addItemToCart = async (movie, setItemToSave) => {
    const request = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({...movie})
    })
}

export const deleteItemFromCart = async (movie) => {
    const movieToDelete = JSON.parse(JSON.stringify(movie));
    const request = await fetch("http://localhost:5000/cart", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({title: movieToDelete.Title})
    })
}

export const updateCartQuantity = async (movie, e, cart) => {
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
    // const response = await request.json();
    // setItemToSave(previous => [...previous, movie]);
}