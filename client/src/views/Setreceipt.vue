<template>
  <div class="whole-site">
    <div class="header-site">
      <router-link
        :to="`/quotations`"
        style="text-decoration: none; color: black"
      >
        <b-icon icon="chevron-left"> </b-icon>
      </router-link>
    </div>
    <div class="body-section">
      <div class="previewimg-section">
        <div
          v-if="tempimgslip != imgslip"
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${previewImage})` }"
          @click="selectImage"
        >
          <b-icon icon="card-image" style="color: black; z-index: 10"> </b-icon>
        </div>
        <div v-else>
          <img
            :src="`http://localhost:5000/slip/${imgslip}`"
            alt=""
            class="imagePreviewWrapper"
          />
        </div>
      </div>

      <div class="date-section">
        <span>วันที่ </span>
        <span
          ><date-picker v-model="daterec" valueType="format"></date-picker>
        </span>
      </div>

      <div class="uploadFile-section">
        <div class="upload-slip">
          <input ref="fileInput" type="file" @input="pickFile" />
        </div>
        <button @click="submit" class="btn btn-outline-success confirm-slip">
          แนบสลิป
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      previewImage: "../../public/images/istockphoto-1147544806-170667a.jpg",
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
        .then(() => {
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
.whole-site {
  display: flex;
  flex-direction: column;
  font-family: "Mitr", sans-serif;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background-color: white;
  padding: 4em;
  margin-bottom: 2em;
  -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}
.header-site{
  display: flex;
}
.body-section {
  display: flex;
  width: 80%;
  flex-direction: column;
}

.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-color: rgb(211, 208, 208);
  background-position: center center;
}

.date-section {
  width: 50%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.uploadFile-section {
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
}

.upload-slip {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: 2em;
}

.upload-slip input {
  max-width: 220px;
}

.confirm-slip {
  display: flex;
  max-width: 220px;
  text-align: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
</style>