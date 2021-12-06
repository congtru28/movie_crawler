import { useState, useEffect, useRef, useCallback } from "react";
import { saveAs } from 'file-saver';
import MoviesList from "./MoviesList";
import Pagination from './Pagination';

import movieApi from '../api/movieApi'

const GetByUrl = () => {
    console.log('render GetByUrl')
    const emptyMovie = useRef([]);
    const [categoryUrl, setCategoryUrl] = useState('');
    const [movies, setMovies] = useState(emptyMovie.current);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(20);

    useEffect(() => {
        fetchMovies(categoryUrl, currentPage, moviesPerPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchMovies = async (url, pageIndex, pageSize) => {
        if (categoryUrl === '') {
            setMovies(emptyMovie.current);
            return;
        }

        console.log('calling api...');
        setLoading(true);
        try {
            const response = await movieApi.getMovieByUrl({
                "page_index": pageIndex,
                "page_size": pageSize,
                "url": url.endsWith('/') ? url : url + '/'
            })
            setMovies(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePageNumber = useCallback(pageNumber => setCurrentPage(pageNumber), [])

    const handleGetByUrl = () => {
        fetchMovies(categoryUrl, currentPage, moviesPerPage);
    };

    const handleExport = () => {
        const exportData = async () => {
            if (categoryUrl === '') {
                return;
            }
            try {
                setLoading(true);
                const response = await movieApi.exportMovieByUrl({
                    "urls": [categoryUrl.endsWith('/') ? categoryUrl : categoryUrl + '/']
                })
                const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
                saveAs.saveAs(blob, "movies.json");
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        exportData();
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="https://ephimmoi.net/category/hanh-dong/"
                        value={categoryUrl}
                        onChange={e => setCategoryUrl(e.target.value.trim())}
                    />
                    <div className="btn-group me-2" role="group">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleGetByUrl}>
                            Get data
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleExport}>
                            Export data
                        </button>
                    </div>
                </div>
            </div>
            <div className='container mt-1'>
                {movies.length > 0 &&
                    <Pagination
                        moviesPerPage={moviesPerPage}
                        totalMovies={200}
                        handleChangePageNumber={handleChangePageNumber}
                    />
                }
                {loading &&
                    <div className="alert alert-info">Loading...</div>
                }
                {!loading && <MoviesList movies={movies} currentPage={currentPage} pageSize={moviesPerPage} />}
            </div>
        </div>
    )
}

export default GetByUrl;