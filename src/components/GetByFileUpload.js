import { useState, useRef, useCallback, useEffect } from "react";

import { saveAs } from 'file-saver';

import movieApi from "../api/movieApi";
import MoviesList from "./MoviesList";
import Pagination from './Pagination';

const GetByFileUpload = () => {
    const emptyMovie = useRef([]);
    const [moviesPerPage] = useState(20);
    const [categoryList, setCategoryList] = useState(emptyMovie.current);
    const [files, setFiles] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesItem, setMoviesItem] = useState(emptyMovie.current);
    const [totalMovies, setTotalMovies] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleChangePage(selectedCategory), [currentPage]);

    const handleChange = e => {
        if (e.target.files[0] === undefined) {
            return
        }
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            setFiles(e.target.result);
        };
    };

    const handleExport = () => {
        const exportData = async () => {
            if (files === '') {
                return;
            }
            try {
                setLoading(true);
                const response = await movieApi.exportMovieByUrl({
                    "urls": files.split("\r").map(url => url.trim().endsWith('/') ? url.trim() : url.trim() + '/')
                })
                const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
                saveAs.saveAs(blob, "movies.json");
                setCategoryList(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        exportData();
    }

    const handleItemClick = (index) => {
        setCurrentPage(1);
        if (categoryList.length === 0 || categoryList.length < index) {
            return;
        }
        else {
            setSelectedCategory(index);
            handleChangePage(index);
        }
    }

    const handleChangePageNumber = useCallback(pageNumber => setCurrentPage(pageNumber), [])

    const handleChangePage = (index) => {
        const lastIndexOfPage = currentPage * moviesPerPage;
        const firstIndexOfPage = lastIndexOfPage - moviesPerPage;
        if (categoryList.length > 0) {
            const moviesCategory = categoryList[index].slice(firstIndexOfPage, lastIndexOfPage);
            setTotalMovies(categoryList[index].length);
            setMoviesItem(moviesCategory);
        }
    }

    return (
        <>
            <div className="input-group">
                <input type="file" className="form-control"
                    aria-label="Upload"
                    onChange={handleChange} />
                <button className="btn btn-outline-secondary"
                    type="button" onClick={handleExport}>Export</button>
            </div>
            <div className="list-group">
                {
                    files && files.split("\r").map((item, index) => (
                        <button type="button" className="list-group-item list-group-item-action"
                            onClick={() => handleItemClick(index)} key={index}
                        >
                            {item}
                        </button>
                    ))
                }
            </div>
            {loading &&
                <div className="alert alert-info">Exporting...</div>
            }
            <div className='container mt-1'>

                {moviesItem.length > 0 &&
                    <Pagination
                        moviesPerPage={moviesPerPage}
                        totalMovies={totalMovies}
                        handleChangePageNumber={handleChangePageNumber}
                    />
                }
                {!loading && <MoviesList movies={moviesItem} currentPage={currentPage} pageSize={moviesPerPage} />}
            </div>
        </>
    );
}

export default GetByFileUpload;