<script setup>
const emit = defineEmits(['onKeySelect']);
const onSelect = (item) => {
  item.isSelected = !item.isSelected;
  emit('onKeySelect', item);
};

const typeItems = [
  {
    name: '관광지',
    code: 12,
    isSelected: false
  },
  {
    name: '문화시설',
    code: 14,
    isSelected: false
  },
  {
    name: '축제/공연/행사',
    code: 15,
    isSelected: false
  },
  {
    name: '레포츠',
    code: 28,
    isSelected: false
  },
  {
    name: '숙박',
    code: 32,
    isSelected: false
  },
  {
    name: '쇼핑',
    code: 38,
    isSelected: false
  },
  {
    name: '음식점',
    code: 39,
    isSelected: false
  }
];
</script>

<template>
  <v-card-text class="py-0">
    <p class="mb-2">카테고리</p>

    <v-chip-group column multiple filter>
      <v-chip
        v-for="item in typeItems"
        :key="item.name"
        @click="onSelect(item)"
      >
        {{ item.name }}
      </v-chip>
    </v-chip-group>
  </v-card-text>
</template>

<style scoped></style>
