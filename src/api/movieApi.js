import axiosClient from "./axiosClient";

const movieApi = {
    getMovieByUrl: (data) => {
        const url = "/movies/url";
        return axiosClient.post(url, data);
    },

    exportMovieByUrl: (data) => {
        const url = "/movies/export";
        return axiosClient.post(url, data);
    },

    getAllMovies: (page_index, page_size, director, country) => {
        const url = "/movies/getAll";
        return axiosClient.get(url, {
            params: {
                page_index: page_index,
                page_size: page_size,
                director: director,
                country: country
            }
        });
    }
}

export default movieApi;