<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user-store';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const { userNavItems } = storeToRefs(userStore);

const navItems = [
  {
    name: 'HOME',
    routeName: 'home'
  },
  {
    name: 'SEARCH',
    routeName: 'search'
  },
  {
    name: 'TWALKING!',
    routeName: 'result'
  }
];

const myPageItems = [
  { name: '나의 리뷰', routeName: 'review' },
  { name: '정보 수정', routeName: 'modify' }
];

const move = async (page) => {
  if (page === 'logout') {
    await userStore.logout();
    router.push('/');
  } else {
    router.push({ name: page, params: '' });
  }
};
</script>

<template>
  <v-app-bar class="navBar" flat color="white">
    <v-container fluid class="mx-auto px-16 d-flex align-center justify-center">
      <!-- <v-row class="align-center justify-center"> -->
      <img
        src="src/assets/imags/logo_black.png"
        style="width: 200px; margin-top: 6px"
      />
      <!-- <v-img width="10" :src="logoWhite"></v-img> -->
      <v-btn
        v-for="item in navItems"
        :key="item.name"
        :text="item.name"
        variant="text"
        @click="move(item.routeName)"
      ></v-btn>
      <v-spacer></v-spacer>
      <!-- <v-responsive max-width="160"> </v-responsive> -->
      <template v-for="item in userNavItems" :key="item.name">
        <template v-if="item.show">
          <template v-if="item.name == 'MYPAGE'">
            <v-btn variant="text"
              >MYPAGE
              <v-menu activator="parent">
                <v-list>
                  <v-list-item
                    v-for="(myPageItem, index) in myPageItems"
                    :key="index"
                    :value="index"
                    @click="move(myPageItem.routeName)"
                  >
                    <v-list-item-title>{{ myPageItem.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              :text="item.name"
              variant="text"
              @click="move(item.routeName)"
            ></v-btn>
          </template>
        </template>
      </template>
    </v-container>
  </v-app-bar>
</template>

<style>
.navBar {
  font-family: 'pretendard-light';
}
</style>
