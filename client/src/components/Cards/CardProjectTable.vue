<template>
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
    style="font-family: 'Mitr', sans-serif"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0">Projects Table</h5>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-radio-group v-model="projectHeaderBtns" size="small">
            <a-radio-button value="all">ALL</a-radio-button>
            <a-radio-button value="On-Going">On-Going</a-radio-button>
            <a-radio-button value="Done">Done</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
    </template>

    <a-table v-if="projectHeaderBtns=='all'" :columns="columns" :data-source="quotationall" :pagination="true">
      <template slot="qName" slot-scope="qName">
        <div class="table-avatar-info">
          <div class="avatar-info">
           <a> {{ qName }}</a>
          </div>
        </div>
      </template>
      <template slot="status" slot-scope="status">
        <a-tag
          class="tag-status"
          :class="status ? 'ant-tag-primary' : 'ant-tag-muted'"
        >
          {{ status ? "On-Going" : "Done" }}
        </a-tag>
      </template>

      <template slot="val" slot-scope="val">
        <div class="val-info">
          <h6 class="m-0">{{ val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  }}</h6>
        </div>
      </template>
    </a-table>
     <a-table v-if="projectHeaderBtns=='On-Going'" :columns="columns" :data-source="quotationongoing" :pagination="true">
      <template slot="qName" slot-scope="qName">
        <div class="table-avatar-info">
          <div class="avatar-info">
           <a> {{ qName }}</a>
          </div>
        </div>
      </template>
      <template slot="status" slot-scope="status">
        <a-tag
          class="tag-status"
          :class="status ? 'ant-tag-primary' : 'ant-tag-muted'"
        >
          {{ status ? "On-Going" : "Done" }}
        </a-tag>
      </template>

      <template slot="val" slot-scope="val">
        <div class="val-info">
          <h6 class="m-0">{{ val }}</h6>
        </div>
      </template>
    </a-table>
     <a-table v-if="projectHeaderBtns=='Done'" :columns="columns" :data-source="quotationdone" :pagination="true">
      <template slot="qName" slot-scope="qName">
        <div class="table-avatar-info">
          <div class="avatar-info">
           <a> {{ qName }}</a>
          </div>
        </div>
      </template>
      <template slot="status" slot-scope="status">
        <a-tag
          class="tag-status"
          :class="status ? 'ant-tag-primary' : 'ant-tag-muted'"
        >
          {{ status ? "On-Going" : "Done" }}
        </a-tag>
      </template>

      <template slot="val" slot-scope="val">
        <div class="val-info">
          <h6 class="m-0">{{ val }}</h6>
        </div>
      </template>
    </a-table>
  </a-card>
</template>



<script>
import axios from 'axios';
const columns = [
        {
          title: "PROJECT NAME",
          dataIndex: "quotationName",
          scopedSlots: { customRender: "qName" },
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
];
export default {
  data() {
    return {
      quotationall: [],
      quotationdone: [],
      quotationongoing: [],
      columns,
	  projectHeaderBtns: 'all',
    };
  },
  created() {
    this.getquotationall();
    this.getquotationongoing();
    this.getquotationdone();
  },
  methods: {
    async getquotationall() {
      console.log("get-quo");
      try {
        const response = await axios.get("http://128.199.187.173:3000/quotation");
        this.quotationall = response.data;
        console.log(this.quotationall);
      } catch (err) {
        console.log(err);
      }
    },
    async getquotationongoing() {
      console.log("get-quo");
      try {
        const response = await axios.get("http://128.199.187.173:3000/quotation/ongoing");
        this.quotationongoing = response.data;
        console.log(this.quotationongoing);
      } catch (err) {
        console.log(err);
      }
    },
    async getquotationdone() {
      console.log("get-quo");
      try {
        const response = await axios.get("http://128.199.187.173:3000/quotation/done");
        this.quotationdone = response.data;
        console.log(this.quotationdone);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>