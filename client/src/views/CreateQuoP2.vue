<template>
  <div class="whole-page">
    <div class="customer-section">
      <div class="content">
        <div class="section-title">
          <span>ส่วนของผู้ว่าจ้าง</span>
        </div>
        <div class="centent-section">
          <div class="boxs">
            <div class="cusname">...</div>
            <div class="sign-box">
              <div class="sign"></div>
              <label>ผู้ว่าจ้าง</label>
            </div>
            <div class="date_here">
              {{dateq}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="company-section">
      <div class="content">
        <div class="section-title">
          <span>ส่วนของผู้จัดทำ</span>
        </div>

        <div class="centent-section content-three">
          <!-- left -->
          <a-col :span="8"></a-col>

          <!-- middle -->
          <a-col :span="8">
            <div class="boxs">
              <div class="employName">
                <span style="opacity: 60%; font-size: 14px">ในนามของ</span>
                ...
              </div>
              <div class="sign-box">
                <div class="sign">
                  <template v-if="preview && estatus">
                    <img :src="preview" class="img-fluid" />
                  </template>
                  <template v-if="!preview && estatus">
                    <img src="http://128.199.187.173:3000/esignature/esignature.png" class="img-fluid" />
                  </template>
                  <template v-else>
                    <div></div>
                  </template>
                </div>
                <label>ผู้อนุมัติ</label>
              </div>
              <div class="date_here">
                {{dateq}}
              </div>
            </div>
          </a-col>

          <!-- right -->
          <a-col :span="8">
            <div class="boxs-1">
              <div class="radio-selected">

           </div> 
            </div>
          </a-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props:["dateq","estatus"],
  data() {
    return {
      time1: "",
      time2: "",
      preview: null,
      file:[],
      image: null,
    };
  },
  methods: {
    addtext() {
      let mytext = this.estatus;
      this.$emit("update-status", mytext);
    },
    previewImage(e) {
      var input = e.target;
      this.file = e.target.files[0];
      let formData = new FormData();
      formData.append("files", this.file);
      axios.post("http://128.199.187.173:3000/uploadesignature", formData, {});
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    resetImage(e) {
      if (this.estatus == false) {
        this.image = null;
        this.preview = null;
      }
    },
  },
};
</script>

<style scoped>
.whole-page {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 2em;
  display: flex;
  flex-direction: column;
}
.customer-section {
  height: 50%;
}
.section-title {
  text-align: end;
  font-size: 22px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.404);
}
.company-section {
  height: 50%;
}

.content-three {
  display: flex;
  flex-direction: row;
}

/* customer section  */
.content-section {
  display: flex;
  width: 100%;
  height: 100%;
}
.content-three {
  display: flex;
  width: 100%;
  height: 100%;
}
.boxs {
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  text-align: center;
}
.boxs-1 {
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  text-align: center;
}
.sign-box {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  gap: 10px;
  font-size: 14px;
}
.sign {
  display: flex;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid black;
}
.upload-sign {
  background-color: #eeeeee;
  width: 120px;
  height: 120px;
  justify-content: center;
  text-align: center;
}
</style>