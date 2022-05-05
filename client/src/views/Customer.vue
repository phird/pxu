<template>
	<!-- Projects Table Column -->
	<div>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0"> ลูกค้า </h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<div class="table-upload-btn">
            <a-button type="primary" @click="showModal">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z" fill="#111827"/>
                </svg>
                Create Customer
            </a-button>
					</div>
				</a-col>
			</a-row>
		</template>
		<a-table class="quotation-table"  :columns="columns" :data-source="data" :pagination="true">

			<template slot="name" slot-scope="text">
				<a>{{ text }}</a>
			</template>

			<a-space slot="members" slot-scope="members" :size="-12" class="avatar-chips">
				<template v-for="member in members">
					<a-avatar :key="member" size="small" :src="member" />
				</template>
			</a-space>

			<template slot="company" slot-scope="company">
				<h6 class="m-0">
					<img :src="company.logo" width="25" style="margin-right: 10px;">
					{{ company.name }}
				</h6>
			</template>

			<template slot="completion" slot-scope="completion">
				<div class="progress-right">
					<div class="text-right text-sm font-semibold text-muted pr-15">{{ completion.value || completion.value == 0 ? completion.value : completion }}%</div>
					<a-progress class="m-0" :percent="completion.value || completion.value == 0 ? completion.value : completion" :show-info="false" size="small" :status="completion.status ? completion.status : 'normal'" />
				</div>
			</template>

			<template slot="editBtn" slot-scope="row">
				<a-button type="link" :data-id="row.key">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill-gray-7" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"/>
						<path class="fill-gray-7" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"/>
					</svg>
				</a-button>
			</template>

		</a-table>

		
	</a-card>
	<!-- / Projects Table Column -->




	<!-- Modal Start Here -->
	<a-modal class="whole-modal-body" v-model="visible" title="Create Customer" @ok="handleOk">
    
    <!-- toggle section  -->

		<div class="toggle-type-customer">
      <div>
        <input v-model="status" id="individual" type="radio" value="บุคคลธรรมดา" @change="checkcompany(status)"/> <!-- บุคคลธรรมดา -->
        <label for="individual">บุคคลธรรมดา</label>
      </div>
			<div>
        <input v-model="status" id="juristic" type="radio" value="นิติบุคคล" @change="checkcompany(status)" /> <!-- นิติบุคคล -->
        <label for="juristic">นิติบุคคล</label>
      </div>
      
    </div> 
    <!-- toggle section  -->

    <!-- form start here  -->

    <form @submit.prevent="submitForm()">
      <div v-if="status == 'นิติบุคคล'">
        <div class="contact-person-section">
          <P>  <b-icon icon="person" style="color: #376303;"></b-icon > ข้อมูลผู้ติดต่อ</P>
          <!-- Name of company -->
          <div class="field input-icons">
            <b-icon icon="person-circle"></b-icon>
            <input id="companyName" type="text" v-model="companyName"  placeholder="ชื่อลูกค้า"/>
            <div class="error" v-if="$v.companyName.$error">
              <template v-if="!$v.companyName.$invalid"> </template>
              <template v-else style="color:red"> ต้องระบุชื่อ </template>
            </div>
          </div>
          <!-- /Name of company -->

          <!-- COMPANY TEL. -->
          <div class="field">
            <label for="companyNumber"> เบอร์บริษัท</label>
            <input id="companyNumber" type="text" v-model="companyNumber" />
            <div class="error" v-if="$v.companyNumber.$error">
              <template v-if="!$v.companyNumber.$invalid"> </template>
              <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
            </div>
          </div>
          <!-- /COMPANY TEL. -->

          <!-- TAX NUM -->
          <div class="field">
            <label for="taxNumber">เลขกำกับภาษี</label>
            <input id="taxNumber" type="text" v-model="taxNumber" />
            <div class="error" v-if="$v.taxNumber.$error">
              <template v-if="!$v.taxNumber.$invalid"> </template>
              <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
            </div>
          </div>
          <!-- TAX NUM -->
        </div>   <!-- /contact-person-section -->
      </div>
      <div v-else>
        <div class="field">
          <label for="contactNumber"> เบอร์ผู้ติดต่อ</label>
          <input id="contactNumber" type="text" v-model="contactNumber" />
          <div class="error" v-if="$v.contactNumber.$error">
            <template v-if="!$v.contactNumber.$invalid"> </template>
            <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
          </div>
        </div>
        <div class="field">
          <label for="contactName"> ชื่อผู้ติดต่อ</label>
          <input id="contactName" type="text" v-model="contactName" />
          <div class="error" v-if="$v.contactName.$error">
            <template v-if="!$v.contactName.$invalid"> </template>
            <template v-else> ต้องระบุชื่อ </template>
          </div>
        </div>
        <div class="field">
          <label for="contactEmail"> emailผู้ติดต่อ</label>
          <input id="contactEmail" type="text" v-model="contactEmail" />
          <div class="error" v-if="$v.contactEmail.$error">
            <template v-if="!$v.contactEmail.$invalid"> </template>
            <template v-else> email error </template>
          </div>
        </div>
        <div class="field">
          <label for="taxNumber">เลขกำกับภาษี</label>
          <input id="taxNumber" type="text" v-model="taxNumber" />
          <div class="error" v-if="$v.taxNumber.$error">
            <template v-if="!$v.taxNumber.$invalid"> </template>
            <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
          </div>
        </div>
      </div>
      <div class="field">
        <label for="Address">ที่อยู่</label>
        <input id="Address" type="text" v-model="Address" />
        <div class="error" v-if="$v.Address.$error">
          <template v-if="!$v.Address.$invalid"> </template>
          <template v-else> ต้องใส่ที่อยู่ </template>
        </div>
      </div>
      <div class="field">
        <label for="subdis">ตำบล</label>
        <input id="subdis" type="text" v-model="subdis" />
        <div class="error" v-if="$v.subdis.$error">
          <template v-if="!$v.subdis.$invalid"> </template>
          <template v-else> ****</template>
        </div>
      </div>
      <div class="field">
        <label for="dis">อำเภอ</label>
        <input id="dis" type="text" v-model="dis" />
        <div class="error" v-if="$v.dis.$error">
          <template v-if="!$v.dis.$invalid"> </template>
          <template v-else> ****</template>
        </div>
      </div>
      <div class="field">
        <label for="province">จังหวัด</label>
        <input id="province" type="text" v-model="province" />
        <div class="error" v-if="$v.province.$error">
          <template v-if="!$v.province.$invalid"> </template>
          <template v-else> ****</template>
        </div>
      </div>
      <div class="field">
        <label for="postcode">รหัสไปรษณีย์</label>
        <input id="postcode" type="text" v-model="postcode" />
        <div class="error" v-if="$v.postcode.$error">
          <template v-if="!$v.postcode.$invalid"> </template>
          <template v-else> รหัสไปรษณีย์ต้องมี5ตัว</template>
        </div>
      </div>
      <div v-if="status == 'นิติบุคคล'">
        <div class="field">
          <label for="contactNumber"> เบอร์ผู้ติดต่อ</label>
          <input id="contactNumber" type="text" v-model="contactNumber" />
          <div class="error" v-if="$v.contactNumber.$error">
            <template v-if="!$v.contactNumber.$invalid"> </template>
            <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
          </div>
        </div>
        <div class="field">
          <label for="contactName"> ชื่อผู้ติดต่อ</label>
          <input id="contactName" type="text" v-model="contactName" />
          <div class="error" v-if="$v.contactName.$error">
            <template v-if="!$v.contactName.$invalid"> </template>
            <template v-else> ต้องระบุชื่อ </template>
          </div>
        </div>
        <div class="field">
          <label for="contactEmail"> emailผู้ติดต่อ</label>
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
    <!-- form start here --> 



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
    data: {
      type: Array,
      default: () => [
        {
          key: "1",
          idIdx: "xxxxx",
          prjName: "Project1",
          status: 1,
          wStatus: 1,
          val: "100,000",
        },
        {
          key: "1",
          idIdx: "uuuuuuuu",
          prjName: "Project1",
          status: 1,
          wStatus: 1,
          val: "100,000",
        },
        {
          key: "1",
          idIdx: "yyyyyyy",
          prjName: "Project1",
          status: 1,
          wStatus: 1,
          val: "100,000",
        },
        {
          key: "1",
          idIdx: "aaaaaa",
          prjName: "Project1",
          status: 1,
          wStatus: 1,
          val: "100,000",
        },
      ],
    },
    columns: {
      type: Array,
      default: () => [
        {
          title: "#ID",
          dataIndex: "idIdx",
          scopedSlots: { customRender: "idIdx" },
        },
        {
          title: "Customer Name",
          dataIndex: "prjName",
          scopedSlots: { customRender: "prjName" },
        },
        {
          title: "STATUS",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Contact Person",
          dataIndex: "cPerson",
          scopedSlots: { customRender: "cPerson" },
        },
        {
          title: "Tel",
          dataIndex: "tel",
          scopedSlots: { customRender: "tel" },
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
      subdis: null,
      dis: null,
      province: null,
      postcode: null,
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
    postcode: {
      required,
      validFormat: (val) => /^\d{5}$/.test(val),
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
    },
    subdis: {
      required,
    },
    dis: {
      required,
    },
    province: {
      required,
    },
    // passportDate: {
    //   required,
    //   validDate: (val) => moment(val, "DD.MM.YYYY", true).isValid(),
    // },
  },
  created() {
    this.getcustomer();
  },
  methods: {
        async submitForm() {
      this.$v.$touch();
      console.log(this.companyName);
      console.log(this.companyNumber);
      if (this.$v.$invalid) {
        alert("can't submit");
      }else{
         await axios.post("http://localhost:5000/customer", {
              companyName : this.companyName,
              companyNumber:this.companyNumber,
              status:this.status,
              address:this.Address,
              subdis:this.subdis,
              dis:this.dis,
              province:this.province,
              postcode:this.postcode,
              contactName:this.contactName,
              contactNumber:this.contactNumber,
              contactEmail:this.contactEmail,
              taxNumber:this.taxNumber,
        }).then(function(){
          alert('ok');
        });
      }
    },
    checkcompany(status){
      if(status=='บุคคลธรรมดา'){
        this.companyName="test";
        this.companyNumber="0000000000";
      }else{
        this.companyName=null;
        this.companyNumber=null;
      }
    },
    async getcustomer() {
      console.log("get-cus");
      try {
        const response = await axios.get("http://localhost:5000/customer");
        this.customer = response.data;
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
  .input-icons {
    width: 100%;
    margin-bottom: 10px;
  }
  .input-icons b-icon{
    position: absolute;
  }
  /* modal style start here  */
  .whole-modal-body{
    width: 100vw;
    height: 100vh;
  }
  .whole-modal-body >>> .ant-modal {
    width: 70% !important;
  }
  .whole-modal-body >>> .ant-modal-content{
    width: 50vw default 0;
    margin-left: auto;
    margin-left: auto;
  }
  .toggle-type-customer{
    display: flex;
    flex-direction: row;
    padding: 1em;
  }
  .toggle-type-customer div{
    padding: 1em;
  }
  /* / modal style end here  */
</style>