import { memo } from "react";

const MoviesList = ({ movies, currentPage, pageSize }) => {
    console.log('render MoviesList');
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Thumb</th>
                    <th scope="col">Title</th>
                    <th scope="col">Year</th>
                    <th scope="col">Number of episode</th>
                    <th scope="col">Full series</th>
                    <th scope="col">Director name</th>
                    <th scope="col">Country</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie, index) => (
                    <tr key={movie.title}>
                        <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
                        <td><img src={movie.thumnail_url} className="rounded mx-auto d-block" style={{ width: 50, height: 75 }} alt="..." /></td>
                        <td><a href={movie.movie_url} target="blank">{movie.title}</a></td>
                        <td className="column-center">{movie.year}</td>
                        <td className="column-center">{movie.number_of_episode}</td>
                        <td className="column-center">{movie.full_series ? 'Full' : ''}</td>
                        <td>{movie.director_name}</td>
                        <td>{movie.country}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default memo(MoviesList);