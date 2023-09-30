<script setup>
import ElevatorStop from './ElevatorStop.vue';

defineProps({
    floorNumber: Number,
})

function requestElevator(floor) {
  // if(floor === currentFloor) return;
  // if(goals.includes(floor)) return;
  // goals.push(floor);
}
</script>

<template>
  <div class="floor">
    <ElevatorStop></ElevatorStop>
    <label class="button">
      {{ floorNumber }}
      <input type="radio" :value="floorNumber" @click="requestElevator(floorNumber)" checked/>
    </label>
  </div>
</template>

<style scoped>
.floor {
  display: flex;
  align-items: center;
}

.button {
  margin-left: 5em;
}


</style>
