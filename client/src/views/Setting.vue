<template>
  <div class="hello">
    <div>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      >
      </quill-editor>
    </div>
    <button @click="savesum">click</button>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Srisakdi:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Square+Peg&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,600;1,300;1,600&display=swap"
      rel="stylesheet"
    />
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { ImageExtend} from "quill-image-extend-module";
import ImageEdit from "quill-image-edit-module";
Quill.register("modules/imageEdit", ImageEdit);
  // import ImageResize from 'quill-image-resize-module';
const sizeStyle = Quill.import("attributors/style/size");
// Quill.register('modules/ImageResize', ImageResize)
sizeStyle.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "30px",
  "32px",
  "36px",
];
Quill.register(sizeStyle, true);
Quill.register("modules/ImageExtend", ImageExtend);
function getFontName(font) {
  return font.toLowerCase().replace(/\s/g, "-");
}

// Specify Quill fonts
const fontList = [
  "Arial",
  "Courier",
  "Garamond",
  "Tahoma",
  "Times New Roman",
  "Verdana",
  "Brush Script MT",
  "Kanit",
  "Square Peg",
  "Orbitron",
  "Srisakdi",
];
const fontNames = fontList.map((font) => getFontName(font));
const fonts = Quill.import("formats/font");
fonts.whitelist = fontNames;
Quill.register(fonts, true);

// Add fonts to CSS style
let fontStyles = "";
fontList.forEach(function (font) {
  let fontName = getFontName(font);
  fontStyles +=
    ".ql-snow .ql-picker.ql-font .ql-picker-label[data-value=" +
    fontName +
    "]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=" +
    fontName +
    "]::before {" +
    "content: '" +
    font +
    "';" +
    "font-family: '" +
    font +
    "', sans-serif;" +
    "}" +
    ".ql-font-" +
    fontName +
    "{" +
    " font-family: '" +
    font +
    "', sans-serif;" +
    "}";
});

const node = document.createElement("style");
node.innerHTML = fontStyles;
document.body.appendChild(node);

export default {
  name: "HelloWorld",
  components: {
    quillEditor,
  },
  props: {
    msg: String,
  },
  created() {
    this.getsum();
  },
  data() {
    return {
      product: [],
      content: "",
      editorOption: {
        placeholder: "type something...",
        modules: {
          imageEdit: {
            modules: ["Resize", "DisplaySize", "Toolbar", "Delete"],
          },
          // see: https://github.com/NextBoy/quill-image-extend-module#quill-image-extend-module-%E7%9A%84%E6%89%80%E6%9C%89%E5%8F%AF%E9%85%8D%E7%BD%AE%E9%A1%B9
          ImageExtend: {
            loading: true,
            name: "img",
            action: "/uploads", 
            // 可选参数 设置请求头部
            headers: (xhr) => {
              xhr.setRequestHeader("withCredentials", true);
            },
            response: (res) => {
              return res.info;
            },
          },
          // see: https://quilljs.com/docs/modules/toolbar/
          toolbar: {
            container: [
              [
                {
                  size: [
                    "10px",
                    "12px",
                    "14px",
                    "16px",
                    "18px",
                    "20px",
                    "24px",
                    "30px",
                    "32px",
                    "36px",
                  ],
                },
                { header: [1, 2, 3, 4, 5, 6, false] },
              ],
              [
                "bold",
                "italic",
                "underline",
                "strike",
                { color: [] },
                { background: [] },
              ],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
              [{ font: fonts.whitelist }],
            ],
            handlers: {
                // image: function() {
                //   QuillWatch.emit(this.quill.id);
                // }
            },
          },
        },
      },
      onEditorBlur() {},
      onEditorFocus() {},
      onEditorReady() {},
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor;
    },
  },
  methods: {

    async getsum() {
      console.log("get-products");
      try {
        const response = await axios.get("http://localhost:5000/setting");
        this.content = response.data[1].summernote;

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async savesum() {
     alert(this.content)
      console.log(this.content)
      try {
        await axios.post("http://localhost:5000/setting", {
          summernote: this.content,
        });
      } catch (err) {
        alert(err);
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<style>
.ql-size span.ql-picker-item[data-value]::before,
.ql-size span.ql-picker-label[data-value]::before {
  content: attr(data-value) !important;
}
</style>