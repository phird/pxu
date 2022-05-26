<template>
  <div class="card-profile">
    <!---  Profile section -->
    <!---/Profile section -->
    <div class="card-profile-section">
      <!---  Profile-Banner section -->
      <div class="profile-banner">
        <img
          src="../../assets/images/banner/banner-17.jpg"
          alt="Profile Cover Photo"
          style=""
        />
      </div>
      <!--- /Profile-Banner section -->
      <!---  Profile-detail section -->
      <div class="card-body">
        <!-- card body section -->
        <!-- 1 -->

        <div class="content-card-body">
          <div class="content-box">
            <div id="username">
              <span style="font-size: 20px">{{ em.employeeName }}</span>
            </div>
            <div id="email">
              <span
                class="email-text"
                style="font-size: 16px; font-weight: 300"
                >{{ em.employeeEmail }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!--/card body section -->
      <!---/Profile-detail section -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      em: [],
    };
  },
  created() {
    this.getem();
  },
  methods: {
    getem() {
      axios.get("https://pxu-server.herokuapp.com/carddash", {}).then((res) => {
        this.em = res.data[0];
      });
    },
  },
};
</script>

<style scoped>
.card-profile {
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
  flex-shrink: 1;
  flex-direction: column;
  font-size: 24px;
  justify-content: center;
  align-items: center;
}
.card-body .content-card-body {
  /*  div in text-section   */
  display: flex;
  width: 100%;
  flex-direction: column;
}

.content-card-body span {
  /*  div in text-section   */
  display: flex;
  flex-shrink: 1;
}
.content-card-body .content-box {
  width: 100%;
  flex-direction: column;
  word-wrap: break-word;
  overflow: auto;
}

.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

/* ipad thing */
@media only screen and (max-width: 1260px) {
  .content-box {
    /*  whole text-section   */
    display: flex;
    flex-direction: column;
    font-size: 18px !important;
    justify-content: center;
  }
}

/* mobile screen */
@media only screen and (max-width: 991px) {
  .card-profile {
    /* whole  card */
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .card-profile .profile-image-wrapper {
    /*  floating profile-section  */
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    margin: 0 auto;
    z-index: 5;
    top: 45%;
    left: 5%;
  }
  .profile-image-wrapper img {
    /*  floating profile-section  */
    height: 20vw;
    width: 20vw;
  }
  .profile-banner {
    display: flex;
  }

  .card-body {
    display: flex;
  }
  .card-body .content-card-body {
    align-content: center;
    width: auto;
    display: flex;
  }
  .content-card-body .username {
    display: flex;
    font-size: 18px;
  }
  .content-card-body .email-text {
    font-size: 14px;
    font-weight: 500;
    opacity: 60%;
  }
}
.card-profile {
  border: none;
  margin-bottom: 2rem;
  background-color: white;
  -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}
.card-profile {
  -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
    border-color 0s;
  transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
}
.card-profile {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
}
</style>