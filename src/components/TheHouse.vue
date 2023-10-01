<script setup>
import houseConfig from "../../houseConfig";
import HouseFloor from "./HouseFloor.vue";
</script>

<template>
  <div class="wrapper">
    <HouseFloor
      class="elevators"
      :floorNumber="floor"
      v-bind:key="floor"
      v-for="floor in houseConfig.floorsNumber"
    />
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column-reverse;
}
</style>
