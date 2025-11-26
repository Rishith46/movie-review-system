import API from './api';

export const createReview = async (reviewData) => {
  const { data } = await API.post('/reviews', reviewData);
  return data;
};

export const updateReview = async (id, reviewData) => {
  const { data } = await API.put(`/reviews/${id}`, reviewData);
  return data;
};

export const deleteReview = async (id) => {
  const { data } = await API.delete(`/reviews/${id}`);
  return data;
};