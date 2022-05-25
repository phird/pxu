/* ==================================================
 นิติบุคคล
==================================================
 */
<template>
  <div id="app">
    <div
      style="
        display: flex;
        font-size: 40px;
        text-align: center;
        justify-content: center;
      "
    >
      LOADING ....
    </div>
  </div>
</template>

<script>
import pdfMake from "pdfmake";
import pdfFonts from "../../assets/custom-fonts.js"; // 1. import custom fonts
import axios from "axios";
import moment from "moment";
let imgText = "";

export default {
  name: "App",
  data() {
    return {
      g:'',
      inID: "",
      invoice: [],
      invoiceDetail: [],
      invDate:"",
      price: 0,
      totalprice: 0,
      netprice: 0,
      vat7: 0,
      priceAfter7: 0,
      withholding3: 0,
    };
  },
  create() {
    this.inID = this.$route.params.id;
  },
  mounted() {
        this.getBase64FromUrl('https://pxu-server.herokuapp.com/stamp/stamp.png').then(
      function(data){
        /* alert(data) */
        imgText = data;
        /* alert(data) */
      }
    );
    this.export();
  },
  methods: {
      async getBase64FromUrl(url){
      const data = await fetch(url);
      const blob = await data.blob();
      try{
        return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
            reader.onloadend = () => {
              const base64data = reader.result;   
              resolve(base64data);
            }
      });}catch(err){
        console.log(err);
      }
      
    },

    async export() {
      this.inID = this.$route.params.id;
      console.log(this.inID);
      console.log("get-quotation-pdf")
      try{
        console.log("now im trying");
        const response = await axios.get(`https://pxu-server.herokuapp.com/invoice/createInvoicePDF/${this.inID}`);
        const response2 = await axios.get(`https://pxu-server.herokuapp.com/invoice/createInvoicePDF/detail/${this.inID}`)
        console.log(response.data[0]);
        this.invoice = response.data[0];
        this.invoiceDetail = response2.data;
        console.log(this.invoice);
        console.log(this.invoiceDetail);
        this.invDate =  moment(String(this.invoice.dateinvoice)).format(
          "DD/MM/YYYY"
        );


        if (this.invoice.customerstatus == "นิติบุคคล" && this.invoice.vatstatus == "vatนอก") {
          console.log("niti outvat");
          this.price = this.invoice.totalpriceinv;
          this.totalprice = this.price;
          this.vat7 = this.totalprice * 0.07;
          this.priceAfter7 = this.totalprice + this.vat7;
          this.withholding3 = this.price * 0.03;
          this.totalprice = this.priceAfter7 - this.withholding3;

        } else if(this.invoice.customerstatus == "นิติบุคคล" && this.invoice.vatstatus == "vatใน") {
          console.log("niti innervat");
          /* vat ใน */
          this.totalprice = this.invoice.totalpriceinv;
          this.vat7 = this.totalprice-(this.totalprice * 100)/107;
          this.price = this.totalprice - this.vat7;
          this.priceAfter7 = this.totalprice;
          this.withholding3 = this.price * 0.03;
          this.totalprice = this.invoice.priceINV;

        } else if(this.invoice.customerstatus == "บุคคลธรรมดา" &&  this.invoice.vatstatus == "vatนอก"){
          console.log("normal outervat");
          this.price =  this.invoice.totalpriceinv;
          this.totalprice = this.price;
          this.vat7 = this.totalprice * 0.07;
          this.priceAfter7 = this.totalprice + this.vat7;
          this.totalprice = this.priceAfter7 ;
        }else if( this.invoice.customerstatus == "บุคคลธรรมดา" &&  this.invoice.vatstatus == "vatใน") {
          /* vat ใน */
          console.log("niti innervat");
          this.totalprice =  this.invoice.totalpriceinv;
          this.vat7 = this.totalprice-(this.totalprice * 100)/107;
          this.price = this.totalprice - this.vat7;
          this.priceAfter7 = this.totalprice;
          this.totalprice =  this.invoice.priceINV;
        }else{
          alert(" something went wrong ! please check quotation's detail ");
        }

      }catch(err){
        console.log(err);
      }
      
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.fonts = {
        // download default Roboto font from cdnjs.com
        Roboto: {
          normal:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
          bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
          italics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
          bolditalics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
        },
        Kanit: {
          // 3. set Kanit font
          normal: "Kanit-Regular.ttf",
          bold: "Kanit-Medium.ttf",
          italics: "Kanit-Italic.ttf",
          bolditalics: "Kanit-MediumItalic.ttf",
        },
      };



      const niti = {
        pageSize: "A4",
        background: [
          {
            image: "stamp",
            width: "550",
            opacity: 0.1,
            absolutePosition: { x: 20, y: 150 },
          },
        ],
        content: [
          {
            alignment: "justify",
            columns: [
              {
                image: "stamp",
                width: 80,
                style: "lineSpacing2",
              },
              { width: "*", text: "" },
              {
                margin: [0, 30, 0, 0],
                width: 130,
                fontSize: 20,
                alignment: "left",
                text: "ใบวางบิล",
              },
            ],
          },
          {
            alignment: "justify",
            columns: [
              {
                width: "auto",
                alignment: "left",
                fontSize: 10,
                bold: false,
                text: [
                    this.invoice.wcompanyName +
                   "\nที่อยู่: " +
                    this.invoice.address +
                    "ต." +
                    this.invoice.subdistrict +
                    "อ." +
                    this.invoice.district +
                    "\nจ." +
                    this.invoice.province +
                    " " +
                    this.invoice.postcode +
                    ", เบอร์โทร: " +
                    this.invoice.wcompanyNumber +
                    "\nเลขผู้เสียภาษี: " +
                    this.invoice.taxNumber +
                    "\n อีเมล: " +
                    this.invoice.employeeEmail,
                ],
              },
              {
                width: "*",
                text: "",
              },
              {
                width: 140,
                alignment: "left",
                fontSize: 10,
                type: "none",
                ol: [
                  "เลขที่: " + "INV"+ this.invoice.invoiceID,
                  "วันที่: " + moment(String(this.invoice.dateinvoice)).format(
                      "DD/MM/YYYY"
                    ),
                  "ผู้ขาย: " + this.invoice.employeeName,
                  "เบอร์: " + this.invoice.employeeNumber,
                ],
              },
            ],
            style: "lineSpacing2",
          },

          /* customer here */

          {
            alignment: "justify",
            columns: [
              {
                width: "auto",
                alignment: "left",
                fontSize: 10,
                bold: false,
                text: [
                  {
                    text: "ลูกค้า: ",
                    bold: true,
                  },
                  {
                    text: this.invoice.companyName,
                  },
                  {
                    text: "\nที่อยู่: ",
                    bold: true,
                  },
                  {
                    text:
                      this.invoice.caddress +
                      " ต." +
                      this.invoice.csubdistrict +
                      " อ." +
                      this.invoice.cdistrict +
                      " จ." +
                      this.invoice.cprovince +
                      " " +
                      this.invoice.cpostcode,
                  },
                  {
                    text: "\nเลขทะเบียนนิติบุคคล: ",
                    bold: true,
                  },
                  {
                    text: this.invoice.ctaxNumber,
                  },
                ],
              },
            ],
            style: "lineSpacing2",
          },

          /* customer end */

          /* ============================================
          detail section place here 
          ============================================ */
          {
           
            alignment: "center",
            columns: [
              {
                style: "tableExample",
                alignment: "center",

                table: {
                  widths: [30, "*", 30, 100, 100],
                  fontSize: 10,
                  body: [
                    /* table header */
                    [
                      {
                        fontSize: 10,                       
                        fillColor: "#4E4D4D",
                        text: "#",
                        color: "white",
                      },
                      {
                        fontSize: 10,                       
                        fillColor: "#4E4D4D",
                        color: "white",
                        text: "รายละเอียด",
                      },
                      {
                        fontSize: 10,                        
                        fillColor: "#4E4D4D",
                        text: "จำนวน",
                        color: "white",
                      },
                      {
                        fontSize: 10,                        
                        fillColor: "#4E4D4D",
                        text: "ราคาต่อหน่วย",
                        color: "white",
                      },
                      {
                        fontSize: 10,
                        fillColor: "#4E4D4D",
                        text: "ราคารวม",
                        color: "white",
                      },
                    ],
                    /* here where to put data  */
                  ],
                },
                layout: "lightHorizontalLines"
              },
            ],
            style: "lineSpacing3",
          } ,
          {
            margin:[0, -40, 0, 0],
            alignment: "center",
            columns: [
              {
                style: "tableExample",
                alignment: "center",
                table: {
                  widths: [30, "*", 30, 100, 100],
                  fontSize: 10,  
                  body:this.invoiceDetail.map(function(item,key){
                      let neteach = item.quantity * item.price;
                      return [{text:key+1},{alignment: "left" ,text: item.name}, {text: item.quantity.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }, {text: item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }, {text: neteach.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }]
                    })    
                },
                layout: "headerLineOnly", 
              },
            
            ],
            style: "lineSpacing3",
          } , /* ============================================
          detail section end here 
          ============================================ */

          /* ============================================
          Payment section place here 
          ============================================ */
          {
            alignment: "justify",
            columns: [
              {
                width: "auto",
                alignment: "center",
                fontSize: 10,
                bold: false,
                text:  " ( " + this.ThaiBaht(this.totalprice.toFixed(2)) + " ) " ,
              },
              {
                width: "*",
                alignment: "right",
                fontSize: 10,
                type: "none",
                ol: [
                  "ราคาก่อนภาษี : " + this.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                  "ภาษี 7% : " + this.vat7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                  "ราคารวมภาษีมูลค่าเพิ่ม 7% : " + this.priceAfter7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                  "หัก ณ ที่จ่าย 3% : " + this.withholding3.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                  "รวมเงินสุทธิ : " + this.totalprice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                ],
                style: {
                  lineHeight: 1.2,
                  bold: false,
                  border: [false, false, false, true],
                },
              },
            ],
            style: "lineSpacing4",
          },

          /*           =============================================
          sign section 
          ============================================= */
          {
            height: "*",
            alignment: "justify",
            columns: [
              {
                width: 1,
                canvas: [
                  {
                    type: "rect",
                    x: 5,
                    y: 4,
                    w: 10,
                    h: 10,
                    /* color: "#7a7a7a", */
                    border: 'black',
                    fillOpacity: 0.5,
                  },
                ],
              },
              {
                width: "*",
                alignment: "left",
                margin: [20,2,0,0],
                fontSize: 10,
                bold: false,
                text: [
                  {
                    text: "โอนผ่าน",
                    bold: true,
                  },
                  {
                    text: this.invoice.bankName,
                  },
                  {
                    text: "\nเลขบัญชี ",
                    bold: true,
                  },
                  {
                    text: this.invoice.bankAccount,
                  },
                  {
                    text: "\nชื่อบัญชี ",
                    bold: true,
                  },
                  {
                    text: this.invoice.accountName,
                  },
                  
                ],
              },
              {
                width:120,
                text: "",
              },
              {
                width: "*",
                alignment: "left",
                fontSize: 10,
                type: "none",
                text: [
                  {
                    text: "ในนามของ ",
                    bold: true,
                  },
                  {
                    text: this.invoice.wcompanyName,
                  },
                  {
                    alignment: "center",
                    lineHeight:5,
                    text:" ",
                  },
                  {
                   alignment: "center",
                    text: "\nผู้รับเงิน ",
                    bold: true,
                    margin: [ 0, 5, 0, 0 ],
                  },
                  {
                   alignment: "center",
                    text: "\n(                                               ) ",
                    bold: true,
                    margin: [ 0, 5, 0, 0 ],
                  },
                  {
                    alignment: "center",
                    text: "\n" + this.invDate,
                  },
                ],
                style: {
                  lineHeight: 1.2,
                  bold: false,
                  border: [false, false, false, true],
                },
              },      
            ],
            style: "lineSpacing",
          },

          /* 
          ============================================
          end of sign section
          ============================================ */
        ],
        images: {
          stamp:
            imgText,
        },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
          },

          lineSpacing: {
            margin: [0, 0, 0, 6], //change number 6 to increase nspace
          },
          lineSpacing2: {
            margin: [0, 0, 0, 10], //change number 6 to increase nspace
          },
          lineSpacing3: {
            margin: [0, 0, 0, 20], //change number 6 to increase nspace
          },
          lineSpacing4: {
            margin: [0, 0, 0, 50], //change number 6 to increase nspace
          },
        },
        defaultStyle: {
          font: "Kanit",
          // alignment: 'justify'
        },
      };
      const normal = {
        pageSize: "A4",
        background: [
          {
            image: "stamp",
            width: "550",
            opacity: 0.1,
            absolutePosition: { x: 20, y: 150 },
          },
        ],
        content: [
          {
            alignment: "justify",
            columns: [
              {
                image: "stamp",
                width: 80,
                style: "lineSpacing2",
              },
              { width: "*", text: "" },
              {
                margin: [0, 30, 0, 0],
                width: 130,
                fontSize: 20,
                alignment: "left",
                text: "ใบวางบิล",
              },
            ],
          },
          {
            alignment: "justify",
            columns: [
              {
                width: "auto",
                alignment: "left",
                fontSize: 10,
                bold: false,
                text: [
                  this.comName +
                   "\nที่อยู่: " +
                    /* this.comAddr */ this.invoice.address +
                    "ต." +
                    this.invoice.subdistrict +
                    "อ." +
                    this.invoice.district +
                    "\nจ." +
                    this.invoice.province +
                    " " +
                    this.invoice.postcode +
                    ", เบอร์โทร: " +
                    this.invoice.wcompanyNumber +
                    "\nเลขผู้เสียภาษี: " +
                    this.invoice.taxNumber +
                    "\n อีเมล: " +
                    this.invoice.employeeEmail,
                ],
              },
              {
                width: "*",
                text: "",
              },
              {
                width: 140,
                alignment: "left",
                fontSize: 10,
                type: "none",
                ol: [
                  "เลขที่: " + "INV"+ this.invoice.invoiceID,
                  "วันที่: " + moment(String(this.invoice.dateinvoice)).format(
                      "DD-MM-YYYY"
                    ),
                  "ผู้ขาย: " + this.invoice.employeeName,
                  "เบอร์: " + this.invoice.employeeNumber,
                ],
              },
            ],
            style: "lineSpacing2",
          },

          /* customer here */

          {
            alignment: "justify",
            columns: [
              {
                width: "auto",
                alignment: "left",
                fontSize: 10,
                bold: false,
                text: [
                  {
                    text: "ลูกค้า: ",
                    bold: true,
                  },
                  {
                    text: this.invoice.companyName,
                  },
                  {
                    text: "\nที่อยู่: ",
                    bold: true,
                  },
                  {
                    text:
                      this.invoice.caddress +
                      " ต." +
                      this.invoice.csubdistrict +
                      " อ." +
                      this.invoice.cdistrict +
                      " จ." +
                      this.invoice.cprovince +
                      " " +
                      this.invoice.cpostcode,
                  },
                  {
                    text: "\nเลขทะเบียนนิติบุคคล: ",
                    bold: true,
                  },
                  {
                    text: this.invoice.ctaxNumber,
                  },
                ],
              },
            ],
            style: "lineSpacing2",
          },

          /* customer end */

          /* ============================================
          detail section place here 
          ============================================ */
          {
           
            alignment: "center",
            columns: [
              {
                style: "tableExample",
                alignment: "center",

                table: {
                  widths: [30, "*", 30, 100, 100],
                  fontSize: 10,
                  body: [
                    /* table header */
                    [
                      {
                        fontSize: 10,                       
                        fillColor: "#4E4D4D",
                        text: "#",
                        color: "white",
                      },
                      {
                        fontSize: 10,                       
                        fillColor: "#4E4D4D",
                        color: "white",
                        text: "รายละเอียด",
                      },
                      {
                        fontSize: 10,                        
                        fillColor: "#4E4D4D",
                        text: "จำนวน",
                        color: "white",
                      },
                      {
                        fontSize: 10,                        
                        fillColor: "#4E4D4D",
                        text: "ราคาต่อหน่วย",
                        color: "white",
                      },
                      {
                        fontSize: 10,
                        fillColor: "#4E4D4D",
                        text: "ราคารวม",
                        color: "white",
                      },
                    ],
                    /* here where to put data  */
                  ],
                },
                layout: "lightHorizontalLines"
              },
            ],
            style: "lineSpacing3",
          } ,
          {
            margin:[0, -40, 0, 0],
            alignment: "center",
            columns: [
              {
                style: "tableExample",
                alignment: "center",
                table: {
                  widths: [30, "*", 30, 100, 100],
                  fontSize: 10,  
                  body:this.invoiceDetail.map(function(item,key){
                      let neteach = item.quantity * item.price;
                      return [{text:key+1},
                      {alignment: "left" ,text: item.name}, 
                      {text: item.quantity.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }, 
                      {text: item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }, 
                      {text: neteach.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }]
                    })    
                },
                layout: "headerLineOnly", 
              },
            
            ],
            style: "lineSpacing3",
          } , /* ============================================
          detail section end here 
          ============================================ */

          /* ============================================
          Payment section place here 
          ============================================ */
          {
            alignment: "justify",
            columns: [
              {
                width: "auto",
                alignment: "center",
                fontSize: 10,
                bold: false,
                text:  " ( " + this.ThaiBaht(this.totalprice.toFixed(2)) + " ) " ,
              },
              {
                width: "*",
                alignment: "right",
                fontSize: 10,
                type: "none",
                ol: [
                  "ราคาก่อนภาษี : " + this.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                  "ภาษี 7% : " + this.vat7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                  "ราคารวมภาษีมูลค่าเพิ่ม 7% : " + this.priceAfter7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                  "รวมเงินสุทธิ : " + this.totalprice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  + " บาท",
                ],
                style: {
                  lineHeight: 1.2,
                  bold: false,
                  border: [false, false, false, true],
                },
              },
            ],
            style: "lineSpacing4",
          },

          /*           =============================================
          sign section 
          ============================================= */
          {
            height: "*",
            alignment: "justify",
            columns: [
              {
                width: 1,
                canvas: [
                  {
                    type: "rect",
                    x: 5,
                    y: 4,
                    w: 10,
                    h: 10,
                    /* color: "#7a7a7a", */
                    border: 'black',
                    fillOpacity: 0.5,
                  },
                ],
              },
              {
                width: "*",
                alignment: "left",
                margin: [20,2,0,0],
                fontSize: 10,
                bold: false,
                text: [
                  {
                    text: "โอนผ่าน",
                    bold: true,
                  },
                  {
                    text: this.invoice.bankName,
                  },
                  {
                    text: "\nเลขบัญชี ",
                    bold: true,
                  },
                  {
                    text: this.invoice.bankAccount,
                  },
                  {
                    text: "\nชื่อบัญชี ",
                    bold: true,
                  },
                  {
                    text: this.invoice.accountName,
                  },
                  
                ],
              },
              {
                width:120,
                text: "",
              },
              {
                width: "*",
                alignment: "left",
                fontSize: 10,
                type: "none",
                text: [
                  {
                    text: "ในนามของ ",
                    bold: true,
                  },
                  {
                    text: this.invoice.wcompanyName,
                  },
                  {
                    alignment: "center",
                    lineHeight:5,
                    text:" ",
                  },
                  {
                   alignment: "center",
                    text: "\nผู้รับเงิน ",
                    bold: true,
                    margin: [ 0, 5, 0, 0 ],
                  },
                  {
                   alignment: "center",
                    text: "\n(                                               ) ",
                    bold: true,
                    margin: [ 0, 5, 0, 0 ],
                  },
                  {
                    alignment: "center",
                    text: "\n" + this.invDate,
                  },
                ],
                style: {
                  lineHeight: 1.2,
                  bold: false,
                  border: [false, false, false, true],
                },
              },      
            ],
            style: "lineSpacing",
          },

          /* 
          ============================================
          end of sign section
          ============================================ */
        ],
        images: {
          stamp:
            imgText,
        },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
          },

          lineSpacing: {
            margin: [0, 0, 0, 6], //change number 6 to increase nspace
          },
          lineSpacing2: {
            margin: [0, 0, 0, 10], //change number 6 to increase nspace
          },
          lineSpacing3: {
            margin: [0, 0, 0, 20], //change number 6 to increase nspace
          },
          lineSpacing4: {
            margin: [0, 0, 0, 50], //change number 6 to increase nspace
          },
        },
        defaultStyle: {
          font: "Kanit",
          // alignment: 'justify'
        },
      };
      if (this.invoice.customerstatus == "นิติบุคคล") {
        console.log("open create pdf");
        pdfMake.createPdf(niti).open({}, window);
      } else {
        console.log("lemme go idiot!");
        cosole.log("here come normal person");
        pdfMake.createPdf(normal).open({}, window);
      }
      /*  pdfMake.createPdf(dd).open({}, window) */
    },

      ThaiBaht(Number) {
      var TxtNumArr = new Array(
        "ศูนย์",
        "หนึ่ง",
        "สอง",
        "สาม",
        "สี่",
        "ห้า",
        "หก",
        "เจ็ด",
        "แปด",
        "เก้า",
        "สิบ"
      );
      var TxtDigitArr = new Array(
        "",
        "สิบ",
        "ร้อย",
        "พัน",
        "หมื่น",
        "แสน",
        "ล้าน"
      );
      var BahtText = "";
      var DecimalLen= "";
      if (isNaN(Number)) {
        return "ข้อมูลนำเข้าไม่ถูกต้อง";
      } else {
        if (Number - 0 > 9999999.9999) {
          return "ข้อมูลนำเข้าเกินขอบเขตที่ตั้งไว้";
        } else {
          Number = Number.split(".");
          if (Number[1].length > 0) {
            Number[1] = Number[1].substring(0, 2);
          }
          var NumberLen = Number[0].length - 0;
          for (var i = 0; i < NumberLen; i++) {
            var tmp = Number[0].substring(i, i + 1) - 0;
            if (tmp != 0) {
              if (i == NumberLen - 1 && tmp == 1) {
                BahtText += "เอ็ด";
              } else if (i == NumberLen - 2 && tmp == 2) {
                BahtText += "ยี่";
              } else if (i == NumberLen - 2 && tmp == 1) {
                BahtText += "";
              } else {
                BahtText += TxtNumArr[tmp];
              }
              BahtText += TxtDigitArr[NumberLen - i - 1];
            }
          }
          BahtText += "บาท";
          if (Number[1] == "0" || Number[1] == "00") {
            BahtText += "ถ้วน";
          } else {
            DecimalLen = Number[1].length - 0;
            for (var i = 0; i < DecimalLen; i++) {
              var tmp = Number[1].substring(i, i + 1) - 0;
              if (tmp != 0) {
                if (i == DecimalLen - 1 && tmp == 1) {
                  BahtText += "เอ็ด";
                } else if (i == DecimalLen - 2 && tmp == 2) {
                  BahtText += "ยี่";
                } else if (i == DecimalLen - 2 && tmp == 1) {
                  BahtText += "";
                } else {
                  BahtText += TxtNumArr[tmp];
                }
                BahtText += TxtDigitArr[DecimalLen - i - 1];
              }
            }
            BahtText += "สตางค์";
          }
          return BahtText;
        }
      }
    },
    
  },
};
</script>