<template>
  <!-- Projects Table Column -->
  <div>
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
                Create Customer
            </a-button>
					</div>
				</a-col>
			</a-row>
		</template>
		<a-table class="quotation-table"  :columns="columns" :data-source="customer" :pagination="true">

			<template slot="companyName" slot-scope="text">
				<a>{{ text }}</a>
			</template>

			<a-space slot="index" slot-scope="index" :size="-12" class="avatar-chips">
				<a>{{ index }}</a>
			</a-space>

			<template slot="status" slot-scope="status">
				<h6 class="m-0">
					{{status}}
				</h6>
			</template>

			<template slot="contactName" slot-scope="contactName">
				<p>{{contactName}}</p>
			</template>

			<template slot="contactNumber" slot-scope="contactNumber">
				{{contactNumber}}
			</template>

      <template slot="actionSection" slot-scope="row">
				<a-button  type="link" :data-id="row.customerID">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg>
				</a-button>
			</template>

		</a-table>	
	</a-card>
	<!-- / Projects Table Column -->



    <!-- Modal Start Here -->
    <a-modal
      class="whole-modal-body"
      v-model="visible"
      title="Create Customer"
      @ok="handleOk"
    >
      <div>
        <form @submit.prevent="submitForm()" class="form-for-customer">
          <div class="toggle-type-customer">
            <div>
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
            <div>
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
          </div>
          <!-- /toggle-type-customer -->
          <!-- ==================================================================== -->
          <div v-if="status == 'นิติบุคคล'">
            <div class="contact-person-section">
              <h6 class="icon">
                <b-icon icon="person" style="color: #376303"></b-icon>
                ข้อมูลผู้ติดต่อ
              </h6>
              <!-- Name of company -->
              <div class="field">
                <input
                  id="companyName"
                  type="text"
                  v-model="companyName"
                  placeholder="ชื่อบริษัท/ลูกค้า"
                  style="text-indent: 4%"
                />
                <div class="error" v-if="$v.companyName.$error">
                  <template v-if="!$v.companyName.$invalid"> </template>
                  <template v-else style="color: red"> ต้องระบุชื่อ </template>
                </div>
              </div>
              <!-- /Name of company -->
              <div class="contact-person-section-buttom">
                <!-- COMPANY TEL. -->
                <div class="field contact-person-section-buttom-part">
                  <input
                    id="companyNumber"
                    type="tel"
                    v-model="companyNumber"
                    placeholder="เบอร์สำนักงาน"
                    style="text-indent: 8%"
                  />
                  <div class="error" v-if="$v.companyNumber.$error">
                    <template v-if="!$v.companyNumber.$invalid"> </template>
                    <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
                  </div>
                </div>
                <!-- /COMPANY TEL. -->

                <!-- TAX NUM -->
                <div class="field contact-person-section-buttom-part">
                  <input
                    id="taxNumber"
                    type="text"
                    v-model="taxNumber"
                    placeholder="เลขทะเบียนนิติบุคคล"
                    style="text-indent: 4%"
                  />
                  <div class="error" v-if="$v.taxNumber.$error">
                    <template v-if="!$v.taxNumber.$invalid"> </template>
                    <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
                  </div>
                </div>
                <!-- TAX NUM -->
              </div>
            </div>
            <!-- /contact-person-section -->
          </div>
          <!-- ==================================================================== -->
          <!-- บุคคลธรรมดา -->
          <div v-else>
            <h6 class="icon">
              <b-icon icon="person" style="color: #376303"></b-icon>
              ข้อมูลผู้ติดต่อ
            </h6>
            <div class="field">
              <!-- ชื่อผู้ติดต่อ -->
              <div class="field">
                <input
                  id="contactName"
                  type="text"
                  v-model="contactName"
                  placeholder="ชื่อบริษัท/ลูกค้า"
                  style="text-indent: 4%"
                />
                <div class="error" v-if="$v.contactName.$error">
                  <template v-if="!$v.contactName.$invalid"> </template>
                  <template v-else> ต้องระบุชื่อ </template>
                </div>
              </div>

              <div class="contact-person-section-buttom">
                <div class="field contact-person-section-buttom-part">
                  <!-- เบอร์ผู้ติดต่อ -->

                  <input
                    id="contactNumber"
                    type="tel"
                    v-model="contactNumber"
                    style="text-indent: 8%"
                    placeholder="เบอร์โทร"
                  />
                  <div class="error" v-if="$v.contactNumber.$error">
                    <template v-if="!$v.contactNumber.$invalid"> </template>
                    <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
                  </div>
                </div>
                <!-- เลขกำกับภาษี -->
                <div class="field contact-person-section-buttom-part">
                  <input
                    id="taxNumber"
                    type="text"
                    v-model="taxNumber"
                    placeholder="เลขผู้เสียภาษี"
                    style="text-indent: 4%"
                  />
                  <div class="error" v-if="$v.taxNumber.$error">
                    <template v-if="!$v.taxNumber.$invalid"> </template>
                    <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
                  </div>
                </div>
              </div>
              <!-- email -->
              <div class="field">
                <input
                  id="contactEmail"
                  type="text"
                  v-model="contactEmail"
                  placeholder="อีเมล"
                  style="text-indent: 4%"
                />
                <div class="error" v-if="$v.contactEmail.$error">
                  <template v-if="!$v.contactEmail.$invalid"> </template>
                  <template v-else> email error </template>
                </div>
              </div>
            </div>
          </div>
          <br />
          <!-- / บุคคลธรรมดา -->
          <div class="address-info">
            <h6>
              <b-icon icon="house-door" style="color: #376303"></b-icon>
              ที่อยู่ผู้ติดต่อ
            </h6>
            <!-- ที่อยู่ -->
            <div class="field" id="addr-detail">
              <label for="Address">บ้านเลขที่/ที่อยู่</label>
              <input id="Address" type="text" v-model="Address" />
              <div class="error" v-if="$v.Address.$error">
                <template v-if="!$v.Address.$invalid"> </template>
                <template v-else> ต้องใส่ที่อยู่ </template>
              </div>
            </div>
            <div class="addr-info-section">
              <!-- ตำบล -->
              <div class="field" id="addr-box">
                <label for="subdis">ตำบล</label>
                <ThailandAutoComplete v-model="subdis" id='subdis' type="district" @select="select"  placeholder="ตำบล..."/>
              </div>
              <!-- อำเภอ -->
              <div class="field" id="addr-box">
                <label for="dis">อำเภอ</label>
                <ThailandAutoComplete v-model="dis" type="amphoe" @select="select"  placeholder="อำเภอ..."/>
              </div>
              <!-- จังหวัด -->
              <div class="field" id="addr-box">
                <label for="provice">จังหวัด</label>
                <ThailandAutoComplete v-model="province" type="province" @select="select"   color="#35495e" placeholder="จังหวัด..."/>
              </div>
              <!-- zip code -->
              <div class="field" id="addr-box">
                <label for="postcode">รหัสไปรษณีย์</label>
                <ThailandAutoComplete v-model="postcode" type="zipcode" @select="select"  color="#00a4e4" placeholder="รหัสไปรษณีย์..."/>
              </div>
            </div>
          </div>
          <br />
          <!-- รายละเอียดผู้ติดต่อ -->
          <div v-if="status == 'นิติบุคคล'">
            <h6>
              <b-icon icon="person" style="color: #376303"></b-icon>
              รายละเอียดผู้ติดต่อ
            </h6>

            <div class="field">
              <label for="contactName"> ชื่อผู้ติดต่อ</label>
              <input id="contactName" type="text" v-model="contactName" />
              <div class="error" v-if="$v.contactName.$error">
                <template v-if="!$v.contactName.$invalid"> </template>
                <template v-else> ต้องระบุชื่อ </template>
              </div>
            </div>

            <div class="field">
              <label for="contactNumber"> เบอร์โทร </label>
              <input id="contactNumber" type="text" v-model="contactNumber" />
              <div class="error" v-if="$v.contactNumber.$error">
                <template v-if="!$v.contactNumber.$invalid"> </template>
                <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
              </div>
            </div>

            <div class="field">
              <label for="contactEmail"> อีเมล </label>
              <input id="contactEmail" type="text" v-model="contactEmail" />
              <div class="error" v-if="$v.contactEmail.$error">
                <template v-if="!$v.contactEmail.$invalid"> </template>
                <template v-else> email error </template>
              </div>
            </div>
          </div>
          <div v-else></div>
          <button type="submit">ส่งแบบฟอร์ม</button>
        </form>
      </div>
    </a-modal>

    <!-- /Modal Start Here -->
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
} from "vuelidate/lib/validators";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
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
          title: "Customer Name",
          dataIndex: "companyName",
          scopedSlots: { customRender: "companyName" },
        },
        {
          title: "ID",
          dataIndex: "index",
          scopedSlots: { customRender: "index" },
        },
        {
          title: "STATUS",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Contact Person",
          dataIndex: "contactName",
          scopedSlots: { customRender: "contactName" },
        },
        {
          title: "Tel",
          dataIndex: "contactNumber",
          scopedSlots: { customRender: "contactNumber" },
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
      customer: [],
      visible: false,
      status: "นิติบุคคล",
      contactName: "",
      contactNumber: "",
      companyName: "",
      companyNumber: "",
      taxNumber: null,
      contactEmail: null,
      Address: null,
      subdis: '',
      dis: '',
      province: '',
      postcode: '',
    };
  },
  validations: {
    companyNumber: {
      required,
      validFormat: (val) => /^\d{10}$/.test(val),
    },
    contactNumber: {
      required,
      validFormat: (val) => /^\d{10}$/.test(val),
    },
    taxNumber: {
      required,
      validFormat: (val) => /^\d{13}$/.test(val),
    },
    contactEmail: {
      required,
      email,
    },
    contactName: {
      required,
    },
    companyName: {
      required,
    },
    Address: {
      required,
    }
    // passportDate: {
    //   required,
    //   validDate: (val) => moment(val, "DD.MM.YYYY", true).isValid(),
    // },
  },
  components:{
    ThailandAutoComplete,
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
    async submitForm() {
      this.$v.$touch();
      if(this.status=='บุคคลธรรมดา'){
        this.companyName=this.contactName;
        this.conpanyNumber=this.contactNumber;
      }
      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
        await axios
          .post("http://localhost:5000/customer", {
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
          .then(function () {
            alert("ok");
          });
      }
    },
    checkcompany(status) {
      if (status == "บุคคลธรรมดา") {
        this.companyName = "test";
        this.companyNumber = "0000000000";
      } else {
        this.companyName = null;
        this.companyNumber = null;
      }
    },
    async getcustomer() {
      console.log("get-cus");
      try {
        const response = await axios.get("http://localhost:5000/customer");
        this.customer = response.data;
        for(let i=0;i<response.data.length;i++){
             this.customer[i].index=i+1;
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
.header-solid {
  font-family: "Mitr", sans-serif;
}
.form-for-customer {
  font-family: "Mitr", sans-serif;
  align-content: center;
  width: 60%;
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
#companyName,
#contactName {
  background-image: url("../assets/images/icons/file-icons/person-circle.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 5px 50%;
  width: 100%;
}
#companyNumber,
#contactNumber {
  background-image: url("../assets/images/icons/file-icons/telephone-fill.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 5px 50%;
  width: 100%;
}
#taxNumber {
  opacity: 0.5;
  width: 100%;
}
#contactEmail {
  background-image: url("../assets/images/icons/file-icons/envelope-fill.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 5px 50%;
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
.form-for-customer input {
  border-radius: 10px;
  border: 0.5 solid rgba(0, 0, 0, 0.473);
  opacity: 0.5;
}

.contact-person-section {
  display: flex;
  flex-direction: column;
}
/* modal style start here  */
.whole-modal-body {
  width: 100vw;
  height: 100vh;
}
.whole-modal-body >>> .ant-modal {
  width: 70% !important;
}
.whole-modal-body >>> .ant-modal-content {
  width: 50vw default 0;
  margin-left: auto;
  margin-left: auto;
}
.toggle-type-customer {
  display: flex;
  flex-direction: row;
  padding: 1em;
}
.toggle-type-customer div {
  padding: 1em;
}
/* / modal style end here  */
</style>