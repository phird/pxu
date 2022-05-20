<template>
  <div>
    <div class="date-section hbox">
      <span>วันที่ </span>
      <span
        ><date-picker v-model="daterec" valueType="format"></date-picker>
      </span>
    </div>
    <div
      v-if="tempimgslip != imgslip"
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage"
    ></div>
    <div v-else>
      <img
        :src="`http://localhost:5000/slip/${imgslip}`"
        alt=""
        class="imagePreviewWrapper"
      />
    </div>

    <input ref="fileInput" type="file" @input="pickFile" />
    <button @click="submit" style="color:red">submit</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      previewImage: null,
      daterec: "",
      fileimg: [],
      imgslip: "",
      tempimgslip: "",
      inID: "",
    };
  },
  created() {
    this.inID = this.$route.params.id;
    this.getimg(this.inID);
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append("files", this.fileimg);
      axios.post("http://localhost:5000/uploadslip", formData, {});
      axios
        .post(`http://localhost:5000/invoice/re/${this.inID}`, {
          imgslip: this.imgslip,
          daterec: this.daterec,
        })
        .then(()=>{
            alert("บันทึกข้อมูลสำเร็จ");
            history.back();
        });
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        console.log(file[0]);
        this.fileimg = file[0];
        this.imgslip = this.fileimg.name;
        this.$emit("input", file[0]);
      }
    },
    async getimg(id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/invoice/re/${id}`
        );
        this.daterec = response.data[0].datereceipt;
        this.imgslip = response.data[0].imgslip;
        this.tempimgslip = response.data[0].imgslip;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>