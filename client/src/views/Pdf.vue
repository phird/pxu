<template>
  <div id="app">
    <div @click="generatePDF()" class="np-btn">Generate PDF</div>

    <vue-html2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="800"
      filename="nightprogrammerpdf"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      :pdf-margin="5"
      pdf-orientation="portrait"
      pdf-content-width="100%"

      @progress="onProgress($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">

        <div class="paper" width="20px">
          <div class="paperForm">
            <div class="header">
              <div class="comAdd detail">
                <div class="comadd-box">
                  <div class="comaddress">
                    <table>
                      <tr v-for="item in items" :key="item.product_id">
                        <td>{{ item.product_name }}</td>
                        <td>{{ item.product_price }}</td>
                      </tr>
                    </table>
                    <div class="comAddr">
                      <p>
                        หจก.อินฟินิตี้ ฟีโนมีนอล ซอฟท์แวร์ (Infinity Phenomenal
                        Software) <br />
                        ที่อยู่ 633/144 หมู่บ้านกาญจน์กนกทาวน์โฮม4 ต.หนองจ๊อม<br />
                        อ.สันทราย จ.เชียงใหม่ 50210 , เบอร์มือถือ
                        061-809-6661<br />
                        เลขผู้เสียภาษี : 0503561005794<br />
                        อีเมล์ : infinityp.soft@gmail.com
                      </p>
                    </div>
                    <div class="CusAddr">
                      <p>
                        ลูกค้า วิสาหกิจชุมชนเกษตรผสมผสานสู่การแปรรูปเชิงนวัตกรรม
                        (ข้าวน้ำจำ) <br />
                        โทร 090-973-2379 (นางสาวธัญลักษณ์ ปิงเมือง)
                      </p>
                    </div>
                  </div>
                </div>
                <div class="detail-com-box">
                  <div class="QuotationText">
                    <h5>ใบเสนอราคา</h5>
                  </div>
                  <div class="detail-com">
                    <div class="separator"></div>
                    <p>
                      เลขที่ F00319<br />
                      วันที่ 15/12/2563<br />
                      ผู้ขาย นายมิกิ อาษาวงค์<br />
                      เบอร์ 0618096661
                    </p>
                    <div class="separator"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="body-modal">
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
            </div>
            <div class="sum">
              <div class="left-sum">
                <p>######### might be text input here #######</p>
              </div>
              <div class="right-sum">
                <tbody>
                  <tr class="total-cost">
                    <td>รวมเป็นเงิน</td>
                    <td>-</td>
                    <td>บาท</td>
                  </tr>
                  <tr class="vat7per">
                    <td>ภาษี7%</td>
                    <td>-</td>
                    <td>บาท</td>
                  </tr>
                  <tr class="tax3per">
                    <td>หัก ฌ ที่จ่าย something%</td>
                    <td>-</td>
                    <td>บาท</td>
                  </tr>
                  <tr class="final-cost">
                    <td>จำนวนเงินรวมทั้งสิ้น</td>
                    <td>-</td>
                    <td>บาท</td>
                  </tr>
                </tbody>
                <div class="separator"></div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="modal-footer-left">
                <p>หมายเหตุ ################</p>
              </div>
              <div class="modal-footer-right">
                <p>
       
                </p>
              </div>
            </div>
            <div class="sign">
              <div class="customer-sign">
                <div class="customer-sign-name">
                  <p>ในนาม .........................</p>
                </div>
              </div>
              <div class="company-sign">
                <div class="company-sign-name">
                  <p>ในนาม .........................</p>
                </div>
              </div>
            <div>
              sfdfewfewww
            </div>
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
.np-btn {
  padding: 2px 8px;
  margin: 12px 8px;
  border: 1px solid #da1010;
  width: 110px;
  background: #da1010;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
}
.paper {
    margin-top: 5%;
    margin-left: 0;
    margin-right: 0;
    align-items: center;
    justify-content: center;
    font-family: 'Sarabun', sans-serif;
    width: 100px;
    height: 100px;
    font-size: 10px;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    background-size: 70%;
}

.paperForm {
    width: 100px;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.separator {
    background-color: black;
    height: 3px;
    width: 100px;
    border-radius: 3px;
    margin: 16px 0px;
}

/* .Com-Logo,.Quotation {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
} */

/* .Logocom {
    margin-top: 3%;
    margin-left: 3%;
} */

.body-modal {
    width: 100%;
}

.body-modal .table{
    margin-left: 10%;
    margin-right: 10%;
}

.QuotationText {
    /* margin-right: 3%; */
    margin-top: 5%;
}

.Com-Logo h3 {
    flex: 1;
    top: auto;

}

.comAdd{
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.comadd-box{
    margin-left: 3%;
}

.comAdd .comaddress{
    width: 100px;
    font-family: 'Sarabun', sans-serif;
    /* width: 40%; */
    font-size: 16px;
    /* background-color: bisque; */
    display: flex;
    flex-direction: column;
}
.comadd-box{
    width: 50px;
}
.detail-com-box{
    text-align: left;
    width: 50px;
}

.body-section{
    width: 100px;
    font-family: 'Sarabun', sans-serif;
    /* width: 40%; */
    font-size: 16px;
}

.comAdd .detail-com {
    width:50px;
    font-family: 'Sarabun', sans-serif;
    /* width: 40%; */
    font-size: 16px;
    /* background-color: burlywood; */
    
}

.QuotationText {
    
    margin-top: 5%;
    font-size: 24px;
    font-weight: bold;
    margin-right: 3%;
}


.header {
    display: flex;
    width: 100px;
    flex-direction: column;
}

.paperForm .body {
    width: 100px;
}

.body-section {
    width: 80px;
}

.paperForm .sum {
    /* background-color: aquamarine; */
    width: 100px;
    flex-direction: row;
}

.paperForm .sign {
    /* background-color: coral; */
    width: 100px;
    display: flex;
    flex: row;
    margin-top: 5%;
    justify-content: space-around;
    text-align: center;
}

.sign-box{
    pointer-events: none;
    border-top: none;
    border-left: none;
    border-right: none;
}
.paperForm .modal-footer {
    /* background-color:blueviolet; */
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}




.sum {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.sum .left-sum{
    width: 50%;
}
.sum .right-sum{
    
    text-align: right;
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
