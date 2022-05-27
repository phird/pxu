<template>
  <div class="card">
    <!---- Query default banner of bank account here ---->
    <div class="card-profile-section">
      <div class="profile-banner">
        <img
          :src="`http://128.199.187.173:3000/bank/${bank.img}`"
          alt="Bank Cover Photo"
        />
      </div>
      <div class="card-body">
        <!-- 1 -->
        <!----Query default bank account here --->
        <div class="content-card-body">
          <div class="bank-name m-0 center">
            <span style="font-size: 24px"> {{ bank.bankName }}</span>
          </div>
        </div>
      </div>
    </div>
    <!----><!---->
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      bank: [],
    };
  },
  created() {
    this.getbank();
  },
  methods: {
    getbank() {
      axios
        .get("http://128.199.187.173:3000/carddash/bank", {})
        .then((res) => {
          this.bank = res.data[0];
          console.log(this.bank);
        });
    },
  },
};
</script>

<style scoped>
.card {
  font-family: "Mitr", sans-serif;
  position: relative;
  height: 252px;
  border-radius: 12px;
}
.card-profile-section {
  /* div that contain banner and text-section */
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.card-profile-section .profile-banner {
  /*  whole banner div*/
  display: flex;
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.profile-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-profile-section .card-body {
  /*  whole text-section   */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  justify-content: center;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
}

.default-bank-text {
  font-size: 6px;
  justify-content: end;
  align-items: center;
  margin-left: auto;
}

.content-card-body {
  font-size: 32px;
}
.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 991px) {
  .card {
    display: flex;
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
  .profile-banner {
    display: flex;
    height: 100%;
  }

  .card-body {
    display: flex;
  }

  .content-card-body {
    align-content: center;
    font-size: 16px;
    margin-right: auto;
    margin-left: auto;
  }
}

.card {
  border: none;
  margin-bottom: 2rem;
  -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}
.card {
  -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
    border-color 0s;
  transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
}
.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
}
</style>>
