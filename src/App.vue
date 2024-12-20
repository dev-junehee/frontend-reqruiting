<script setup lang="ts">
import BaseCard from "./components/BaseCard.vue";
import SignUpForm from "./components/SignUpForm.vue";
import { SIGN_UP } from "./constants";
</script>

<template>
  <div class="flex flex-col justify-center h-screen w-screen items-center">
    <BaseCard>
      <template #title>{{ SIGN_UP.title }}</template>
      <template #content>
        <SignUpForm id="signUpForm" />
      </template>
    </BaseCard>
  </div>
</template>
