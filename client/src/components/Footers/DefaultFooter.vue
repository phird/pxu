<template>
  <!-- Layout Footer -->
  <a-layout-footer>
    <!-- Footer Navigation Menu -->
    <a-menu mode="horizontal">
      <a-menu-item>About Us</a-menu-item>
    </a-menu>
    <!-- / Footer Navigation Menu -->
    <!-- / Footer Social Menu -->

    <!-- Copyright Notice -->
    <!-- 		<p class="copyright">
			Copyright © 2021 Muse
			by <a href="https://creative-tim.com">Creative Tim</a>.
		</p> -->
    <!-- / Copyright Notice -->
  </a-layout-footer>
  <!-- / Layout Footer -->
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.nav-link svg {
  margin-right: 5px;
  vertical-align: middle;
}
.nav-link span {
  vertical-align: middle;
}
.ant-menu-submenu-popup {
  width: 100%;
}
</style>