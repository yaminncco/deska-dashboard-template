<template>
  <div class="w-full h-[4px] overflow-hidden rounded-md">
    <div class="w-full h-full rounded-md indicator" />
  </div>
</template>

<style scoped>
.indicator {
  animation: indeterminate-progress-bar 1400ms infinite linear;
  background-position-x: 0%;
  background-size: 200% 100%;
  background-image: linear-gradient(90deg, var(--primary) 12.5%, transparent 12.5%)
}

@keyframes indeterminate-progress-bar {
  0% {
    background-position-x: 25%;
  }
  80%, 100% {
    background-position-x: -105%;
  }
}
</style>
