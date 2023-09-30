<script setup>
defineProps({
    isElevator: Boolean,
})
</script>

<template>
  <div class="stop" :class="{isElevator}">
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
</style>
