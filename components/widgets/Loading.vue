<template>
  <div
    class="spinner fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-90"
  >
    <span></span>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-top: -30px;
  margin-left: -30px;
  border-radius: 50%;
  border: 3px solid lightgray;
  border-top-color: coral;
  animation: spinner 0.7s linear infinite;
}
</style>
