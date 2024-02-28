import { serverAxios } from '@/util/http-commons';

const result = serverAxios();

export const addLike = async (param, success, fail) => {
  await result.post(`/bookMark/insert`, param).then(success).catch(fail);
};

export const removeLike = async (param, success, fail) => {
  await result.delete(`/bookMark/delete`, param).then(success).catch(fail);
};

export const listLike = (success, fail) => {
  result.get(`/bookMark/list`).then(success).catch(fail);
};

export const getDistance = async (param, success, fail) => {
  await result.post(`/distance/get-distance`, param).then(success).catch(fail);
};
