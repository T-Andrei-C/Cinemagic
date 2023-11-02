import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Movies from './Movies';
import {getAllMovies} from "../services/CRUDMovies";

export default function Home() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  // const getMovies = async(abort) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("http://127.0.0.1:5000/api/movies", { signal: abort.signal} );
  //     const data = await response.json();
  //     setLoading(false);
  //     setMovies(data);
  //   } catch (error) {
  //     if(error.name === "AbortError") {
  //       console.log('Fetch aborted');
  //     } else {
  //     console.log(error.message);
  //     }
  //   };
  // }

  useEffect(() => {
    setLoading(true);
    getAllMovies().then(movies => {
      setMovies(movies);
    })
    setLoading(false);
  }, [])

  return loading ? (
      <Loading />
    ) : movies ? (
      <Movies movies={movies}/>
    ) : null;
}
