<script setup>
import { ref } from 'vue';

defineProps({ selectOption: Array });

const emit = defineEmits(['onKeySelect']);
const key = ref('');
const onSelect = () => {
  emit('onKeySelect', key.value);
};
</script>

<template>
  <v-select
    v-model="key"
    :items="selectOption"
    :disabled-items="[null]"
    item-title="text"
    item-text="text"
    item-value="value"
    variant="outlined"
    density="compact"
    bg-color="white"
    @update:modelValue="onSelect"
  >
  </v-select>
</template>

<style scoped></style>
