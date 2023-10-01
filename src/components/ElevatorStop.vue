<script setup>
import { useElevatorsStore } from '../stores/elevators'

const props = defineProps({
  isElevator: Boolean,
  isMoving: Boolean,
  elevatorId: Number
})

const elevatorsStore = useElevatorsStore()

function isDoorsOpen() {
  if (props.isMoving || !props.isElevator) return false
  return elevatorsStore.isJustArrived(props.elevatorId)
}
</script>

<template>
  <div class="stop" :class="{ isElevator, openDoors: isDoorsOpen() }">
    <span v-if="isElevator" class="visually-hidden">Elevator is here</span>
  </div>
</template>

<style scoped>
.stop {
  width: 128px;
  height: 128px;
  outline: 1px solid salmon;
}

.isElevator {
  background-color: salmon;
}

.openDoors {
  animation: blink-animation 0.7s steps(5, start) infinite;
}

@keyframes blink-animation {
  to {
    background-color: transparent;
  }
}
</style>
