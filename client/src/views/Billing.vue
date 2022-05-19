<template>
  <!-- Projects Table Column -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0">ใบเสนอราคาที่ถูกยกเลิก</h5>
        </a-col>
        <a-col :span="24" :md="12">
          <a class="font-semibold m-0" style="color:red">****ลบได้ก็ต่อเมื่อผ่านไปแล้ว1เดือน</a>
        </a-col>
      </a-row>
    </template>
    <a-table
      class="quotation-table"
      :columns="columns"
      :data-source="quotation"
      :pagination="true"
    >
      <template slot="qID" slot-scope="qID">
        <a>QA{{ qID }}</a>
      </template>
      <template slot="qName" slot-scope="qName">
        <a> {{ qName }}</a>
      </template>
      <template slot="status" slot-scope="status">
        <a>{{ status }}</a>
      </template>
	  <template slot="statusw" slot-scope="statusw">
        <a>{{ statusw }}</a>
      </template>
      <template slot="val" slot-scope="val">
        <a>{{ val }}</a>
      </template>
      <template slot="act" slot-scope="quotationID"> 
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
                    :to="`/Invoice/${quotationID}`"
                    style="text-decoration: none"
                  >
                    <a style="text-decoration: none">INVOICE</a>
                  </router-link>
                </a-menu-item>

                <a-menu-item>
                  <a
                    style="text-decoration: none"
                    @click="deletequo(quotationID)"
                  >
                    DELETE
                  </a>
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
          dataIndex: "quotationID",
          scopedSlots: { customRender: "qID" },
        },
        {
          title: "PROJECT NAME",
          dataIndex: "quotationName",
          scopedSlots: { customRender: "qName" },
        },
        {
          title: "STATUS",
          dataIndex: "statusquotation",
          scopedSlots: { customRender: "status" },
        },
		{
          title: "W-STATUS",
          dataIndex: "statuswork",
          scopedSlots: { customRender: "statusw" },
        },
        {
          title: "Value",
          dataIndex: "paymentPrice",
          scopedSlots: { customRender: "val" },
        },
        {
          title: "Action",
		  dataIndex:"quotationID",
          scopedSlots: { customRender: "act" },
        },
      ],
    },
  },
  data() {
    return {
      // Active button for the "Projects" table's card header radio button group.
      projectHeaderBtns: "all",
      quotation: [],
    };
  },
  created() {
    this.getquotation();
  },
  methods: {
    async getquotation() {
      console.log("get-quo");
      try {
        const response = await axios.get("http://localhost:5000/quotation/res");
        this.quotation = response.data;
        console.log(this.quotation);
      } catch (err) {
        console.log(err);
      }
    },
	deletequo(id) {
      console.log(id);
      if (window.confirm("คุณต้องการจะลบลูกค้าคนนี้ใช่หรือไม่ ?")) {
        axios.delete(`http://localhost:5000/quotation/${id}`);
        window.location.reload(false);
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