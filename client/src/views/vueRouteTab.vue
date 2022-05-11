<template>
  <div id="app">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link to="/routertab/web-setting" class="nav-link" href="#">Websetting</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/routertab/employee" class="nav-link" href="#">Employee</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/routertab/bank" class="nav-link" href="#">Bank</router-link>
      </li>
    </ul>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>