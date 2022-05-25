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
          style="text-decoration: none; color: black"
        >
          <b-icon icon="chevron-left"> </b-icon>
        </router-link>
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0" style="margin-left: 2em">ใบวางบิล</h5>
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
        <a>{{ val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  }}</a>
      </template>
      <template slot="act-1" slot-scope="row">
        <a-menu-item>
          <router-link
            :to="`/createReceipt/${row.invoiceID}`"
            style="text-decoration: none"
            target="_blank"
            v-if="row.imgslip != ''"
          >
            <a style="text-decoration: none">ใบเสร็จ</a>
          </router-link>
        </a-menu-item>
      </template>

      <template slot="act" slot-scope="id">
        <router-link
          :to="`/createInvoice/${id.invoiceID}`"
          target="_blank"
          style="text-decoration: none"
          v-if="id.dateinvoice != '0000-00-00' && id.bankID != '0' "
        >
          <b-icon
            icon="file-earmark-pdf"
            style="width: 20px; height: 20px; margin: 0px 0.7em 0px 0.5em"
          >
          </b-icon>
        </router-link>
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
                v-if="id.imgslip == ''"
                :to="`/Editinvoice/${id.invoiceID}`"
                style="text-decoration: none"
              >
                <a style="text-decoration: none">แก้ไขใบวางบิล</a>
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link
                :to="`/receipt/${id.invoiceID}`"
                style="text-decoration: none"
              >
                <a v-if="id.imgslip == ''" style="text-decoration: none"
                  >แนบสลิป</a
                >
                <a v-else style="text-decoration: none">แก้ไขสลิป</a>
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
          title: "",
          scopedSlots: { customRender: "act-1" },
        },
        {
          title: "Action",
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
      inID: "",
      cc: 0,
      qin: 0,
    };
  },
  created() {
    this.inID = this.$route.params.id;
    this.getinv(this.inID);
    this.getstatus(this.inID);
  },
  methods: {
    async getinv(id) {
      console.log("get-invoice");
      try {
        const response = await axios.get(`https://pxu-server.herokuapp.com/invoice/${id}`);
        this.invoice = response.data;
        console.log(this.invoice);
      } catch (err) {
        console.log(err);
      }
    },
    async getstatus(id) {
      console.log("get-invoice");
      try {
        await axios
          .get(`https://pxu-server.herokuapp.com/invoice/status/${id}`)
          .then((response) => {
            this.cc = response.data[0][0].cc;
            this.qin = response.data[1][0].qin;
            console.log(response.data);
            console.log(this.cc);
            console.log(this.qin);
            if (this.cc == this.qin) {
              console.log("putstatus");
              axios.post(
                `https://pxu-server.herokuapp.com/invoice/quostatus/${this.inID}`
              );
            }
          });
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