import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useElevatorsStore = defineStore('elevator', () => {
  const elevators = ref({
    floorsNumber: 5,
    elevatorsCount: 3,
    goalsQueue: [],
    elevatorsData: [
      {
        id: 0,
        currentFloor: 1,
        goal: null,
      },
    ]
  })
  function bestOptionElevator() {
    const goal = elevators.value.goalsQueue[0];
    if (!goal) return null;

    const freeElevators = elevators.value.elevatorsData.filter(elevator => elevator.goal === null);
    if (freeElevators.length === 0) return null;
    if (freeElevators.length === 1) return freeElevators[0];

    const floorDifference = ((a, b) => Math.abs(a - b));
    freeElevators.sort((a, b) => floorDifference(a.currentFloor, goal) - floorDifference(b.currentFloor, goal));
    return freeElevators[0];
  }

  function arrangeRide() {
    if (bestOptionElevator() === null) return;
    const elevator = elevators.value.elevatorsData[bestOptionElevator().id];
    const goal = elevators.value.goalsQueue.shift();
    elevator.goal = goal;
  }

  function requestElevator(floor) {
    console.log(elevators.value)
    if (elevators.value.goalsQueue.includes(floor)) return;

    const ifElevatorOnFloor = !!elevators.value.elevatorsData.find(elevator => elevator.currentFloor === floor)
    if (ifElevatorOnFloor) return;

    elevators.value.goalsQueue.push(floor);
    arrangeRide()
  }

  function endRide(elevatorId) {
    elevators.value.elevatorsData[elevatorId].goal = null;
    arrangeRide()
  }

  function changeFloor(elevatorId) {
    const elevator = elevators.value.elevatorsData[elevatorId];
    if (elevator.goal === null) return;
    console.log(elevatorId, elevator)
    const ifUp = (elevator.goal - elevator.currentFloor) > 0;
    (ifUp) ? elevator.currentFloor++ : elevator.currentFloor--;
    if (elevator.currentFloor === elevator.goal) {
      setTimeout(() => {
        endRide(elevatorId)
      }, 3000);
    }
  }

  function doorsOpen(elevatorId) {
    const elevator = elevators.value.elevatorsData[elevatorId];
    return elevator.currentFloor === elevator.goal;
  }


  return { elevators, requestElevator, endRide, changeFloor, doorsOpen }
})
