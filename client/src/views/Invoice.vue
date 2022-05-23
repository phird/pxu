<template>
  <!-- Projects Table Column -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
         <router-link
        :to="`/quotations`"
        style="text-decoration: none; color: black "
      >
        <b-icon icon="chevron-left"> </b-icon>
      </router-link>
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0" style="margin-left: 2em;">ใบวางบิล</h5>
        </a-col>
      </a-row>
    </template>
    <a-table
      class="quotation-table"
      :columns="columns"
      :data-source="invoice"
      :pagination="true"
    >
      <template slot="inID" slot-scope="inID">
        <a>INV{{ inID }}</a>
      </template>
    <template slot="installment" slot-scope="installment">
        <a>งวดที่ {{ installment }}</a>
      </template>
      <template slot="status" slot-scope="status">
        <a>{{ status }}</a>
      </template>
      <template slot="val" slot-scope="val">
        <a>{{ val }}</a>
      </template>
      <template slot="act" slot-scope="id">
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
                    :to="`/Editinvoice/${id}`"
                    style="text-decoration: none"
                  >
                    <a style="text-decoration: none">แก้ไขใบวางบิล</a>
                  </router-link>
                </a-menu-item>
                <a-menu-item>
                  <router-link
                    :to="`/receipt/${id}`"
                    style="text-decoration: none"
                  >
                    <a style="text-decoration: none">ข้อมูลของslip</a>
                  </router-link>
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
          title: "#ID",
          dataIndex: "invoiceID",
          scopedSlots: { customRender: "inID" },
        },
        {
          title: "Installment",
          dataIndex: "numberinstallment",
          scopedSlots: { customRender: "installment" },
        },
        {
          title: "STATUS",
          dataIndex: "statusinvoice",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Value",
          dataIndex: "priceINV",
          scopedSlots: { customRender: "val" },
        },
        {
          title: "Action",
          dataIndex: "invoiceID",
          scopedSlots: { customRender: "act" },
        },
      ],
    },
  },
  data() {
    return {
      // Active button for the "Projects" table's card header radio button group.
      projectHeaderBtns: "all",
      invoice: [],
      inID:'',
    };
  },
  created() {
    this.inID = this.$route.params.id;
    this.getinv(this.inID);
  },
  methods: {
    async getinv(id) {
      console.log("get-invoice");
      try {
        const response = await axios.get(`http://localhost:5000/invoice/${id}`);
        this.invoice = response.data;
        console.log(this.invoice);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>


<style scoped>
.header-solid {
  font-family: "Mitr", sans-serif;
}
</style>