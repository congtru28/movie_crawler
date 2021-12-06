import { memo } from "react";

const Pagination = ({ moviesPerPage, totalMovies, handleChangePageNumber }) => {
    console.log('render pagination');
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button type="button" className="btn btn-outline-secondary"
                            onClick={() => handleChangePageNumber(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default memo(Pagination);