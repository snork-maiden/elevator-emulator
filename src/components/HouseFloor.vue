<script setup>
import houseConfig from '../../houseConfig';
import { useElevatorsStore } from '../stores/elevators';
import ElevatorStop from './ElevatorStop.vue';
import { computed } from 'vue';

const elevatorsStore = useElevatorsStore();

const props = defineProps({
  floorNumber: Number
});

const floorElevatorsState = computed(() => {
  const elevators = elevatorsStore.elevators.elevatorsData;
  const elevatorsData = elevators.map((elevator) => {
    const isElevator = calculateIsElevator(elevator.id);
    let isMoving = isElevator && elevator.goal && elevator.currentFloor !== elevator.goal;

    return { id: elevator.id, isElevator, isMoving };
  });
  return elevatorsData;
});

function calculateIsElevator(elevatorId) {
  const elevator = elevatorsStore.elevators.elevatorsData[elevatorId];
  return elevator.currentFloor === props.floorNumber;
}
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

    <button class="button" type="button" @click="elevatorsStore.requestElevator(floorNumber)">
      {{ floorNumber }}
    </button>
  </div>
</template>

<style scoped>
.floor {
  display: flex;
  align-items: center;
  gap: min(4vw, 2em);
}

.button {
  margin-left: min(8vw, 5em);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  line-height: 1;
  aspect-ratio: 1/1;
  font-weight: 500;
  width: clamp(25px, 4vw, 35px);
}

.wrong-call {
  animation: error-animation 5s reverse;
}

@keyframes error-animation {
  to {
    background-color: salmon;
  }
}
</style>
