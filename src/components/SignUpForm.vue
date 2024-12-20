<script setup lang="ts">
import { ref, watch } from "vue";
import InputText from "./InputText.vue";

// InputText 입력 내용
const userId = ref("");
const name = ref("");
const organization = ref("");

// 각 항목의 유효성 검사 결과
const isValidUserId = ref(false);
const isValidName = ref(false);
const isValidOrganization = ref(false);

// 에러 메세지
const errorMessage = ref({
  userId: "",
  name: "",
  organization: ""
})

// 긱 힝목의 유효성 검사 함수
const validUserId = (id: string) => {
  if (!id) {
    errorMessage.value.userId = "아이디는 필수 입력입니다."
    isValidUserId.value = false;
    return
  }

  const regexp = /^[a-zA-Z0-9]+$/;
  if (!regexp.test(id)) {
    errorMessage.value.userId = "아이디는 영문과 숫자만 가능합니다."
    isValidUserId.value = false;
    return
  }

  errorMessage.value.userId = "";
  isValidUserId.value = true;
}

const validName = (name: string) => {
  if (!name) {
    errorMessage.value.name = "이름은 필수 입력입니다."
    isValidName.value = false;
    return
  }

  const regexp = /[\\/:*?"<>|]/;
  if (regexp.test(name)) {
    errorMessage.value.name = `이름에 "\\ / : * ? " < > " 은 사용할 수 없습니다.`
    isValidName.value = false;
    return
  }

  errorMessage.value.name = "";
  isValidName.value = true;
}

const validOrganization = (organization: string) => {
  const regexp = /[\\/:*?"<>|]/;
  if (regexp.test(organization)) {
    errorMessage.value.organization = `조직명에 "\\ / : * ? " < > " 은 사용할 수 없습니다.`
    isValidOrganization.value = false;
    return
  }

  errorMessage.value.organization = "";
  isValidOrganization.value = true;
}

// 입력값을 관찰하여 값이 변할 때마다 유효성 검사 실행
watch(userId, (newValue) => {
  validUserId(newValue)
})

watch(name, (newValue) => {
  validName(newValue)
})

watch(organization, (newValue) => {
  validOrganization(newValue)
})

const handleSubmit = () => {
  // Input 입력이 없는 상태에서 Submit 했을 경우 에러 메세지 업데이트를 위한 함수 실행
  validUserId(userId.value)
  validName(name.value)
  validOrganization(organization.value)
  
  if (isValidUserId.value && isValidName.value && isValidOrganization.value) {
    alert(`
      회원가입에 성공했어요!
      
      User ID: ${userId.value}
      Name: ${name.value}
      Organization: ${organization.value}
`   );
  } else {
    alert(`
      입력값이 유효한지 다시 확인해 주세요!

      User ID: ${errorMessage.value.userId}
      Name: ${errorMessage.value.name}
      Organization: ${errorMessage.value.organization}
    `)
  }
};
</script>

<template>
  <form class="flex flex-col gap-4 py-4" @submit.prevent="handleSubmit">
    <div class="flex flex-col">
      <InputText label="User ID" v-model="userId" />
      <div v-show="!isValidUserId" class="text-xs text-red-400">{{ errorMessage.userId }}</div>
    </div>
    <div class="flex flex-col">
      <InputText label="Name" v-model="name" />
      <div v-show="!isValidName" class="text-xs text-red-400">{{ errorMessage.name }}</div>
    </div>
    <div class="flex flex-col">
      <InputText label="Organization" v-model="organization" />
      <div v-show="!isValidOrganization" class="text-xs text-red-400">{{ errorMessage.organization }}</div>
    </div>
    <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
  </form>
</template>
