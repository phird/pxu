
  <!-- <div>
    <mdb-btn color="primary" @click.native="modal = true">Small modal</mdb-btn>
    <mdb-modal size="sm" :show="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title>Modal title</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <createbank/>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="modal = false">Close</mdb-btn>
        <mdb-btn color="primary" size="sm">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div> -->

<template>
<div>
<div>
</div>
  <createbank/>
</div>
</template>

<script>
import axios from 'axios';
import createbank from './Createbank.vue'
export default {
  data(){
    return{
      bank:[],
    };
  },
components:{
  createbank
},
created(){
this.getbank();
},
methods:{
  		async getbank() {
      console.log("get-bank");
      try {
        const response = await axios.get("http://localhost:5000/bank");
        this.bank = response.data;
        console.log(this.bank);
      } catch (err) {
        console.log(err);
      }
    },
},
}
</script>

<style>

</style>
