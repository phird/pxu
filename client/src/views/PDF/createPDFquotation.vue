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
      quoID: "",
      quoDate: "",
      quotation: [],
      quoDetail: [],
      qaddress: "",
      qsubdistrict: "",
      qdistrict: "",
      qprovince: "",
      qpostcode: "",
      qwcompanyNumber: "",
      qtaxNumber: "",
      qemployeeEmail: "",
      qnamecontact:"",


      price: 0,
      totalprice: 0,
      netprice: 0,
      vat7: 0,
      priceAfter7: 0,
      withholding3: 0,
    };
  },
  create() {
    this.quoID = this.$route.params.id;
  },

  mounted() {
    this.getBase64FromUrl("https://pxu-server.herokuapp.com/stamp/stamp.png").then(
      function (data) {
        /* alert(data) */
        imgText = data;
        /* alert(data) */
      }
    );
    this.export();
  },
  methods: {
    async getBase64FromUrl(url) {
      const data = await fetch(url);
      const blob = await data.blob();
      try {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
    async export() {
      this.quoID = this.$route.params.id;
      /* this.getquo(this.quoID); */
      console.log("get-quotation-pdf");
      try {
        console.log("now im try");
        const response = await axios.get(
          `https://pxu-server.herokuapp.com/quotation/quo/${this.quoID}`
        );
        const response2 = await axios.get(
          `https://pxu-server.herokuapp.com/quotation/quo/detail/${this.quoID}`
        );
        console.log(response.data[0]);
        this.quotation = response.data[0];
        this.quoDetail = response2.data;
        console.log(this.quoDetail);
        /*      console.log("data from response");
        console.log(this.quotation.wcompanyName); */
        this.quoDate = this.quotation.datequotation;
        if (
          this.quotation.caddress != "" ||
          this.quotation.csubdistrict != ""
        ) {
          this.qaddress = "\n" + "ที่อยู่: " + this.quotation.caddress;
          this.qsubdistrict = " ต. " + this.quotation.csubdistrict;
          this.qdistrict = " อ. " + this.quotation.cdistrict;
          this.qprovince = "\n" + " จ. " + this.quotation.cprovince;
          this.qpostcode = this.quotation.cpostcode;
        }
        if (this.quotation.contactNumber != "" ) {
          this.qwcompanyNumber =
            ",  เบอร์โทร: " + this.quotation.companyNumber;
        }
        if (this.quotation.ctaxNumber != "") {
          this.qtaxNumber =
            "\n" + "หมายเลขผู้เสียภาษี: " + this.quotation.ctaxNumber;
        }
        if (this.quotation.companyName != this.quotation.contactName) {
          this.qnamecontact =
              "(" + this.quotation.contactName + ")";
        }
        if (this.quotation.contactEmail != "") {
          this.qemployeeEmail = "\n" + "อีเมล: " + this.quotation.contactEmail;
        }
        /* นิติบุคคคล */
        if (
          this.quotation.customerstatus == "นิติบุคคล" &&
          this.quotation.vatstatus == "vatนอก"
        ) {
          console.log("niti outvat");

          this.price = this.quotation.totalpricequo;
          this.totalprice = this.price;
          this.vat7 = this.totalprice * 0.07;
          this.priceAfter7 = this.totalprice + this.vat7;
          this.withholding3 = this.price * 0.03;
          this.totalprice = this.priceAfter7 - this.withholding3;
        } else if (
          this.quotation.customerstatus == "นิติบุคคล" &&
          this.quotation.vatstatus == "vatใน"
        ) {
          console.log("niti innervat");
          /* vat ใน */
          this.totalprice = this.quotation.totalpricequo;
          this.vat7 = this.totalprice - (this.totalprice * 100) / 107;
          this.price = this.totalprice - this.vat7;
          this.priceAfter7 = this.totalprice;
          /* this.priceAfter7 = this.totalprice + this.vat7; */
          this.withholding3 = this.price * 0.03;
          this.totalprice = this.quotation.paymentPrice;
        } else if (
          this.quotation.customerstatus == "บุคคลธรรมดา" &&
          this.quotation.vatstatus == "vatนอก"
        ) {
          console.log("normal outervat");
          this.price = this.quotation.totalpricequo;
          this.totalprice = this.price;
          this.vat7 = this.totalprice * 0.07;
          this.priceAfter7 = this.totalprice + this.vat7;
          this.totalprice = this.priceAfter7;
        } else if (
          this.quotation.customerstatus == "บุคคลธรรมดา" &&
          this.quotation.vatstatus == "vatใน"
        ) {
          /* vat ใน */
          console.log("niti innervat");
          this.totalprice = this.quotation.totalpricequo;
          this.vat7 = this.totalprice - (this.totalprice * 100) / 107;
          this.price = this.totalprice - this.vat7;
          this.priceAfter7 = this.totalprice;
          this.totalprice = this.quotation.paymentPrice;
        } else {
          alert(" something went wrong ! please check quotation's detail ");
        }
      } catch (err) {
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
                text: "ใบเสนอราคา",
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
                  this.quotation.wcompanyName +
                    "\nที่อยู่: " +
                    this.quotation.address +
                    "ต." +
                    this.quotation.subdistrict +
                    "อ." +
                    this.quotation.district +
                    "\nจ." +
                    this.quotation.province +
                    " " +
                    this.quotation.postcode +
                    ", เบอร์โทร: " +
                    this.quotation.wcompanyNumber +
                    "\nเลขผู้เสียภาษี: " +
                    this.quotation.taxNumber +
                    "\n อีเมล: " +
                    this.quotation.employeeEmail,
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
                  "เลขที่: " + "QA" + this.quotation.quotationID,
                  "วันที่: " + this.quotation.datequotation,
                  "ผู้ขาย: " + this.quotation.employeeName,
                  "เบอร์: " + this.quotation.employeeNumber,
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
                    text: this.quotation.companyName,
                  },
                  {
                    text:
                      this.qaddress +
                      " " +
                      this.qsubdistrict +
                      " " +
                      this.qdistrict +
                      this.qprovince +
                      "   " +
                      this.qpostcode +
                      "  " +
                      this.qwcompanyNumber + this.qnamecontact +
                      this.qemployeeEmail +
                      this.qtaxNumber 
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
                layout: "lightHorizontalLines",
              },
            ],
            style: "lineSpacing3",
          },
          {
            margin: [0, -40, 0, 0],
            alignment: "center",
            columns: [
              {
                style: "tableExample",
                alignment: "center",

                table: {
                  widths: [30, "*", 30, 100, 100],
                  fontSize: 10,
                  body: this.quoDetail.map(function (item, key) {
                    let neteach = item.quantity * item.price;
                    return [
                      {
                        fillColor: "#eeeeee",
                        text: key + 1,
                      },
                      {
                        fillColor: "#eeeeee",
                        alignment: "left",
                        text: item.name,
                      },
                      {
                        fillColor: "#eeeeee",
                        text: item.quantity
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                      },
                      {
                        fillColor: "#eeeeee",
                        text: item.price
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                      },
                      {
                        fillColor: "#eeeeee",
                        text: neteach
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                      },
                    ];
                  }),
                },
                layout: "headerLineOnly",
              },
            ],
            style: "lineSpacing3",
          },
          /* ============================================
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
                text: [
                  {
                    text:
                      " ( " + this.ThaiBaht(this.totalprice.toFixed(2)) + " ) ",
                  },
                  {
                    alignment: "center",
                    text: "\n\n" + "หมายเหตุ: " + this.quotation.notequotation,
                  },
                ],
              },
              {
                text: " ",
                width: 10,
              },
              {
                width: "*",
                alignment: "right",
                fontSize: 10,
                type: "none",
                ol: [
                  "ราคาก่อนภาษี :",
                  "ภาษี 7% :",
                  "ราคาหลังภาษีมูลค่าเพิ่ม 7% :",
                  "หัก ณ ที่จ่าย 3% :",
                  "รวมเงินสุทธิ :",
                ],
                style: {
                  lineHeight: 1.2,
                  bold: false,
                  border: [false, false, false, true],
                },
              },
              {
                width: "auto",
                alignment: "right",
                fontSize: 10,
                type: "none",
                ol: [
                  this.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                    " บาท",
                  this.vat7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                    " บาท",
                  this.priceAfter7
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,") + " บาท",
                  ,
                  this.withholding3
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,") + " บาท",
                  this.totalprice
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,") + " บาท",
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
                width: "*",
                alignment: "center",
                fontSize: 10,
                bold: false,
                text: [
                  {
                    text: "ในนามของ ",
                    bold: true,
                  },
                  {
                    text: this.quotation.companyName,
                  },
                  {
                    lineHeight: 6,
                    text: " ",
                  },
                  {
                    text: "\nผู้ว่าจ้าง ",
                    bold: true,
                  },
                  {
                    text: "\n" + this.quotation.datequotation,
                  },
                ],
              },
              {
                width: "*",
                text: " ",
              },
              {
                width: "auto",
                alignment: "center",
                fontSize: 10,
                type: "none",
                text: [
                  {
                    text: "ในนามของ ",
                    bold: true,
                  },
                  {
                    text: this.quotation.wcompanyName,
                  },
                  {
                    lineHeight: 6,
                    text: " ",
                  },
                  {
                    text: "\nอนุมัติ ",
                    margin: [30, 0],
                    bold: true,
                  },
                  {
                    text: "\n" + this.quotation.datequotation,
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
          stamp: imgText,
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
                text: "ใบเสนอราคา",
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
                  this.quotation.wcompanyName +
                    "\nที่อยู่: " +
                    this.quotation.address +
                    "ต." +
                    this.quotation.subdistrict +
                    "อ." +
                    this.quotation.district +
                    "\nจ." +
                    this.quotation.province +
                    " " +
                    this.quotation.postcode +
                    ", เบอร์โทร: " +
                    this.quotation.wcompanyNumber +
                    "\nเลขผู้เสียภาษี: " +
                    this.quotation.taxNumber +
                    "\n อีเมล: " +
                    this.quotation.employeeEmail,
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
                  "เลขที่: " + "QA" + this.quotation.quotationID,
                  "วันที่: " + this.quotation.datequotation,
                  "ผู้ขาย: " + this.quotation.employeeName,
                  "เบอร์: " + this.quotation.employeeNumber,
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
                    text: this.quotation.companyName,
                  },
                  {
                    text:
                      this.qaddress +
                      " " +
                      this.qsubdistrict +
                      " " +
                      this.qdistrict +
                      this.qprovince +
                      "   " +
                      this.qpostcode +
                      "  " +
                      this.qwcompanyNumber +
                      this.qemployeeEmail +
                      this.qtaxNumber,
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
                layout: "lightHorizontalLines",
              },
            ],
            style: "lineSpacing3",
          },
          {
            margin: [0, -40, 0, 0],
            alignment: "center",
            columns: [
              {
                style: "tableExample",
                alignment: "center",
                table: {
                  widths: [30, "*", 30, 100, 100],
                  fontSize: 10,
                  body: this.quoDetail.map(function (item, key) {
                    let neteach = item.quantity * item.price;
                    return [
                      {
                        fillColor: "#eeeeee",
                        text: key + 1,
                      },
                      {
                        fillColor: "#eeeeee",
                        alignment: "left",
                        text: item.name,
                      },
                      {
                        fillColor: "#eeeeee",
                        text: item.quantity
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                      },
                      {
                        fillColor: "#eeeeee",
                        text: item.price
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                      },
                      {
                        fillColor: "#eeeeee",
                        text: neteach
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                      },
                    ];
                  }),
                },
                layout: "headerLineOnly",
              },
            ],
            style: "lineSpacing3",
          },
          /* ============================================
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
                text: [
                  {
                    text:
                      " ( " + this.ThaiBaht(this.totalprice.toFixed(2)) + " ) ",
                  },
                  {
                    alignment: "center",
                    text: "\n\n" + "หมายเหตุ: " + this.quotation.notequotation,
                  },
                ],
              },
              {
                width: "*",
                alignment: "right",
                fontSize: 10,
                type: "none",
                ol: [
                  "ราคาก่อนภาษี :",
                  "ภาษี 7% :",
                  "ราคาหลังภาษีมูลค่าเพิ่ม 7% :",
                  "รวมเงินสุทธิ :",
                ],
                style: {
                  lineHeight: 1.2,
                  bold: false,
                  border: [false, false, false, true],
                },
              },
              {
                width: "auto",
                alignment: "right",
                fontSize: 10,
                type: "none",
                ol: [
                  this.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                    " บาท",
                  this.vat7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                    " บาท",
                  this.priceAfter7
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,") + " บาท",
                  this.totalprice
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,") + " บาท",
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
                width: "*",
                alignment: "center",
                fontSize: 10,
                bold: false,
                text: [
                  {
                    text: "ในนามของ ",
                    bold: true,
                  },
                  {
                    text: this.quotation.companyName,
                  },
                  {
                    lineHeight: 6,
                    text: " ",
                  },
                  {
                    text: "\nผู้ว่าจ้าง ",
                    bold: true,
                  },
                  {
                    text: "\n" + this.quotation.datequotation,
                  },
                ],
              },
              {
                width: "auto",
                text: " ",
              },
              {
                widths: "*",
                alignment: "center",
                fontSize: 10,
                type: "none",
                text: [
                  {
                    text: "ในนามของ ",
                    bold: true,
                  },
                  {
                    text: this.quotation.wcompanyName,
                  },
                  {
                    lineHeight: 6,
                    text: " ",
                  },
                  {
                    text: "\nอนุมัติ ",
                    margin: [30, 0],
                    bold: true,
                  },
                  {
                    text: "\n" + this.quotation.datequotation,
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
        /// do not expand it cuz it long as hell
        images: {
          stamp: imgText,
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

      if (this.quotation.customerstatus == "นิติบุคคล") {
        console.log("open create pdf");
        pdfMake.createPdf(niti).open({}, window);
      } else {
        console.log("lemme go idiot!");
        console.log("here come normal person");
        pdfMake.createPdf(normal).open({}, window);
      }
      /* pdfMake.createPdf(dd).open({}, window) */
    },
    /* =================================================================== */
    /* ======================================================================= */
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
      var DecimalLen = "";
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