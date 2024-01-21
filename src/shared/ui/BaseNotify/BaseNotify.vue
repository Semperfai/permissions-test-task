<script setup lang="ts">
import { useRootStore } from "@/stores/root/root.store";
import { computed } from "vue";
const messageText = "Changes saved successfully!";

const rootStore = useRootStore();

const isNotify = computed(() => rootStore.showMessages);
</script>
<template>
  <div v-if="isNotify" class="message">{{ messageText }}</div>
</template>

<style scoped>
.message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: opacity 0.3s;
}
</style>
