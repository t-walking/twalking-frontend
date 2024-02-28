import { serverAxios } from '@/util/http-commons';

const review = serverAxios();

export const listReview = (param, success, fail) => {
  review.get(`/review/list`, { params: param }).then(success).catch(fail);
};
