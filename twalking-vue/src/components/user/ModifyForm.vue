<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user-store';

const axios = inject('axios');
const router = useRouter();
const userStore = useUserStore();

const currentPasswordVisible = ref(false);
//const newPasswordVisible = ref(false)

const userInfo = ref({
  id: '',
  name: '',
  password: '',
  newPassword: '',
  nickName: '',
  birth: '',
  phoneNumber: '',
  email: ''
});

const currentToken = axios.defaults.headers.common['Authorization'];

const config = {
  headers: {
    Authorization: currentToken
    // 'Authorization': `Bearer ${yourAccessToken}`
  }
};

// Setup Script가 실행되면서 바로 사용자 정보를 요청.
axios
  .get('/user/myPage', config)
  .then((response) => {
    userInfo.value = response.data.userInfo;
    console.log(userInfo.value);
  })
  .catch(() => {
    router.push('/');
  });

// 회원 수정
const modify = async () => {
  await userStore.modify(userInfo.value).finally(() => {
    router.push('/');
  });
};

// 회원 탈퇴
const withdrawal = async () => {
  await userStore.withdrawal(userInfo.value);
  router.push('/');
};
</script>

<template>
  <!--
            https://vuetifyjs.com/en/components/text-fields/#login-form
        -->
  <v-card class="myPage-form mx-auto pa-8" elevation="8" rounded="lg">
    <v-text-field
      density="compact"
      prepend-inner-icon="mdi-account-outline"
      variant="outlined"
      readonly
      v-model="userInfo.id"
    ></v-text-field>

    <v-text-field
      v-model="userInfo.name"
      label="이름"
      prepend-inner-icon="mdi-account-tag"
      variant="outlined"
      density="compact"
      readonly
    ></v-text-field>

    <v-text-field
      :append-inner-icon="currentPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="currentPasswordVisible ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      label="현재 비밀번호"
      @click:append-inner="currentPasswordVisible = !currentPasswordVisible"
      v-model="userInfo.password"
    ></v-text-field>

    <v-text-field
      :append-inner-icon="newPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="newPasswordVisible ? 'text' : 'password'"
      density="compact"
      label="새로운 비밀번호"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="newPasswordVisible = !newPasswordVisible"
      v-model="userInfo.newPassword"
    ></v-text-field>

    <v-text-field
      v-model="userInfo.nickName"
      label="닉네임"
      prepend-inner-icon="mdi-comment-outline"
      variant="outlined"
      density="compact"
    ></v-text-field>
    <v-text-field
      v-model="userInfo.birth"
      label="생년월일"
      hint="생년월일 8자리를 입력해 주세요"
      prepend-inner-icon="mdi-cake"
      variant="outlined"
      density="compact"
    ></v-text-field>

    <v-text-field
      v-model="userInfo.phoneNumber"
      label="핸드폰"
      prepend-inner-icon="mdi-cellphone"
      variant="outlined"
      density="compact"
    ></v-text-field>

    <v-btn
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      @click="modify"
    >
      수정하기
    </v-btn>

    <v-btn
      block
      class="mb-8"
      color="red"
      size="large"
      variant="tonal"
      @click="$router.push({ name: 'main' })"
    >
      취소
    </v-btn>

    <v-btn
      block
      class="mb-8"
      color="red-darken-4"
      size="large"
      @click="withdrawal"
    >
      회원 탈퇴
    </v-btn>
  </v-card>
</template>

<style scoped></style>
