<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user-store';

const router = useRouter();
const userStore = useUserStore();

const visible = ref(false);
const userInfo = ref({
  id: null,
  password: null
});

const login = async () => {
  await userStore.login(userInfo.value);
  router.push('/');
};
</script>

<template>
  <v-img src="src/assets/imags/login_img2.gif" height="84vh" cover>
    <v-card
      class="login-form mx-auto px-16 py-6"
      style="margin-top: 16rem"
      elevation="8"
      rounded="lg"
    >
      <v-img src="src/assets/imags/logo_teal.png" style="width: 22rem"></v-img>
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        v-model="userInfo.id"
        density="compact"
        placeholder="아이디"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password

        <!-- <a
        class="text-caption text-decoration-none text-blue"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        비밀번호를 잊으셨나요?</a
      > -->
      </div>

      <v-text-field
        v-model="userInfo.password"
        placeholder="비밀번호"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        density="compact"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <!-- <v-card class="mb-12" color="surface-variant" variant="tonal">
      <v-card-text class="text-medium-emphasis text-caption">
        Warning: After 3 consecutive failed login attempts, you account will be temporarily locked
        for three hours.
      </v-card-text>
    </v-card> -->

      <v-btn
        block
        class="mt-4 mb-8"
        color="teal-darken-2"
        size="large"
        variant="tonal"
        @click="login"
      >
        로그인
      </v-btn>
      <v-btn
        block
        class="text-center text-teal-lighten-1 text-decoration-none"
        variant="text"
        @click="$router.push({ name: 'join' })"
      >
        아직 회원이 아니신가요? <v-icon icon="mdi-chevron-right"></v-icon>
      </v-btn>
    </v-card>
  </v-img>
</template>

<style>
.login-form {
  height: 36rem;
  max-width: 32rem;
  font-family: pretendard-light;
}
</style>
