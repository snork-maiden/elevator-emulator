<script setup>
import { useElevatorsStore } from '../stores/elevators'
import HouseFloor from './HouseFloor.vue'
const elevatorsStore = useElevatorsStore()
</script>

<template>
  <div class="wrapper">

    <HouseFloor
      class="elevators"
      :floorNumber="floor"
      v-bind:key="floor"
      v-for="floor in elevatorsStore.elevators.floorsNumber"
    />
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column-reverse;
}
</style>
