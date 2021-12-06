import { memo } from "react";
import { useState, useRef, useCallback, useEffect } from "react";

import MoviesList from "./MoviesList";
import Pagination from './Pagination';
import movieApi from '../api/movieApi'

const ShowMovies = () => {
    const emptyMovie = useRef([]);
    const [moviesPerPage] = useState(20);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesItem, setMoviesItem] = useState(emptyMovie.current);
    const [totalMovies, setTotalMovies] = useState(0);
    const [director, setDirector] = useState('');
    const [country, setCountry] = useState('');


    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchMovies = async () => {
        console.log('calling api...');
        setLoading(true);
        try {
            const response = await movieApi.getAllMovies(currentPage, moviesPerPage, director, country);
            setTotalMovies(response.total_movies);
            setMoviesItem(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePageNumber = useCallback(pageNumber => setCurrentPage(pageNumber), [])

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Director"
                        value={director}
                        onChange={e => setDirector(e.target.value.trim())}
                    />
                </div>
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        value={country}
                        onChange={e => setCountry(e.target.value.trim())}
                    />
                    <div className="btn-group me-2" role="group">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={fetchMovies}>
                            Get data
                        </button>

                    </div>
                </div>
            </div>
            <div className='container mt-1'>
                {moviesItem.length > 0 &&
                    <Pagination
                        moviesPerPage={moviesPerPage}
                        totalMovies={totalMovies}
                        handleChangePageNumber={handleChangePageNumber}
                    />
                }
                {loading &&
                    <div className="alert alert-info">Loading...</div>
                }
                {!loading && <MoviesList movies={moviesItem} currentPage={currentPage} pageSize={moviesPerPage} />}
            </div>
        </div>
    )
}

export default memo(ShowMovies);