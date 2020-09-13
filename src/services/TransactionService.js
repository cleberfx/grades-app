import http from '../http-common_2.js';

const getAll = () => {
  return http.get('/transaction');
};

const getAllByDate = (yearMonth) => {
  return http.get(`/transaction/yearMonth/${yearMonth}`);
};

const getAllByYear = (year) => {
  return http.get(`/transaction/year/${year}`);
};
const get = (id) => {
  return http.get(`/transaction/${id}`);
};

const create = (data) => {
  return http.post('/transaction', data);
};

const update = (id, data) => {
  return http.put(`/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/transaction/${id}`);
};

const removeAll = () => {
  return http.delete(`/transaction`);
};

const findByDescription = (description) => {
  return http.get(`/transaction?description=${description}`);
};

const findByName = (description) => {
  return http.get(`/transaction?description=${description}`);
};

export default {
  getAll,
  getAllByDate,
  getAllByYear,
  get,
  create,
  update,
  remove,
  removeAll,
  findByDescription,
  findByName,
};
