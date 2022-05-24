<template>
  <div class="whole-site">
    <a-alert v-if="nerror" message="โปรดใส่ข้อมูลให้ครบถ้วน" type="error" show-icon />
     <a-alert v-if="success" message="บันทึกข้อมูลสำเร็จ" type="success" show-icon />
    <div class="header-site">
      <b-icon icon="chevron-left" @click="backward"> </b-icon>
    </div>
    <div class="body-section">
      <div class="previewimg-section">
        <div
          v-if="tempimgslip != imgslip"
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${previewImage})` }"
          @click="selectImage"
        >
          <b-icon icon="card-image" style="color: black"> </b-icon>
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
          ><date-picker
            v-model="daterec"
            valueType="format"
            :format="thFormat"
          ></date-picker>
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
import moment from "moment";
export default {
  data() {
    return {
      thFormat: {
        stringify: (date) => {
          return date
            ? moment(date).add(543, "year").format("YYYY-MM-DD")
            : null;
        },
        parse: (daterec) => {
          return daterec
            ? moment(daterec, "YYYY-MM-DD").subtract(543, "year").toDate()
            : null;
        },
      },
      previewImage: "../../public/images/istockphoto-1147544806-170667a.jpg",
      daterec: "",
      fileimg: [],
      imgslip: "",
      tempimgslip: "",
      inID: "",
      success:false,
      nerror:false,
    };
  },
  created() {
    this.inID = this.$route.params.id;
    this.getimg(this.inID);
  },
  methods: {
    backward() {
      history.back();
    },
    submit() {
      if(this.imgslip=='' || this.daterec==''){
        this.nerror=true;
      }else{
        let formData = new FormData();
      formData.append("files", this.fileimg);
      axios.post("http://localhost:5000/uploadslip", formData, {});
      axios.post(`http://localhost:5000/invoice/re/changestatus/${this.inID}`);
      axios
        .post(`http://localhost:5000/invoice/re/${this.inID}`, {
          imgslip: this.imgslip,
          daterec: this.daterec,
        })
        .then(() => {
          this.success = true;
            setTimeout(() => {
              this.$router.back();
            }, 2500);
        });
        }
      
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
        this.daterec = moment(String(response.data[0].datereceipt)).format(
          "YYYY-MM-DD"
        );
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
.header-site {
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