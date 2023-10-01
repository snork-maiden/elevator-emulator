<script setup>
import houseConfig from '../../houseConfig';
import { useElevatorsStore } from '../stores/elevators'
import ElevatorStop from './ElevatorStop.vue'
import { computed, watch } from 'vue'

const elevatorsStore = useElevatorsStore()

const props = defineProps({
  floorNumber: Number
})

const floorElevatorsState = computed(() => {
  const elevators = elevatorsStore.elevators.elevatorsData
  const elevatorsData = elevators.map((elevator) => {
    const isElevator = calculateIsElevator(elevator.id)
    let isMoving = isElevator && elevator.goal && elevator.currentFloor !== elevator.goal;

    return { id: elevator.id, isElevator, isMoving }
  })
  return elevatorsData
})

const movingElevators = computed(() =>
  floorElevatorsState.value.filter((elevator) => elevator.isMoving)
)

function calculateIsElevator(elevatorId) {
  const elevator = elevatorsStore.elevators.elevatorsData[elevatorId]
  return elevator.currentFloor === props.floorNumber
}

watch(movingElevators, (elevators) => {
  if (elevators.length === 0) return

  elevators.forEach((elevator) => {
    setTimeout(() => elevatorsStore.changeFloor(elevator.id), 1000)
  })
})
</script>

<template>
  <div class="floor">
    <ElevatorStop
      v-bind:key="elevator"
      v-for="elevator in houseConfig.elevatorsCount"
      :elevator-id="elevator - 1"
      :is-elevator="floorElevatorsState[elevator - 1].isElevator"
      :is-moving="floorElevatorsState[elevator - 1].isMoving"
    />
    <label class="button">
      {{ floorNumber }}
      <input
        type="radio"
        :value="floorNumber"
        @click="elevatorsStore.requestElevator(floorNumber)"
        checked
      />
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
