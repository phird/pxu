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
              <a-tooltip>
                <template slot="title"> สร้างใบเสนอราคา </template>
                <a-button type="primary" style="color: white">
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
                  <span> สร้างใบเสนอราคา </span>
                </a-button>
              </a-tooltip>
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
        <a>QA{{ qID }}</a>
      </template>
      <template slot="qName" slot-scope="qName">
        <a> {{ qName }}</a>
      </template>
      <template slot="status" slot-scope="status">
        <a-tooltip>
          <template slot="title"> สถานะทำสัญญาแล้ว </template>
          <a v-if="status == 'Contracted'" class="contracted-label">{{
            status
          }}</a>
        </a-tooltip>
        <a-tooltip>
          <template slot="title"> สถานะกำลังเจรจา </template>
          <a v-if="status == 'Negotiation'" class="negotiation-label">{{
            status
          }}</a></a-tooltip
        >
      </template>
      <template slot="statusw" slot-scope="statusw">
        <a-tooltip>
          <template slot="title"> สถานะโปรเจคเสร็จสิ้น </template>
          <a v-if="statusw == 'Done'" class="done-status">{{ statusw }}</a>
        </a-tooltip>
        <a-tooltip>
          <template slot="title"> สถานะกำลังดำเนินการ </template>
          <a v-if="statusw == 'On-Going'" class="ongoing-status">{{
            statusw
          }}</a></a-tooltip
        >
      </template>
      <template slot="val" slot-scope="val">
        <a>{{ val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}</a>
      </template>
      <template slot="act-1" slot-scope="row">
        <a-menu-item v-if="row.statusquotation == 'Contracted'">
          <router-link
            :to="`/Invoice/${row.quotationID}`"
            style="text-decoration: none"
          >
            <a-tooltip>
              <template slot="title"> เปิดดูใบวางบิล </template>
              <a style="text-decoration: none">ใบวางบิล</a>
            </a-tooltip>
          </router-link>
        </a-menu-item>
      </template>
      <template slot="act" slot-scope="quoID">
        <router-link
          :to="`/createPDFquotation/${quoID.quotationID}`"
          target="_blank"
          style="text-decoration: none"
        >
          <a-tooltip>
            <template slot="title"> PDF ของใบเสนอราคา </template>
            <b-icon
              icon="file-earmark-pdf"
              style="
                width: 20px;
                height: 20px;
                margin: 0px 0.7em 0px 0.5em;
                color: red;
              "
            >
            </b-icon>
          </a-tooltip>
        </router-link>
        <router-link
          :to="`/Quotations/CreateScope/${quoID.quotationID}`"
          target="_blank"
          style="text-decoration: none"
        >
          <a-tooltip>
            <template slot="title"> PDF ของรายละเอียดเพิ่มเติม </template>
            <b-icon
              icon="file-earmark-pdf"
              style="width: 20px; height: 20px; margin: 0px 0.7em 0px 0.5em"
            >
            </b-icon>
          </a-tooltip>
        </router-link>
        <a-dropdown>
          <a
            class="ant-dropdown-link"
            @click="(e) => e.preventDefault()"
            style="width: 20px; height: 20px"
          >
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
                v-if="quoID.statusquotation == 'Negotiation'"
                :to="`/Quotations/Editquotation/${quoID.quotationID}`"
                style="text-decoration: none"
              >
                <a style="text-decoration: none">แก้ไข</a>
              </router-link>
            </a-menu-item>
            <a-menu-item v-if="quoID.statusquotation == 'Negotiation'">
              <a
                style="text-decoration: none"
                @click="contractedquo(quoID.quotationID)"
              >
                ทำสัญญาแล้ว
              </a>
            </a-menu-item>
            <a-menu-item>
              <a
                style="text-decoration: none"
                @click="rescindingquo(quoID.quotationID)"
              >
                ยกเลิกสัญญา
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

export default {
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          title: "#",
          dataIndex: "quotationID",
          scopedSlots: { customRender: "qID" },
        },
        {
          title: "ชื่อโปรเจค",
          dataIndex: "quotationName",
          scopedSlots: { customRender: "qName" },
        },
        {
          title: "สภานะการเจรจา",
          dataIndex: "statusquotation",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "สถานะของงาน",
          dataIndex: "statuswork",
          scopedSlots: { customRender: "statusw" },
        },
        {
          title: "มูลค่าโปรเจค",
          dataIndex: "paymentPrice",
          scopedSlots: { customRender: "val" },
        },
        {
          title: " ",
          scopedSlots: { customRender: "act-1" },
        },
        {
          title: " ",

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
      contract: "",
    };
  },
  created() {
    this.getquotation();
  },

  methods: {
    createpdf(id) {
      console.log("im gonna create pdf");
    },
    async getquotation() {
      console.log("get-quo");
      try {
        const response = await axios.get(
          "https://pxu-server.herokuapp.com/quotation"
        );
        this.quotation = response.data;
        console.log(this.quotation);
      } catch (err) {
        console.log(err);
      }
    },
    rescindingquo(id) {
      console.log(id);
      if (window.confirm("คุณต้องการจะลบลูกค้าคนนี้ใช่หรือไม่ ?")) {
        axios.put(`https://pxu-server.herokuapp.com/quotation/${id}`, {
          quostatus: "Rescinding",
        });
        window.location.reload(false);
      }
    },
    contractedquo(id) {
      console.log(id);
      axios.put(`https://pxu-server.herokuapp.com/quotation/${id}`, {
        quostatus: "Contracted",
      });
      this.isContracted = true;
      window.location.reload(false);
    },
  },
};
</script>


<style scoped>
.quotation-table >>> .ant-table-column-title{
  font-size: 18px !important;
  font-weight: 400;
}
.header-solid {
  font-family: "Mitr", sans-serif;
  padding: 2em;
}
.ant-card-body {
  padding: 2em;
}

.negotiation-label {
  display: flex;
  width: 100px;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  background-color: rgba(250, 149, 149, 0.644);
  border-radius: 8px;
  padding: 0.3em;
  color: black;
}

.contracted-label {
  display: flex;
  width: 100px;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  background-color: rgba(168, 235, 168, 0.644);
  border-radius: 8px;
  padding: 0.3em;
  color: black;
}

.done-status {
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

.ongoing-status {
  display: flex;
  width: 100px;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  background-color: rgba(133, 134, 133, 0.103);
  border-radius: 8px;
  padding: 0.3em;
  color: black;
}

.quotation-table .ant-table-wrapper {
  padding: 2em;
}
#app >>> .layout-dashboard .ant-layout-content {
  margin-bottom: 2em !important;
}
</style>