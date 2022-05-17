<template>
  <div id="createPDF" class="pdf-creation">
    <div @click="generatePDF()" class="np-btn">Generate PDF</div>

    <vue-html2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="800"
      filename="quotation"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      :pdf-margin="5"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content" class="section-pdf">
        <div class="paper-form">
          <div class="header-section">
            <div class="header-left-section">
              <div class="logo-section"></div>
              <div class="company-detail">
                หจก.อินฟินิตี้ ฟีโนมีนอล ซอฟท์แวร์ <br />
                (Infinity Phenomenal Software) <br />
                ที่อยู่ 633/144 หมู่บ้านกาญจน์กนกทาวน์โฮม4 ต.หนองจ๊อม อ.สันทราย
                จ.เชียงใหม่ 50210 <br />
                เบอร์โทร 052-005-509, เลขผู้เสียภาษี : 0503561005794 <br />
                อีเมล์ : infinityp.soft@gmail.com
              </div>
              <div class="customer-detail">
                ลูกค้า บริษัท ชิปโปรมาโคร จำกัด <br />
                ที่อยู่ 226/1 หมู่ 2 ต.สันผักหวาน อ.หางดง จ.เชียงใหม่ <br />
                เลขทะเบียนนิติบุคคล 0605558001296 <br />
              </div>
            </div>

            <div class="header-right-section">
              <div class="paper-title">
                <span> ใบเสนอราคา </span>
              </div>

              <div class="contact-company-section">
                <div class="separator"></div>
                <span> เลขที่ QA65-01-004 </span>
                <span> วันที่ 26/01/2565 </span>
                <span> ผู้ขาย นายมิกิ อาษาวงค์ </span>
                <span> เบอร์ 0618096661 </span>
                <div class="separator"></div>
              </div>
            </div>
          </div>
          <div class="body-section">
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
                  <td>ค่าพัฒนาระบบ</td>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>ค่าอุปกรณ์</td>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="payment-section">
            <div class="payment-left-section">
              <span> ################ note ###############</span>
            </div>

            <div class="payment-right-section-box">
              <div class="payment-right-section">
                <div class="payment-right-section-detail">
                  <span>ราคาก่อนภาษี </span>
                  <span>ภาษี 7 % </span>
                  <span>ราคารวมภาษีมูลค่าเพิ่ม 7 % </span>
                  <span>หัก ณ ที่จ่าย 3 %</span>
                  <span>รวมเงินสุทธิ </span>
                </div>
                <div class="payment-right-section-detail-price">
                  <span>1,588,785.05 บาท</span>
                  <span>111,214.95 บาท</span>
                  <span>1,700,000 บาท</span>
                  <span>47,663.55 บาท</span>
                  <span>1,652,336.45 บาท</span>
                </div>
              </div>
              <div
                class="separator"
                style="
                  width: 70%;
                  text-align: center;
                  margin-left: auto;
                  margin-right: auto;
                "
              ></div>
            </div>
          </div>
          <div class="footer-section">
            <div class="footer-left-section">
              <div class="title-footer">
                <span> ในนามของ .... </span>
              </div>
              <div class="sign-box"></div>
              <div class="who-sign"><span>ผู้ว่าจ้าง</span></div>
              <div class="date-sign"><span>17/05/2022</span></div>
            </div>
            <div class="footer-right-section">
              <div class="title-footer">
                <span> ในนามของ ... </span>
              </div>
              <div class="sign-box"></div>
              <div class="who-sign"><span>ผู้อนุมัติ</span></div>
              <div class="date-sign"><span>17/05/2022</span></div>
            </div>
          </div>
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "App",

  methods: {
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    hasGenerated() {
      alert("PDF generated successfully!");
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
  components: {
    VueHtml2pdf,
  },
};
</script>

<style scoped>
.pdf-creation {
  font-family: "Mitr", sans-serif;
  width: 100%;
  height: 100vh;
  padding: 2em;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  margin-bottom: 2em;
}
.np-btn {
  width: 140px;
  background-color: red;
  border-radius: 14px;
  cursor: pointer;
  align-items: center;
}
.paper-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1em;
}

/* here is  header section 30%*/
.header-section {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30%;
}

.header-left-section {
  display: flex;
  flex-direction: column;
  /*  background-color: red; */
  width: 50%;
  padding: 0 0em 0 4em;
  gap: 1em;
}

.header-right-section {
  display: flex;
  flex-direction: column;
  padding: 0 4em;
  text-align: center;
  /* background-color: yellow; */
  width: 50%;
}
.paper-title {
  font-size: 24px;
  font-weight: 500;
}
.contact-company-section {
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-left: auto;
  margin-right: auto;
}

/* here is body section   30%*/
.body-section {
  display: flex;
  /*  background-color: blue; */
  height: 30%;
  padding: 2em;
}

/* here is payment section  20%*/
.payment-section {
  display: flex;
  flex-direction: row;
  /*  background-color: green; */
  height: 20%;
}
.payment-left-section {
  width: 50%;
  text-align: center;
}
.payment-right-section-box {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.payment-right-section {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 1em 0 1em;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.payment-right-section-detail {
  display: flex;
  flex-direction: column;
}
.payment-right-section-detail-price {
  display: flex;
  flex-direction: column;
  text-align: end;
}

/*  here is footer section 20% */
.footer-section {
  display: flex;
  flex-direction: row;
  padding: 2em;
  /*  background-color: purple; */
  height: 20%;
}

.footer-left-section {
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: center;
  justify-content: center;
}
.sign-box {
  display: flex;
  width: 100px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.356);
}

.footer-right-section {
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: center;
  justify-content: center;
}

.separator {
  background-color: black;
  height: 3px;
  width: 100px;
  border-radius: 3px;
  margin: 16px 0px;
}
/* this for export file */
.exportToPDF {
  display: flex;
  flex-direction: column;
}

.exportToPDF .Exbutton {
  margin-left: 80%;
}
</style>
