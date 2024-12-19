<script setup lang="ts">
import { ref, watch } from 'vue';
import XButton from '@/components/XButton.vue';

type InputTextProps = {
  label: string;
};

const model = defineModel<string>();
defineProps<InputTextProps>();

const isShow = ref(false);
const isFocus = ref(false);

const handleFocus = () => {
  isFocus.value = true;
  // InputText에 포커스가 잡혔을 때, 기존 값이 있으면 X버튼 표시
  if (model.value !== '') isShow.value = true;
}

const handleBlur = () => {
  isFocus.value = false;
  isShow.value = false;
}

watch(model, () => {
  // InputText에 포커스가 있고, 내용을 입력 중일 때 X버튼 표시
  if (isFocus.value && model.value !== '') isShow.value = true;
  else isShow.value = false;
});
</script>

<template>
  <label class="relative flex flex-col gap-4">
    {{ label }}
    <input
      class="border-gray-400 border rounded-md h-10 px-4 hover:border-blue-400 invalid:border-red-500 focus:border-green-400 focus:outline-none"
      type="text"
      autocomplete="off"
      v-model="model"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <XButton v-if="isShow"/>
  </label>
</template>
