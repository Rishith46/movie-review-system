import API from './api';

export const getMovies = async () => {
  const { data } = await API.get('/movies');
  return data;
};

export const getAllMovies = async () => {
  const { data } = await API.get('/movies');
  return data;
};

export const getMovieById = async (id) => {
  const { data } = await API.get(`/movies/${id}`);
  return data;
};

export const createMovie = async (movieData) => {
  const { data } = await API.post('/movies', movieData);
  return data;
};

export const updateMovie = async (id, movieData) => {
  const { data } = await API.put(`/movies/${id}`, movieData);
  return data;
};

export const deleteMovie = async (id) => {
  const { data } = await API.delete(`/movies/${id}`);
  return data;
};