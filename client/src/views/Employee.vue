<template>
  <!-- Projects Table Column -->
  <div class="font-inhere">
    <a-card
      :bordered="false"
      class="header-solid h-full ph"
      :bodyStyle="{ padding: 0 }"
    >
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12">
            <h5
              class="font-semibold m-0"
              style="font-family: 'Mitr', sans-serif"
            >
              พนักงาน
            </h5>
          </a-col>
          <a-col
            :span="24"
            :md="12"
            style="
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
          >
            <div class="table-upload-btn">
              <a-button type="primary" @click="showModal">
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
        <template slot="index" slot-scope="text">
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
              <a-menu-item>
                <router-link
                  :to="`/Customers/EditEmployee/${employeeID}`"
                  style="text-decoration: none">
                  <a style="text-decoration: none"> แก้ไข </a>
                </router-link>
              </a-menu-item>

              <a-menu-item>
                <a style="text-decoration: none"> ลบ </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table>
    </a-card>

    <!-- Modal Start Here -->
    <a-modal
      class="whole-modal-body"
      v-model="visible"
      title="เพิ่มพนักงาน"
      @ok="handleOk"
    >
      <div>
        <form @submit.prevent="submitForm()" class="form-for-employee">
          <div class="main-form">
            <div class="form-component max-len">
              <label for="employeeName"> ชื่อพนักงาน </label>
              <input
                id="employeeName"
                type="text"
                v-model="employeeName"
                placeholder="ชื่อ-สกุล พนักงาน"
              />
              <div class="error" v-if="$v.employeeName.$error">
                <template v-if="!$v.employeeName.$invalid"> </template>
                <template v-else> ต้องระบุชื่อ </template>
              </div>
            </div>

            <div class="form-component">
              <label for="employeeNumber"> เบอร์ผู้ติดต่อ</label>
              <input
                id="employeeNumber"
                type="text"
                v-model="employeeNumber"
                placeholder="เบอร์โทรของผู้ติดต่อ"
              />
              <div class="error" v-if="$v.employeeNumber.$error">
                <template v-if="!$v.employeeNumber.$invalid"> </template>
                <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
              </div>
            </div>

            <div class="form-component">
              <label for="employeeEmail"> อีเมลพนักงาน</label>
              <input
                id="employeeEmail"
                type="text"
                v-model="employeeEmail"
                placeholder="อีเมลของพนักงาน"
              />
              <div class="error" v-if="$v.employeeEmail.$error">
                <template v-if="!$v.employeeEmail.$invalid"> </template>
                <template v-else> email error </template>
              </div>
            </div>

            <div class="form-component">
              <label for="role"> หน้าที่ </label>
              <select v-model="role">
                <option value="ผู้ดูแล">ผู้ดูแล</option>
                <option value="พนักงานทั่วไป">พนักงานทั่วไป</option>
              </select>
            </div>
          </div>

          <div class="set-Default">
            <a-checkbox @change="changestatus()"> Set Default </a-checkbox>
          </div>

          <div class="submitbutt">
            <button type="submit">บันทึกข้อมูล</button>
          </div>
        </form>
      </div>
    </a-modal>

    <!-- =================================================================
     /Modal edit Start Here 
================================================================= -->
  </div>
  <!-- / Projects Table Column -->
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
} from "vuelidate/lib/validators";
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
          dataIndex: "index",
          scopedSlots: { customRender: "index" },
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
          title: "Action",
          scopedSlots: { customRender: "actionSection" },
        },
      ],
    },
  },
  data() {
    return {
      // Active button for the "Projects" table's card header radio button group.
      projectHeaderBtns: "all",
      employee: [],
      visible: false,
      status: "-",
      role: "ผู้ดูแล",
      employeeName: "",
      employeeNumber: "",
      employeeEmail: null,
    };
  },
  created() {
    this.getemployee();
  },
  validations: {
    employeeNumber: {
      required,
      validFormat: (val) => /^\d{10}$/.test(val),
    },
    employeeEmail: {
      required,
      email,
    },
    employeeName: {
      required,
    },
    // passportDate: {
    //   required,
    //   validDate: (val) => moment(val, "DD.MM.YYYY", true).isValid(),
    // },
  },
  methods: {
    changestatus() {
      this.status = "default";
    },
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
        await axios
          .post("http://localhost:5000/employee", {
            role: this.role,
            employeeName: this.employeeName,
            employeeNumber: this.employeeNumber,
            employeeEmail: this.employeeEmail,
            status: this.status,
          })
          .then(function () {
            alert("ok");
          });
      }
    },
    async getemployee() {
      console.log("get-em");
      try {
        const response = await axios.get("http://localhost:5000/employee");
        this.employee = response.data;
        for (let i = 0; i < response.data.length; i++) {
          this.employee[i].index = i + 1;
        }
      } catch (err) {
        console.log(err);
      }
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  },
};
</script>


<style scoped>
.layout-dashboard .ant-card {
  font-family: "Mitr", sans-serif;
  border-radius: 12px;
  box-shadow: none !important;
}

.main-form {
  font-family: "Mitr", sans-serif;
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
}

.form-component {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1em;
}

.form-component input {
  height: 45px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.123);
  text-indent: 3%;
}

.form-component select {
  height: 45px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.123);
  text-indent: 3%;
}

.max-len {
  display: flex;
  flex-direction: column;
  width: 100% !important;
  padding: 1em;
}

.max-len input {
  text-indent: 1.5% !important;
}

/* modal start here */

.whole-modal-body {
  font-family: "Mitr", sans-serif;
  width: 100vw;
}
.whole-modal-body >>> .ant-modal {
  width: 70% !important;
}
.whole-modal-body >>> .ant-modal-footer {
  display: none;
}
.submitbutt {
  display: flex;
  justify-content: flex-end;
}
.submitbutt button {
  color: white;
  background-color: #7367f0;
  border-radius: 14px;
  border: 0;
  margin: auto;
  padding: 1em;
}
.set-Default {
  padding: 1em;
}
.error {
  color: red;
}
</style>