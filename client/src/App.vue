<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->
<template>
  <div id="app">
    <component :is="layout">
      <router-view :tabName="tabName" />
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    // Sets components name based on current route's specified layout, defaults to
    // <layout-default></layout-default> component.
    layout() {
      return "layout-" + (this.$route.meta.layout || "default").toLowerCase();
    },
  },
  data() {
    return {
      tabName: "",
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap");
#app {
  font-family: "Mitr", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>


