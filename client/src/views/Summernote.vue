<template>
  <div class="hello">
    <div>
      <quill-editor
      class="myLang"
        v-model="sumnote"
        ref="myQuillEditor"
        :options="editorOption"
        @change="addtext"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      >
      </quill-editor>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { ImageExtend } from "quill-image-extend-module";
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

// Add fonts to CSS style

export default {
  name: "Summernote",
  components: {
    quillEditor,
  },
  props:["sumnote"],
  //   created() {
  //     // this.getsum();
  //   },
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "type something...",
        modules: {
          imageEdit: {
            modules: ["Resize", "DisplaySize", "Delete"],
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
    addtext() {
      let mytext = this.sumnote;
      this.$emit("update-text", mytext);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myLang{
  font-family: "Mitr", sans-serif;
}
.myLang >>> .ql-toolbar.ql-snow + .ql-container.ql-snow {
    font-family: "Mitr", sans-serif;
    border-top: 0px;
}
.note-editable{ 
    font-family: 'Kanit', sans-serif;
    font-size: 15px !important; 
    text-align: left !important; 
    height: 350px !important;  
}
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