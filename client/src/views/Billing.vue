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
        const response = await axios.get("http://128.199.187.173:5000/quotation/res");
        this.quotation = response.data;
        console.log(this.quotation);
      } catch (err) {
        console.log(err);
      }
    },
	deletequo(id) {
      console.log(id);
      if (window.confirm("คุณต้องการจะลบลูกค้าคนนี้ใช่หรือไม่ ?")) {
        axios.delete(`http://128.199.187.173:5000/quotation/${id}`);
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