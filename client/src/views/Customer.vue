<template>
  <!-- Projects Table Column -->
  <div class="wholenewsite">
    <div class="alert">
      <div v-if="modalconfirm" class="modal-confirmation">
        <span style="margin-bottom: 2em">
          <b-icon icon="trash" font-scale="5" ></b-icon>
        </span>
        <p id="confirm-text">คุณแน่ใจว่าจะลบลูกค้าคนนี้นี้ใช่หรือไม่</p>
        <div class="button-section">
          <div>
            <button @click="deletecus(cID)" class="confirm-butt-alert">
              ยืนยัน
            </button>
          </div>
          <div>
            <button @click="modalconfirm = false" class="cancle-butt-alert">
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagebody" :class="{ isNotModalconfirm: modalconfirm }">
      <a-alert v-if="nerror" message="ลบลูกค้าสำเร็จ" type="error" show-icon />
      <div class="pagebody-upper">
        <!-- Counter Widgets -->
        <!-- Charts -->
        <a-row :gutter="24" type="flex" align="stretch">
          <a-col :span="24" :lg="8" class="mb-24">
            <!-- Active Users Card -->
            <!-- <CardBarChart></CardBarChart> -->
            <RecentlyAdded></RecentlyAdded>
            <!-- Active Users Card -->
          </a-col>
          <a-col :span="24" :lg="8" class="mb-24">
            <!-- Active Users Card -->
            <!-- <CardBarChart></CardBarChart> -->
            <NewCustomer></NewCustomer>
            <!-- Active Users Card -->
          </a-col>
          <a-col :span="24" :lg="8" class="mb-24">
            <!-- Sales Overview Card -->
            <TypeOfCus></TypeOfCus>
            <!-- / Sales Overview Card -->
          </a-col>
        </a-row>
      </div>
      <div class="pagebody-lower">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ padding: 0 }"
        >
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="24" :md="12">
                <h5 class="font-semibold m-0">ลูกค้า</h5>
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
                <div class="table-upload-btn" style="color: white">
                  <a-tooltip>
                    <template slot="title"> เพิ่มลูกค้า </template>
                    <a-button
                      type="primary"
                      @click="showModal"
                      style="font-size: 14px; font-weight: 500"
                    >
                      <b-icon icon="plus-square-dotted"></b-icon>
                      เพิ่มลูกค้า
                    </a-button>
                  </a-tooltip>
                </div>
              </a-col>
            </a-row>
          </template>
          <a-table
            class="quotation-table"
            :columns="columns"
            :data-source="customer"
            :pagination="true"
          >
            <template slot="companyName" slot-scope="text">
              <a>{{ text }}</a>
            </template>

            <a-space
              slot="index"
              slot-scope="index"
              :size="-12"
              class="avatar-chips"
            >
              <a>{{ index }}</a>
            </a-space>

            <template slot="status" slot-scope="status">
              <p v-if="status == 'บุคคลธรรมดา'" class="m-0 normal-label">
                {{ status }}
              </p>
              <p v-if="status == 'นิติบุคคล'" class="m-0 niti-label">
                {{ status }}
              </p>
            </template>

            <template slot="contactName" slot-scope="contactName">
              <p>{{ contactName }}</p>
            </template>

            <template slot="contactNumber" slot-scope="contactNumber">
              {{ contactNumber }}
            </template>

            <template slot="actionSection" slot-scope="customerID">
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
                      :to="`/Customers/EditCustomer/${customerID}`"
                      style="text-decoration: none"
                    >
                      <a style="text-decoration: none"> แก้ไข </a>
                    </router-link>
                  </a-menu-item>

                  <a-menu-item>
                    <a
                      style="text-decoration: none"
                      @click="
                        cID = customerID;
                        modalconfirm = true;
                      "
                    >
                      ลบ
                    </a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-table>
        </a-card>
        <!-- / Projects Table Column -->
      </div>

      <!-- Modal Start Here -->
      <a-modal
        class="whole-modal-body"
        v-model="visible"
        title="Create Customer"
        @ok="handleOk"
      >
        <div class="all-about-modal">
          <div class="title-modal">
            <p>เพิ่มลูกค้า</p>
          </div>
          <a-alert
            v-if="success"
            message="บันทึกข้อมูลสำเร็จ"
            type="success"
            show-icon
          />
          <form @submit.prevent="submitForm()" class="form-for-customer">
            <div class="toggle-type-customer">
              <div class="radio-selected">
                <input
                  v-model="status"
                  id="individual"
                  type="radio"
                  value="บุคคลธรรมดา"
                  @change="checkcompany(status)"
                />
                <!-- บุคคลธรรมดา -->
                <label for="individual">บุคคลธรรมดา</label>
              </div>
              <div class="radio-selected">
                <input
                  v-model="status"
                  id="juristic"
                  type="radio"
                  value="นิติบุคคล"
                  @change="checkcompany(status)"
                />
                <!-- นิติบุคคล -->
                <label for="juristic">นิติบุคคล</label>
              </div>
              <div class="error" v-if="$v.status.$error">
                <template v-if="!$v.status.$invalid"> </template>
                <template v-else style="color: red"> * </template>
              </div>
            </div>
            <!-- /toggle-type-customer -->
            <!-- ==================================================================== -->
            <div v-if="status == 'นิติบุคคล'">
              <div class="contact-person-section">
                <p class="icon" style="font-size: 18px; font-weight: 500">
                  <b-icon icon="person" style="color: #376303"></b-icon>
                  ข้อมูลผู้ติดต่อ
                </p>
                <!-- Name of company -->
                <div class="field">
                  <input
                    id="companyName"
                    type="text"
                    v-model="companyName"
                    title="โปรดกรอกชื่อบริษัท/ลูกค้า"
                    placeholder="ชื่อบริษัท/ลูกค้า"
                    style="
                      text-indent: 5%;
                      border: 1px solid rgb(211, 211, 0.123);
                    "
                    required
                  />
                </div>
                <!-- /Name of company -->
                <div class="contact-person-section-buttom">
                  <!-- COMPANY TEL. -->
                  <div class="field contact-person-section-buttom-part">
                    <input
                      id="companyNumber"
                      type="tel"
                      v-model="companyNumber"
                      pattern="[0-9]{10}"
                minlength="9"
                maxlength="10"
                      placeholder="เบอร์สำนักงาน"
                      style="
                        text-indent: 10%;
                        border: 1px solid rgb(211, 211, 0.123);
                      "
                    />
                  </div>
                  <!-- /COMPANY TEL. -->

                  <!-- TAX NUM -->
                  <div class="field contact-person-section-buttom-part">
                    <input
                      id="taxNumber"
                      type="text"
                      v-model="taxNumber"
                                          maxlength="13"
                    minlength="13"
                    pattern="[0-9]{13}"
                    title="ควรเป็นตัวเลขจำนวน 13 หลักเท่านั้น"
                      placeholder="เลขทะเบียนนิติบุคคล"
                      style="
                        text-indent: 4%;
                        border: 1px solid rgb(211, 211, 0.123);
                      "
                    />
                  </div>
                  <!-- TAX NUM -->
                </div>
              </div>
              <!-- /contact-person-section -->
            </div>
            <!-- ==================================================================== -->
            <!-- บุคคลธรรมดา -->
            <div v-else>
              <p class="icon" style="font-size: 18px; font-weight: 500">
                <b-icon icon="person" style="color: #376303"></b-icon>
                ข้อมูลผู้ติดต่อ
              </p>
              <div class="field">
                <!-- ชื่อผู้ติดต่อ -->
                <div class="field">
                  <input
                    id="contactName"
                    type="text"
                    v-model="contactName"
                    placeholder="ชื่อบริษัท/ลูกค้า"
                                      title="โปรดกรอกชื่อบริษัท/ลูกค้า"
                    style="
                      text-indent: 5%;
                      border: 1px solid rgb(211, 211, 211);
                    "
                  />
                </div>

                <div class="contact-person-section-buttom">
                  <div class="field contact-person-section-buttom-part">
                    <!-- เบอร์ผู้ติดต่อ -->

                    <input
                      id="contactNumber"
                      type="tel"
                      pattern="[0-9]{10}"
                minlength="9"
                maxlength="10"
                      v-model="contactNumber"
                      style="
                        text-indent: 10%;
                        border: 1px solid rgb(211, 211, 211);
                      "
                      placeholder="เบอร์โทร"
                    />
                  </div>
                  <!-- เลขกำกับภาษี -->
                  <div class="field contact-person-section-buttom-part">
                    <input
                      id="taxNumber"
                      type="text"
                      v-model="taxNumber"
                                          pattern="[0-9]{13}"
                    minlength="13"
                    maxlength="13"
                    placeholder="เลขผู้เสียภาษี"
                    title="ควรเป็นตัวเลขจำนวน 13 หลักเท่านั้น"
                      
                      style="
                        text-indent: 5%;
                        border: 1px solid rgb(211, 211, 211);
                      "
                    />
                  </div>
                </div>
                <!-- email -->
                <div class="field">
                  <input
                    id="contactEmail"
                    type="text"
                    v-model="contactEmail"
                                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="โปรดกรอกอีเมลให้ถูกต้อง"
                    placeholder="อีเมล"
                    style="
                      text-indent: 5%;
                      border: 1px solid rgb(211, 211, 211);
                    "
                  />
                </div>
              </div>
            </div>
            <br />
            <!-- / บุคคลธรรมดา -->
            <div class="address-info">
              <p style="font-size: 18px; font-weight: 500">
                <b-icon icon="house-door" style="color: #376303"></b-icon>
                ที่อยู่ผู้ติดต่อ
              </p>
              <!-- ที่อยู่ -->
              <div class="addr-detail-content">
                <div class="addr-detail maxsize-input">
                  <label for="Address">ที่อยู่</label>
                  <input
                    id="Address"
                    class="inputbox"
                    type="text"
                    v-model="Address"
                    placeholder="ที่อยู่"
                    style="text-indent: 4.5%"
                  />
                </div>

                <!-- ตำบล -->
                <div class="addr-detail" id="addr-box">
                  <label for="subdis">ตำบล</label>
                  <ThailandAutoComplete
                    v-model="subdis"
                    class="autofilladdr"
                    id="subdis"
                    type="district"
                    @select="select"
                    placeholder="ตำบล..."
                  />
                </div>
                <!-- อำเภอ -->
                <div class="addr-detail" id="addr-box">
                  <label for="dis">อำเภอ</label>
                  <ThailandAutoComplete
                    v-model="dis"
                    type="amphoe"
                    class="autofilladdr"
                    id="subdis"
                    @select="select"
                    placeholder="อำเภอ..."
                  />
                </div>
                <!-- จังหวัด -->
                <div class="addr-detail" id="addr-box">
                  <label for="provice">จังหวัด</label>
                  <ThailandAutoComplete
                    v-model="province"
                    class="autofilladdr"
                    type="province"
                    id="subdis"
                    @select="select"
                    color="#35495e"
                    placeholder="จังหวัด..."
                  />
                </div>
                <!-- zip code -->
                <div class="addr-detail" id="addr-box">
                  <label for="postcode">รหัสไปรษณีย์</label>
                  <ThailandAutoComplete
                    v-model="postcode"
                    type="zipcode"
                    id="subddis"
                    class="autofilladdr"
                    @select="select"
                    color="#00a4e4"
                    placeholder="รหัสไปรษณีย์..."
                  />
                </div>
              </div>
            </div>
            <br />
            <!-- รายละเอียดผู้ติดต่อ -->
            <div v-if="status == 'นิติบุคคล'">
              <p style="font-size: 18px; font-weight: 500">
                <b-icon icon="person" style="color: #376303"></b-icon>
                รายละเอียดผู้ติดต่อ
              </p>

              <div class="field">
                <label for="contactName"> ชื่อผู้ติดต่อ</label>
                <input
                  id="contactName"
                  type="text"
                  v-model="contactName"
                  placeholder="ชื่อผู้ติดต่อ"
                  style="
                    text-indent: 5%;
                    border: 1px solid rgb(211, 211, 211);
                    opacity: 0.5;
                  "
                />
                <div class="error" v-if="$v.contactName.$error">
                  <template v-if="!$v.contactName.$invalid"> </template>
                  <template v-else> โปรดระบุชื่อ </template>
                </div>
              </div>

              <div class="field">
                <label for="contactNumber"> เบอร์โทร </label>
                <input
                  id="contactNumber"
                  type="text"
                  v-model="contactNumber"
                                  pattern="[0-9]{10}"
                minlength="9"
                maxlength="10"
                placeholder="เบอร์โทร"
                title="โปรดกรอกเบอร์โทรให้ถูกต้อง"
                  style="
                    text-indent: 5%;
                    border: 1px solid rgb(211, 211, 211);
                    opacity: 0.5;
                  "
                />
              </div>

              <div class="field">
                <label for="contactEmail"> อีเมล </label>
                <input
                  id="contactEmail"
                  type="text"
                  v-model="contactEmail"
                                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="โปรดกรอกอีเมลให้ถูกต้อง"
                placeholder="อีเมล"
                  style="
                    text-indent: 5%;
                    border: 1px solid rgb(211, 211, 211);
                    opacity: 0.5;
                  "
                />
              </div>
            </div>
            <div v-else></div>
            <div class="submit-but-section">
              <button class="submit-button" type="submit">บันทึกข้อมูล</button>
            </div>
          </form>
        </div>
      </a-modal>

      <!-- /Modal edit Start Here -->
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
  numeric,
} from "vuelidate/lib/validators";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
import axios from "axios";

// Card Current User .
import RecentlyAdded from "../components/Cards/Customer/RecentlyAddCard.vue";

// Card crrent Bank
import NewCustomer from "../components/Cards/Customer/NewCustomer.vue";
// Card Company Stat
import TypeOfCus from "../components/Cards/Customer/TypeOfCus.vue";

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
          title: "ชื่อลูกค้า",
          dataIndex: "companyName",
          scopedSlots: { customRender: "companyName" },
        },
        {
          title: "สถานะ",
          dataIndex: "customerstatus",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "ชื่อผู้ติดต่อ",
          dataIndex: "contactName",
          scopedSlots: { customRender: "contactName" },
        },
        {
          title: "เบอร์โทร",
          dataIndex: "contactNumber",
          scopedSlots: { customRender: "contactNumber" },
        },
        {
          title: " ",
          dataIndex: "customerID",
          scopedSlots: { customRender: "actionSection" },
        },
      ],
    },
  },
  data() {
    return {
      customer: [],
      visible: false,
      status: "",
      contactName: "",
      contactNumber: "",
      companyName: "",
      companyNumber: "",
      taxNumber: "",
      contactEmail: "",
      Address: "",
      subdis: "",
      dis: "",
      province: "",
      postcode: "",
      success: false,
      cID: "",
      nerror: false,
      modalconfirm: false,
    };
  },
  validations: {
    status: {
      required,
    },
    
  },
  components: {
    ThailandAutoComplete,
    RecentlyAdded,
    NewCustomer,
    TypeOfCus,
  },
  created() {
    this.getcustomer();
  },
  methods: {
    select(address) {
      this.subdis = address.district;
      this.dis = address.amphoe;
      this.province = address.province;
      this.postcode = address.zipcode;
    },
    deletecus(id) {
      axios.delete(`https://pxu-server.herokuapp.com/customer/${id}`);
      this.modalconfirm = false;
      this.nerror = true;
      setTimeout(() => {
        window.location.reload(false);
      }, 400);
    },
    async submitForm() {
      console.log(this.companyName);
      console.log(this.conpanyNumber);
      if (this.status == "บุคคลธรรมดา") {
        this.companyName = this.contactName;
        this.companyNumber = this.contactNumber;
        /* console.log(this.companyName);
        console.log(this.conpanyNumber); */
      }
      this.$v.$touch();
      // console.log(this.status);
      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
        await axios
          .post("https://pxu-server.herokuapp.com/customer", {
            companyName: this.companyName,
            companyNumber: this.companyNumber,
            status: this.status,
            address: this.Address,
            subdis: this.subdis,
            dis: this.dis,
            province: this.province,
            postcode: this.postcode,
            contactName: this.contactName,
            contactNumber: this.contactNumber,
            contactEmail: this.contactEmail,
            taxNumber: this.taxNumber,
          })
          .then(() => {
            this.success = true;
            setTimeout(() => {
              window.location.reload(false);
            }, 500);
          });
      }
    },
    checkcompany(status) {
      if (status == "บุคคลธรรมดา") {
        
      } else {
        this.companyName = "";
        this.companyNumber = "";
      }
    },
    async getcustomer() {
      console.log("get-cus");
      try {
        const response = await axios.get(
          "https://pxu-server.herokuapp.com/customer"
        );
        this.customer = response.data;
        for (let i = 0; i < response.data.length; i++) {
          this.customer[i].index = i + 1;
        }
        console.log(this.customer);
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
/* conformation start here  */

.alert {
  display: flex;
  position: absolute;
  z-index: 100;
  width: 100%;
}
.modal-confirmation {
  background-color: rgb(255, 255, 255);
  padding: 3em;
  width: 50%;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
    border-color 0s;
  transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.button-section {
  display: flex;
  flex-direction: row;
  gap: 2em;
  margin-left: auto;
  margin-right: 0;
  text-align: end;
}
.button-section div {
  display: flex;
}
#confirm-text {
  font-size: 24px;
}
.wholenewsite {
  position: relative;
}

.isNotModalconfirm {
  opacity: 0.4;
  pointer-events: none;
}
.confirm-butt-alert{
  display: inline-block;
  background-color: green;
  padding: .6em;
  width: 100px;
  color: white;
  border-radius: 14px;
}
.cancle-butt-alert{
  display: inline-block;
  background-color: rgb(212, 37, 110);
  padding: .6em;
  width: 100px;
  color: white;
  border-radius: 14px;
}

/* confirmation end here */

.pagebody {
  display: flex;
  flex-direction: column;
}
.pagebody-upper {
  height: 5%;
}

.pagebody-lower .header-solid.h-full.ant-card {
  padding: 3em;
  background-color: white;
  border-radius: 14px;
  border: none;
  margin-bottom: 2rem;
  -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
    border-color 0s;
  transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
}

.header-solid {
  font-family: "Mitr", sans-serif;
}
.form-for-customer {
  font-family: "Mitr", sans-serif;
  align-content: center;
  width: 90%;
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;
}
.contact-person-section-buttom {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 2em;
}
.contact-person-section-buttom-part {
  width: 100%;
}

.quotation-table >>> .ant-table-column-title {
  font-size: 18px !important;
  font-weight: 400;
}

#companyName,
#contactName {
  background-image: url("../assets/images/icons/file-icons/person-circle.svg");
  opacity: 0.9;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}

#companyNumber,
#contactNumber {
  background-image: url("../assets/images/icons/file-icons/telephone-fill.svg");
  opacity: 0.9;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}
#taxNumber {
  opacity: 0.9;
  width: 100%;
}
#contactEmail {
  background-image: url("../assets/images/icons/file-icons/envelope-fill.svg");
  opacity: 0.9;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}

#addr-detail input {
  width: 100%;
}
#addr-box {
  display: flex;
  flex-direction: column;
}

.addr-info-section {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.addr-info-section div {
  width: 45%;
}
.form-for-customer .field input {
  border-radius: 12px;
  height: 45px;
}

.field input {
  border: 1 solid rgba(190, 187, 187, 0.801);
}

.contact-person-section {
  display: flex;
  flex-direction: column;
}

/* modal style start here  */

.all-about-modal {
  font-family: "Mitr", sans-serif;
}

.title-modal {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.title-modal p {
  font-size: 26px;
  font-weight: 700;
  margin-left: auto;
  margin-right: auto;
  align-content: center;
}
.whole-modal-body {
  font-family: "Mitr", sans-serif;
  width: 50vw;
}
.whole-modal-body >>> .ant-modal {
  width: 50% !important;
  top: 5%;
}
.whole-modal-body >>> .ant-modal-content {
  width: 50vw default 0;
  margin-left: auto;
  margin-left: auto;
}
.whole-modal-body >>> .ant-modal-header {
  border-bottom: 0;
  align-content: center;
}

.whole-modal-body >>> .ant-modal-footer {
  display: none;
}

.whole-modal-body >>> .ant-modal-title {
  display: none;
}

.toggle-type-customer {
  display: flex;
  flex-direction: row;
  padding: 1em 1em 1em 0;
}
.toggle-type-customer div {
  padding: 1em;
}
.radio-selected {
  justify-content: center;
}

.radio-selected input {
  margin-right: 1em;
  height: 21px;
  width: 21px;
}
.error {
  color: red;
}
.field {
  margin-bottom: 1em;
}

.submit-but-section {
  display: flex;
  width: 100%;
  margin-top: 3em;
}

.submit-button {
  background-color: #1890ff;
  height: 36px;
  width: 164px;
  color: white;
  border-radius: 8px;
  border: 0;
  margin-left: auto;
  margin-right: auto;
}
.addr-content-box input,
.inputbox {
  text-indent: 5%;
  border-radius: 14px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.123);
}
.addr-detail-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.addr-detail {
  display: flex;
  padding: 1em;
  flex-direction: column;
  width: 50%;
}

.maxsize-input {
  display: flex;
  padding: 1em;
  flex-direction: column;
  width: 100% !important;
}

.maxsize-input input {
  text-indent: 3%;
}

.autofilladdr >>> .vth-addr-input-size-default[data-v-1f53c317] {
  font-family: "Mitr", sans-serif;
  border-radius: 14px;
  height: 45px;
}

.normal-label,
.niti-label {
  display: flex;
  width: 100px;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  background-color: rgba(133, 134, 133, 0.438);
  border-radius: 8px;
  padding: 0.3em;
  color: black;
}

@media only screen and (max-width: 991px) {
  .contact-person-section-buttom {
    flex-direction: column;
    gap: 0;
  }
  #companyName,
  #contactName {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 5% !important;
  }

  #companyNumber,
  #contactNumber {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 5% !important;
  }
  #contactEmail {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 4% !important;
  }
  .addr-info-section {
    flex-direction: column;
  }
  .autocom-add >>> .vth-addr-input-size-default {
    border-radius: 12px;
    width: 500%;
  }
  .addr-detail-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .addr-detail {
    display: flex;
    padding: 1em;
    flex-direction: column;
    width: 100%;
  }
}
/* / modal style end here  */
</style>