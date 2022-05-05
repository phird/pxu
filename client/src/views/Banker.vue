
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
  <createbank/>
</template>

<script>
import createbank from './Createbank.vue'
export default {
components:{
  createbank
}
}
</script>

<style>

</style>
