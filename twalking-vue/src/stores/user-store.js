import { defineStore } from 'pinia';
import { ref, inject } from 'vue';

export const useUserStore = defineStore(
  'userStore',
  () => {
    const axios = inject('axios');

    const userNavItems = ref([
      { name: 'LOGIN', show: true, routeName: 'login' },
      { name: 'JOIN💞', show: true, routeName: 'join' },
      { name: 'MYPAGE', show: false, routeName: '' },
      { name: 'LOGOUT', show: false, routeName: 'logout' }
    ]);

    const changeMenuState = () => {
      userNavItems.value.forEach((menu) => {
        menu.show = !menu.show;
      });
    };

    const login = async (userInfo) => {
      await axios.post('/user/login', userInfo).then((response) => {
        const { accessToken } = response.data;
        axios.defaults.headers.common['Authorization'] = accessToken;
        console.log(accessToken);
        changeMenuState();
      });
    };

    const logout = async () => {
      const currentToken = axios.defaults.headers.common['Authorization'];

      if (currentToken) {
        const config = {
          headers: {
            Authorization: currentToken
            // 'Authorization': `Bearer ${yourAccessToken}`
          }
        };

        await axios.delete('/user/logout', config).then(() => {
          // 로그아웃 성공 시 토큰 제거
          axios.defaults.headers.common['Authorization'] = '';
          console.log('로그아웃 성공');
          changeMenuState();
        });
      } else {
        // 토큰이 없는 경우 다른 로그아웃 처리를 수행
        // 예: 로그아웃 성공 메시지 출력 등
        console.log('이미 로그아웃 되었거나 토큰이 없습니다.');
        changeMenuState();
      }
    };

    const modify = async (userInfo) => {
      await axios.put('/user/modify', userInfo).then(() => {
        axios.defaults.headers.common['Authorization'] = '';
        changeMenuState();
      });
    };

    const withdrawal = async (userInfo) => {
      await axios.delete('/user/withdrawal', userInfo).then(() => {
        axios.defaults.headers.common['Authorization'] = '';
        changeMenuState();
      });
    };

    const writeReview = async (param, success, fail) => {
      const currentToken = axios.defaults.headers.common['Authorization'];
      const config = {
        headers: {
          Authorization: currentToken
          // 'Authorization': `Bearer ${yourAccessToken}`
        }
      };

      await axios
        .post(`/review/write`, param, config)
        .then(success)
        .catch(fail);
    };

    const addLike = async (param, success, fail) => {
      const currentToken = axios.defaults.headers.common['Authorization'];
      const config = {
        headers: {
          Authorization: currentToken
        }
      };
      await axios.post(`/bookMark/insert`, param, config).then(success).catch(fail);
    };
    
    const removeLike = async (param, success, fail) => {
      const currentToken = axios.defaults.headers.common['Authorization'];
      const config = {
        headers: {
          Authorization: currentToken
        }
      };
      await axios.delete(`/bookMark/delete`, param, config).then(success).catch(fail);
    };
    
    const listLike = (success, fail) => {
      const currentToken = axios.defaults.headers.common['Authorization'];
      const config = {
        headers: {
          Authorization: currentToken
        }
      };
      axios.get(`/bookMark/list`, config).then(success).catch(fail);
    };
    
    const getDistance = async (param, success, fail) => {
      const currentToken = axios.defaults.headers.common['Authorization'];
      const config = {
        headers: {
          Authorization: currentToken
        }
      };
      await axios.post(`/distance/get-distance`, param, config).then(success).catch(fail);
    };

    return {
      userNavItems,
      login,
      logout,
      modify,
      withdrawal,
<<<<<<< HEAD
      writeReview, 
=======
      writeReview,
>>>>>>> ef0ca9e9088f76734a0f2eac4835a689619f62b0
      addLike,
      removeLike,
      listLike,
      getDistance
    };
  },
  {
    persist: {
      storage: localStorage
    }
  }
);
