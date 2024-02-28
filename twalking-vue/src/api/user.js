import { serverAxios } from '@/util/http-commons';

const user = serverAxios();

export const userRegister = async (param, success, fail) => {
  await user.post(`/user/signUp`, param).then(success).catch(fail);
};
