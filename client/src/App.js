import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import FavoriteMovies from "./pages/FavoriteMovies";
import Cart from "./pages/Cart";
import './App.scss';
import MovieDetails from "./pages/MovieDetails";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/favorites" element={<FavoriteMovies/>}/>
            <Route path="/checkout" element={<Cart/>}/>
            <Route path="/:title/details" element={<MovieDetails/>}/>
        </Route>
    )
)

function App() {
    return <RouterProvider router={router}/>
}

export default App;
