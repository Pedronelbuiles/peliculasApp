import { useEffect, useState } from "react";
import { MovieDBNMoviesResponse, Movie } from '../interfaces/movieInterface';
import movieDB from "../api/movieDB";

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: []
    })

    const getMovies = async () => {
        const nowPlayingPromise = movieDB.get<MovieDBNMoviesResponse>('/now_playing')
        const popularPromise = movieDB.get<MovieDBNMoviesResponse>('/popular')
        const topRatedPromise = movieDB.get<MovieDBNMoviesResponse>('/top_rated')
        const upcomingPromise = movieDB.get<MovieDBNMoviesResponse>('/upcoming')

        const respuestas = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ])

        setMoviesState({
            nowPlaying: respuestas[0].data.results,
            popular: respuestas[1].data.results,
            topRated: respuestas[2].data.results,
            upcoming: respuestas[3].data.results
        })

        setIsLoading(false)
    }

    useEffect(() => {
        //Now-playing
        getMovies()
        
    }, [])

    return {
        ...moviesState,
        isLoading
    }
}
