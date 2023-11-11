export const getCartItems = async () => {
    try {
        const response = await fetch("http://localhost:5000/cart");
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('Fetch aborted');
        } else {
            console.log(error.message);
        }
    }
}

export const addItemToCart = async (movie) => {
    const request = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({...movie})
    })
}

export const deleteItemFromCart = async (movieToDelete) => {
    const request = await fetch("http://localhost:5000/cart", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({title: movieToDelete.Title})
    })
}

export const updateCartQuantity = async (movie) => {
    const request = await fetch("http://localhost:5000/cart", {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(movie)
    })
    return await request.json();
    // const response = await request.json();
    // setItemToSave(previous => [...previous, movie]);
}