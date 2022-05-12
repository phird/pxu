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
          <h5 class="font-semibold m-0">ใบเสนอราคา</h5>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <div class="table-upload-btn">
            <router-link to="/Quotations/CreateQuotation">
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
                Create Quotation
              </a-button>
            </router-link>
          </div>
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
        <a>{{ qID }}</a>
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
                    @click="rescindingquo(quotationID)"
                  >
                    RESCINDING
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
        const response = await axios.get("http://localhost:5000/quotation");
        this.quotation = response.data;
        console.log(this.quotation);
      } catch (err) {
        console.log(err);
      }
    },
	rescindingquo(id) {
      console.log(id);
      if (window.confirm("คุณต้องการจะลบลูกค้าคนนี้ใช่หรือไม่ ?")) {
        axios.put(`http://localhost:5000/quotation/${id}`,{
			quostatus:'Rescinding',
	  });
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