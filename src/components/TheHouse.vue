<script setup>
import HouseFloor from './HouseFloor.vue';

let floorsNumber = 5;
</script>

<template>
<HouseFloor class="houses" :floorNumber="floor" v-bind:key="floor" v-for="floor in floorsNumber"/>
</template>
<style scoped>
.houses {
  display: flex;
}
</style>