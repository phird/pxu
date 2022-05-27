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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../assets/custom-fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from "axios";
let Textimg = "";

export default {
  name: "App",
  data() {
    return {
      scID: "",
      scopeArr: [],
      htmlText: "",
    };
  },
  created() {
    this.scID = this.$route.params.id;
  },

  mounted() {
    this.getBase64FromUrl(
      "https://pxu-server.herokuapp.com/stamp/stamp.png"
    ).then(function (data) {
      Textimg = data;
    });
    setTimeout(() => {
      this.export();
    }, 500);
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
      this.scID = this.$route.params.id;
      try {
        const response = await axios.get(
          `https://pxu-server.herokuapp.com/quotation/quoScope/${this.scID}`
        );
        this.scopeArr = response.data[0];
        /* console.log("response.data[0]"); */
        /* console.log(this.scopeArr); */
        this.htmlText = this.scopeArr.summernote;
        /* console.log(htmlText); */
      } catch (err) {
        console.log(err);
      }

      var val = htmlToPdfmake(this.htmlText);
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

      const dd = {
        pageSize: "A4",
        background: [
          {
            image: "stamp",
            width: "550",
            opacity: 0.1,
            absolutePosition: { x: 20, y: 150 },
          },
        ],
        content: [val],
        images: {
          stamp: Textimg,
        },
        defaultStyle: {
          font: "Kanit",
          // alignment: 'justify'
        },
      };
      pdfMake.createPdf(dd).open({}, window);
    },
  },
};
</script>


<style scoped>
</style>