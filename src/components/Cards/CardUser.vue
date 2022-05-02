<template>
  <div class="card-profile">
            <!---  Profile section -->
            <div class="profile-image-wrapper">
                <img
                    class="profile-pic"
                    src="../../../src/assets/images/avatars/1-small.png"
                    alt="avatar"
                    style="border-radius: 50%; border: 2px solid white"
                />
            </div>
            <!---/Profile section -->
            <div class="card-profile-section">
                <!---  Profile-Banner section -->
                <div class="profile-banner">
                    <img
                        src="../../assets/images/banner/banner-17.jpg"
                        alt="Profile Cover Photo"
                    />
                </div>
                <!--- /Profile-Banner section -->
                <!---  Profile-detail section -->
                <div class="card-body">
                    <div class="content-card-body">
                        <p class="username">Mr Seller</p>
                        <p class="email-text">dangisDev@mail.com</p>
                    </div>
                </div>
                <!---/Profile-detail section -->
            </div>
            
    </div>
</template>

<script>
export default {};
</script>

<style>

.card-profile {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
}
.card-profile-section{

  display: flex;
  flex-direction: column;
}
.card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.card-body .content-card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}

.profile-banner {
    display: flex;
    height: 100%;
}

.profile-banner img {
    /* max-height: 100%; */
    max-width: 100%;
    object-fit: cover;
}

.profile-image-wrapper {
    display: flex;
    position: absolute;
    border-radius: 50%;
    z-index: 1;
    object-fit: cover;
    /* left: 50%; */
    top: 70%;
    left: 35%;
}

@media only screen and (max-width: 991px) {
  .card-profile{
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .profile-image-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 50%;
    z-index: 5;
    left: 5%;
  }
  .profile-banner{
    display: flex;
  }
  .card-body{
    display: flex;
  }
  .content-card-body .username{
    font-size: 18px;
    font-weight: bolder;
  }
  .content-card-body .email-text{
    font-size: 14px;
    font-weight: 500;
    opacity: 60%;
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
  word-wrap: break-word;
}
</style>