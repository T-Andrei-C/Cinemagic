import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Movies from './Movies';
import {getAllMovies} from "../services/CRUDMovies";

export default function Home() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMovies(setLoading).then(movies => {
      setMovies(movies);
    })
  }, [])

  return loading ? (
      <Loading />
    ) : movies ? (
      <Movies movies={movies}/>
    ) : null;
}
