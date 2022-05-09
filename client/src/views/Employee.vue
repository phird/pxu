<template>
  <!-- Projects Table Column -->
  <a-card
    :bordered="false"
    class="header-solid h-full ph"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0">พนักงาน</h5>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <div class="table-upload-btn">
            <router-link to="/setting/createemployee">
              <a-button type="primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z"
                    fill="#111827"
                  />
                </svg>
                เพิ่มพนักงาน
              </a-button>
            </router-link>
          </div>
        </a-col>
      </a-row>
    </template>
    <a-table
      class="quotation-table"
      :columns="columns"
      :data-source="employee"
      :pagination="true"
    >
      <template slot="idIdx" slot-scope="text">
        <a>{{ text }}</a>
      </template>

      <a-space
        slot="emName"
        slot-scope="emName"
        :size="-12"
        class="avatar-chips"
      >
        {{ emName }}
      </a-space>

      <template slot="emEmail" slot-scope="emEmail">
        {{ emEmail }}
      </template>

      <template slot="emTel" slot-scope="emTel">
        {{ emTel }}
      </template>

      <template slot="actionSection">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </a>
          <a-menu slot="overlay">
            <router-link :to="`#`">
              <a-menu-item>
                <a href="javascript:;" style="text-decoration: none">Edit</a>
              </a-menu-item>
            </router-link>
            <a-menu-item>
              <a href="javascript:;" style="text-decoration: none" 
                >Delete</a
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </a-table>
  </a-card>
  <!-- / Projects Table Column -->
</template>

<script>
import axios from "axios";
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(".header-search");
  filter = input.value.toUpperCase();
  table = document.getElementById(".quotation-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

export default {
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          title: "#",
          dataIndex: "idIdx",
          scopedSlots: { customRender: "idIdx" },
        },
        {
          title: "Name",
          dataIndex: "employeeName",
          scopedSlots: { customRender: "emName" },
        },
        {
          title: "E-mail",
          dataIndex: "employeeEmail",
          scopedSlots: { customRender: "emEmail" },
        },
        {
          title: "Tel.",
          dataIndex: "employeeNumber",
          scopedSlots: { customRender: "emTel" },
        },
        {
          title: "Role",
          dataIndex: "role",
          scopedSlots: { customRender: "val" },
        },
        {
          title: " ",
          dataIndex: "act",
          scopedSlots: { customRender: "act" },
        },
      ],
    },
  },
  data() {
    return {
      // Active button for the "Projects" table's card header radio button group.
      projectHeaderBtns: "all",
      employee: [],
    };
  },
  created() {
    this.getemployee();
  },
  methods: {
    async getemployee() {
      console.log("get-em");
      try {
        const response = await axios.get("http://localhost:5000/employee");
        this.employee = response.data;
        console.log(this.employee);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>


<style scoped>
.layout-dashboard .ant-card {
  border-radius: 12px;
  box-shadow: none !important;
}
</style>