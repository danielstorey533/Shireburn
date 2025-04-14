<template>
  <div class="topbar">
    <div class="topbar-left">Shireburn</div>
    <div class="topbar-right">
      <div class="avatar">SB</div>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  height: 60px;
  box-sizing: border-box;
}

.logo {
color: '#2596be'
}

.topbar-left {
  font-weight: bold;
  font-size: 1.25rem;
  /* Took this color from the Shireburn logo */
  color: #2596be;
}

.topbar-right .avatar {
  background-color: #8a8d91;
  color: white;
  font-weight: bold;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
