import { serverAxios } from '@/util/http-commons';

const place = serverAxios();

export const listSido = (success, fail) => {
  place.get(`/area/sido`).then(success).catch(fail);
};

export const listGugun = (param, success, fail) => {
  place.get(`/area/gugun`, { params: param }).then(success).catch(fail);
};

export const listPlaces = async (param, success, fail) => {
  await place
    .post(`/attraction/search-by-city-and-type`, param)
    .then(success)
    .catch(fail);
};
