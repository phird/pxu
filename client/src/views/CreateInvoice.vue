<template>
  <div class="whole-site">
    <!-- left layout start here -->
    <div class="left-layout">
      <div class="l-container">
        <div class="header">
          <div class="header-top">
            <div class="ht-left">
              <img src="../assets/logo.jpg" alt="" style="width: 140px" />
            </div>
            <div class="ht-right">
              <p style="font-size: 20px">ใบวางบิล</p>
            </div>
          </div>
          <div class="header-mid">
            <div class="company-detail">
              <span
                >หจก.อินฟินิตี้ ฟีโนมีนอล ซอฟท์แวร์ (Infinity Phenomenal
                Software)</span
              >
              <span
                >ที่อยู่ 633/144 หมู่บ้านกาญจน์กนกทาวน์โฮม4 ต.หนองจ๊อม
              </span>
              <span
                >อ.สันทราย จ.เชียงใหม่ 50210 , เบอร์มือถือ 061-809-6661</span
              >
              <span>เลขผู้เสียภาษี : 0503561005794 </span>
              <span>อีเมล์ : infinityp.soft@gmail.com</span>
            </div>
            <div class="invoice-detail">
              <div class="id-box">
                <span>เลขที่ DEPA020211130</span>
                <span>วันที่ 01/11/64</span>
                <span>ผู้ขาย นายมิกิ อาษาวงค์</span>
                <span>เบอร์ 0618096661</span>
              </div>
            </div>
          </div>
          <div class="header-bott">
            <div class="customer-section">
              <div class="cs-box">
                <span
                  >ลูกค้า วิสาหกิจชุมชนเกษตรผสมผสานสู่การแปรรูปเชิงนวัตกรรม
                  (ข้าวน้ำจำ)</span
                >
                <span>โทร 090-973-2379 (นางสาวธัญลักษณ์ ปิงเมือง)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="table-container">
            <table class="table">
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">รายละเอียด</th>
                  <th scope="col">จำนวน</th>
                  <th scope="col">ราคาต่อหน่วย</th>
                  <th scope="col">ราคารวม</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Cloud Hosting (เดือนตุลาคม 2564)</td>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="payment-section">
            <div class="ps-left">
              <span>(สามร้อยบาทถ้วน)</span>
            </div>
            <div class="ps-right">
              <div class="ps-right-box">
                <span>รวมเป็นเงิน - บาท</span>
                <span>ภาษี 7% - บาท</span>
                <span>หัก ณ ที่จ่าย 3% - บาท</span>
                <span>จำนวนเงินรวมทั้งสิ้น - บาท</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sign-section">
          <div class="sign-left">
            <span> <b-icon icon="square"></b-icon> โอนผ่านธนาคารกสิกรไทย </span>
            <span> เลขบัญชี 0-5438-7366-7 </span>
            <span> ชื่อบัญชี หจก.อินฟินิตี้ ฟิโนมีนอล ซอฟท์แวร์ </span>
          </div>
          <div class="sign-right">
            <div class="s-container">
              <!-- flex-d => column -->
              <div class="c-stamp">
                <span>
                  <img
                    src="../assets/images/stamp-com.png"
                    alt="company-stamp"
                    style="width: 120px"
                  />
                </span>
                <span> ในนาม หจก.อินฟินิตี้ ฟีโนมีนอล ซอฟท์แวร์</span>
              </div>
              <div class="sign">
                <div class="sign-l">
                    <span style="display:flex">ลงชื่อ <div id="signbox"></div></span>
                    <span> (นายมิกิ อาษาวงค์) </span>
                    <span> ผู้รับเงิน </span>
                </div>
                <div class="sign-r">
                    <span>01/11/2564</span>
                    <span> วันที่ </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- left layout end here -->

    <!-- ================================================================= -->
    <!--  right layout start here -->
    <div class="right-layout">
      <div class="right-layout-panel">
        <div class="container-panel">
          <button type="button" class="btn btn-outline-primary" disabled>
            <!-- <b-icon icon="file-earmark-pdf" style="color: blue; font-size:24px;"></b-icon> -->
            ดาวน์โหลดเป็น PDF
          </button>
          <button type="button" class="btn btn-outline-success">
            <!-- <b-icon icon="save" style="color: green; font-size:24px;"></b-icon> -->
            บันทึก
          </button>
          <button type="button" class="btn btn-outline-danger">
            <!-- <b-icon icon="x-square" style="color: red; font-size:24px;"></b-icon> -->
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
    <!-- RIGHT LAYOUT END HERE -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.whole-site {
  font-family: "Mitr", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.left-layout {
  display: flex;
  width: 70%;
  /* background-color: red; */
}
.right-layout {
  width: 30%;
  /* background-color: tan; */
}
/* right layout */
.right-layout-panel {
  margin-top: 0;
  margin-bottom: auto;
  padding: 40px;
  margin: auto;
  width: 70%;
  border-radius: 14px;
  align-content: center;
  background-color: white;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.container-panel {
  display: flex;
  flex-direction: column;
}
.container-panel button {
  margin: 10px;
}
/* =================
right layout
================= */

/* left layout */

.l-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  align-content: center;
  background-color: white;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  padding: 4em;
  margin-bottom: 2em;
}

.header {
  display: flex;
  flex-direction: column;
}

.header-top {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.ht-left {
  width: 50%;
  display: flex;
}
.ht-right {
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 0;
}

.header-mid {
  display: flex;
  flex-direction: row;
}
.company-detail {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.invoice-detail {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
}
.id-box {
  display: flex;
  flex-direction: column;
}

.header-bott {
  display: flex;
  flex-direction: row;
}
.customer-section {
  display: flex;
  width: 100%;
  margin-top: 2em;
}
.cs-box {
  display: flex;
  flex-direction: column;
}

.body {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.payment-section {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.ps-left {
  display: flex;
  width: 50%;
}

.ps-right {
  display: flex;
  flex-direction: column;
  width: 50%;
  /* align-items: center; */
}

.ps-right-box {
  display: flex;
  flex-direction: column;
  text-align: end;
}

.sign-section {
  margin-top: 3em;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.sign-left {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.sign-right {
  display: flex;
  width: 50%;
  align-items: center;
}
.s-container {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.c-stamp {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.sign {
    display: flex;
    flex-direction: row;
    padding: 2em;
    width: 100%;
}
.sign-l{
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.sign-r{
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: center;
}

#signbox{
    display: flex;
    width: 100%;
    border-bottom: 1px solid black ;
}

/* =================
left layout
================= */
</style>