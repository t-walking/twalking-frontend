<script setup>
import { ref } from 'vue';
import { userRegister } from '@/api/user';

const param = ref({
  id: null,
  email: null,
  password: null,
  name: null,
  nickName: null,
  birth: null,
  phoneNumber: null
});

const emailName = ref('');
const domain = ref('');
const show = ref(false);
const domainList = ['gmail.com', 'hanmail.net', 'naver.com'];

const rules = {
  required: (value) => !!value || '필수 항목이에요'
};

const register = async () => {
  param.value.email = `${emailName.value}@${domain.value}`;

  await userRegister(
    param.value,
    (response) => {
      alert(response.data.message);
    },
    (err) => {
      console.log(err);
    }
  );
};
</script>

<template>
  <div class="container1 d-flex justify-center bg-teal-lighten-5">
    <v-card id="register" class="pa-12" elevation="8" rounded="lg">
      <v-card-title>
        <!-- <span class="text-h5 ml-4">회원가입</span> -->
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="param.id"
              label="아이디*"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              density="compact"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="emailName"
              label="이메일*"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              density="compact"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="domain"
              label="선택*"
              :items="domainList"
              prepend-inner-icon="mdi-at"
              variant="outlined"
              density="compact"
              :rules="[rules.required]"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="param.password"
              label="비밀번호*"
              hint="비밀번호는 영문, 숫자, 특수문자 혼합 어쩌구"
              variant="outlined"
              density="compact"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              @click:append-inner="show = !show"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="비밀번호 확인*"
              prepend-inner-icon="mdi-lock-check-outline"
              variant="outlined"
              density="compact"
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              @click:append-inner="show = !show"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="param.name"
              label="이름*"
              prepend-inner-icon="mdi-account-edit-outline"
              variant="outlined"
              density="compact"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="param.nickName"
              label="닉네임"
              prepend-inner-icon="mdi-comment-outline"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="param.birth"
              label="생년월일"
              placeholder="19980404"
              hint="생년월일 8자리를 입력해 주세요"
              prepend-inner-icon="mdi-cake"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="param.phoneNumber"
              label="핸드폰"
              prepend-inner-icon="mdi-cellphone"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <small class="ml-4">*표시는 필수로 입력해 주세요</small>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          class="mt-4"
          size="large"
          color="teal-darken-2"
          variant="tonal"
          @click="register"
        >
          가입하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.container1 {
  height: 84vh;
}

#register {
  margin-top: 4rem;
  max-width: 40rem;
  max-height: 52rem;
}
</style>
