<template>
  <!-- Main Sidebar -->
  <a-layout-sider
    id="ph"
    collapsible
    class="sider-primary"
    breakpoint="lg"
    collapsed-width="0"
    width="250px"
    :collapsed="sidebarCollapsed"
    @collapse="$emit('toggleSidebar', !sidebarCollapsed)"
    :trigger="null"
    :class="[
      'ant-layout-sider-' + sidebarColor,
      'ant-layout-sider-' + sidebarTheme,
    ]"
    theme="light"
    :style="{ backgroundColor: 'transparent' }"
  >
    <div class="brand">
      <div class="brand-pic">
        <img :src="`https://pxu-server.herokuapp.com/logo/logo.png`" alt="" />
      </div>
      <div class="brand-name">
        <span style="font-size: 20px; margin-left: auto; margin-right: auto">
          {{name}}
        </span>
      </div>
      <!-- <img :src="`images/${logo}`" alt=""> -->
    </div>
    <hr />

    <!-- Sidebar Navigation Menu -->
    <a-menu theme="light" mode="inline" style="text-decoration: none">
      <a-menu-item>
        <router-link to="/dashboard">
          <span class="icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
                fill="#111827"
              />
              <path
                d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
                fill="#111827"
              />
              <path
                d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
                fill="#111827"
              />
            </svg>
          </span>
          <span
            class="label menutext"
            style="text-decoration: none; font-size: 18px"
            >แดชบอร์ด</span
          >
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/quotations">
          <span class="icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
                fill="#111827"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
                fill="#111827"
              />
            </svg>
          </span>
          <span
            class="label menutext"
            style="text-decoration: none; font-size: 18px"
            >ใบเสนอราคา</span
          >
        </router-link>
      </a-menu-item>

      <a-menu-item>
        <router-link to="/customers">
          <span class="icon">
            <b-icon
              icon="people-fill"
              style="text-decoration: none; font-size: 18px"
            ></b-icon>
            <!-- <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z" fill="#111827"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z" fill="#111827"/>
							</svg> -->
          </span>
          <span
            class="label menutext"
            style="text-decoration: none; font-size: 18px"
            >ลูกค้า</span
          >
        </router-link>
      </a-menu-item>

      <!-- 
		==========================================
		========================================= -->
      <a-sub-menu id="phi">
        <span slot="title" class="submenu-title-wrapper">
          <span class="icon">
            <b-icon icon="gear-fill" style="color: blue; font-size: 24px">
            </b-icon>
          </span>
          <span
            class="label menutext"
            style="text-decoration: none; font-size: 18px"
          >
            ตั้งค่าเว็บไซต์
          </span>
        </span>
        <a-menu-item-group>
          <a-menu-item key="setting:1">
            <router-link to="/setting/webSetting">
              <span class="icon">
                <b-icon icon="globe" style="color: blue; font-size: 24px">
                </b-icon>
              </span>
              <span
                class="label menutext"
                style="text-decoration: none; font-size: 16px"
              >
                ข้อมูลเว็บไซต์
              </span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="setting:3">
            <router-link to="/setting/employee">
              <span class="icon">
                <b-icon icon="people" style="color: blue; font-size: 24px">
                </b-icon>
              </span>
              <span
                class="label menutext"
                style="text-decoration: none; font-size: 16px"
              >
                จัดการพนักงาน
              </span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="setting:4">
            <router-link to="/setting/bank">
              <span class="icon">
                <b-icon icon="bank2" style="color: blue; font-size: 24px">
                </b-icon>
              </span>
              <span
                class="label menutext"
                style="text-decoration: none; font-size: 16px"
              >
                จัดการธนาคาร
              </span>
            </router-link>
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>

      <!-- 
		==========================================
		========================================= -->

      <!-- 
		==========================================
		========================================= -->

      <a-menu-item>
        <router-link to="/archive">
          <span class="icon">
            <b-icon
              icon="archive-fill"
              style="color: blue; font-size: 24px"
            ></b-icon>
            <!-- <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z" fill="#111827"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z" fill="#111827"/>
							</svg> -->
          </span>
          <span
            class="label menutext"
            style="text-decoration: none; font-size: 18px"
            >อื่นๆ</span
          >
        </router-link>
      </a-menu-item>
    </a-menu>
    <!-- / Sidebar Navigation Menu -->
  </a-layout-sider>
  <!-- / Main Sidebar -->
</template>

<script>
import axios from "axios";
export default {
  props: {
    // Sidebar collapsed status.
    sidebarCollapsed: {
      type: Boolean,
      default: false,
    },

    // Main sidebar color.
    sidebarColor: {
      type: String,
      default: "primary",
    },

    // Main sidebar theme : light, white, dark.
    sidebarTheme: {
      type: String,
      default: "light",
    },
  },
  created() {
    console.log(this.logo);
    console.log(this.name);
    this.getweb();
    console.log(this.logo);
    console.log(this.name);
  },
  data() {
    return {
      // sidebarCollapsedModel: this.sidebarCollapsed,
      name: "",
      logo: "",
    };
  },
  methods: {
    async getweb() {
      const response = await axios.get(`https://pxu-server.herokuapp.com/website/img`);
      this.name = response.data[0].websiteName;
      this.logo = response.data[0].logo;
      console.log(this.logo);
      console.log(this.name);
    },
  },
};
</script>


<style scoped>
#ph {
  font-family: "Mitr", sans-serif;
}
#ph
  >>> .layout-dashboard
  .ant-layout-sider.sider-primary
  .ant-menu-item
  .router-link-active {
  text-decoration: none !important;
}

#ph >>> a {
  text-decoration: none !important;
  cursor: pointer;
}

.menutext:link {
  text-decoration: none !important;
  cursor: pointer;
}
.submenu-title-wrapper {
  margin: 0;
  margin-left: -9px;
}
#phi >>> .ant-menu-item-group-title {
  margin: 0;
  font-weight: 500;
  margin-left: -10px;
}

#ph[data-v-e9978e80].ant-menu-item-group-list a {
  text-decoration: none !important;
  cursor: pointer;
  padding-left: 20%;
}

#phi >>> .ant-menu-item .ant-menu-item-selected {
  width: 100%;
}
.brand {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.brand-pic{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background-color: white;
  border-radius: 14px;
}
.brand-pic img{
  object-fit: cover;
  width: 100%;
  border-radius: 14px;
}
.brand-name{
  text-align: center;
}

.layout-dashboard .ant-layout-sider.sider-primary .brand img {
    height: 150px; 
}
</style>
