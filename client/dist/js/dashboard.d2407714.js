(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{"159b":function(t,a,e){var n=e("da84"),s=e("fdbc"),o=e("17c2"),r=e("9112");for(var c in s){var i=n[c],l=i&&i.prototype;if(l&&l.forEach!==o)try{r(l,"forEach",o)}catch(u){l.forEach=o}}},"17c2":function(t,a,e){"use strict";var n=e("b727").forEach,s=e("a640"),o=s("forEach");t.exports=o?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"205b":function(t,a,e){},"68d4":function(t,a,e){},7277:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("a-row",{attrs:{gutter:24,type:"flex",align:"stretch"}},[e("a-col",{staticClass:"mb-24",attrs:{span:24,lg:6}},[e("CardUser")],1),e("a-col",{staticClass:"mb-24",attrs:{span:24,lg:6}},[e("CardBank")],1),e("a-col",{staticClass:"mb-24",attrs:{span:24,lg:12}},[e("CardCompanyStat")],1)],1),e("a-row",{attrs:{gutter:24,type:"flex",align:"stretch"}},[e("a-col",{staticClass:"mb-24",attrs:{span:24,lg:24}},[e("CardProjectTable",{attrs:{data:t.tableData,columns:t.tableColumns}})],1)],1)],1)},s=[],o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("a-card",{staticClass:"header-solid h-full",staticStyle:{"font-family":"'Mitr', sans-serif"},attrs:{bordered:!1,bodyStyle:{padding:0}},scopedSlots:t._u([{key:"title",fn:function(){return[e("a-row",{attrs:{type:"flex",align:"middle"}},[e("a-col",{attrs:{span:24,md:12}},[e("h5",{staticClass:"font-semibold m-0"},[t._v("Projects Table")])]),e("a-col",{staticStyle:{display:"flex","align-items":"center","justify-content":"flex-end"},attrs:{span:24,md:12}},[e("a-radio-group",{attrs:{size:"small"},model:{value:t.projectHeaderBtns,callback:function(a){t.projectHeaderBtns=a},expression:"projectHeaderBtns"}},[e("a-radio-button",{attrs:{value:"all"}},[t._v("ALL")]),e("a-radio-button",{attrs:{value:"On-Going"}},[t._v("On-Going")]),e("a-radio-button",{attrs:{value:"Done"}},[t._v("Done")])],1)],1)],1)]},proxy:!0}])},["all"==t.projectHeaderBtns?e("a-table",{attrs:{columns:t.columns,"data-source":t.quotationall,pagination:!0},scopedSlots:t._u([{key:"qName",fn:function(a){return[e("div",{staticClass:"table-avatar-info"},[e("div",{staticClass:"avatar-info"},[e("a",[t._v(" "+t._s(a))])])])]}},{key:"status",fn:function(a){return[e("a-tag",{staticClass:"tag-status",class:a?"ant-tag-primary":"ant-tag-muted"},[t._v(" "+t._s(a?"On-Going":"Done")+" ")])]}},{key:"val",fn:function(a){return[e("div",{staticClass:"val-info"},[e("h6",{staticClass:"m-0"},[t._v(t._s(a.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))])])]}}],null,!1,3466005523)}):t._e(),"On-Going"==t.projectHeaderBtns?e("a-table",{attrs:{columns:t.columns,"data-source":t.quotationongoing,pagination:!0},scopedSlots:t._u([{key:"qName",fn:function(a){return[e("div",{staticClass:"table-avatar-info"},[e("div",{staticClass:"avatar-info"},[e("a",[t._v(" "+t._s(a))])])])]}},{key:"status",fn:function(a){return[e("a-tag",{staticClass:"tag-status",class:a?"ant-tag-primary":"ant-tag-muted"},[t._v(" "+t._s(a?"On-Going":"Done")+" ")])]}},{key:"val",fn:function(a){return[e("div",{staticClass:"val-info"},[e("h6",{staticClass:"m-0"},[t._v(t._s(a))])])]}}],null,!1,3042155147)}):t._e(),"Done"==t.projectHeaderBtns?e("a-table",{attrs:{columns:t.columns,"data-source":t.quotationdone,pagination:!0},scopedSlots:t._u([{key:"qName",fn:function(a){return[e("div",{staticClass:"table-avatar-info"},[e("div",{staticClass:"avatar-info"},[e("a",[t._v(" "+t._s(a))])])])]}},{key:"status",fn:function(a){return[e("a-tag",{staticClass:"tag-status",class:a?"ant-tag-primary":"ant-tag-muted"},[t._v(" "+t._s(a?"On-Going":"Done")+" ")])]}},{key:"val",fn:function(a){return[e("div",{staticClass:"val-info"},[e("h6",{staticClass:"m-0"},[t._v(t._s(a))])])]}}],null,!1,3042155147)}):t._e()],1)},r=[],c=e("1da1"),i=(e("96cf"),e("bc3a")),l=e.n(i),u=[{title:"PROJECT NAME",dataIndex:"quotationName",scopedSlots:{customRender:"qName"}},{title:"W-STATUS",dataIndex:"statuswork",scopedSlots:{customRender:"statusw"}},{title:"Value",dataIndex:"paymentPrice",scopedSlots:{customRender:"val"}}],d={data:function(){return{quotationall:[],quotationdone:[],quotationongoing:[],columns:u,projectHeaderBtns:"all"}},created:function(){this.getquotationall(),this.getquotationongoing(),this.getquotationdone()},methods:{getquotationall:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log("get-quo"),a.prev=1,a.next=4,l.a.get("http://128.199.187.173:5000/quotation");case 4:e=a.sent,t.quotationall=e.data,console.log(t.quotationall),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),console.log(a.t0);case 12:case"end":return a.stop()}}),a,null,[[1,9]])})))()},getquotationongoing:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log("get-quo"),a.prev=1,a.next=4,l.a.get("http://128.199.187.173:5000/quotation/ongoing");case 4:e=a.sent,t.quotationongoing=e.data,console.log(t.quotationongoing),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),console.log(a.t0);case 12:case"end":return a.stop()}}),a,null,[[1,9]])})))()},getquotationdone:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log("get-quo"),a.prev=1,a.next=4,l.a.get("http://128.199.187.173:5000/quotation/done");case 4:e=a.sent,t.quotationdone=e.data,console.log(t.quotationdone),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),console.log(a.t0);case 12:case"end":return a.stop()}}),a,null,[[1,9]])})))()}}},f=d,p=e("0c7c"),v=Object(p["a"])(f,o,r,!1,null,null,null),m=v.exports,g=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card-profile"},[e("div",{staticClass:"card-profile-section"},[t._m(0),e("div",{staticClass:"card-body"},[e("div",{staticClass:"content-card-body"},[e("div",{staticClass:"content-box"},[e("div",{attrs:{id:"username"}},[e("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(t.em.employeeName))])]),e("div",{attrs:{id:"email"}},[e("span",{staticClass:"email-text",staticStyle:{"font-size":"16px","font-weight":"300"}},[t._v(t._s(t.em.employeeEmail))])])])])])])])},b=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"profile-banner"},[n("img",{attrs:{src:e("94b3"),alt:"Profile Cover Photo"}})])}],h={data:function(){return{em:[]}},created:function(){this.getem()},methods:{getem:function(){var t=this;l.a.get("http://128.199.187.173:5000/carddash",{}).then((function(a){t.em=a.data[0]}))}}},C=h,_=(e("cf1b"),Object(p["a"])(C,g,b,!1,null,"7f45ccfe",null)),y=_.exports,x=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card"},[e("div",{staticClass:"card-profile-section"},[e("div",{staticClass:"profile-banner"},[e("img",{attrs:{src:"http://128.199.187.173:5000/bank/"+t.bank.img,alt:"Bank Cover Photo"}})]),e("div",{staticClass:"card-body"},[e("div",{staticClass:"content-card-body"},[e("div",{staticClass:"bank-name m-0 center"},[e("span",{staticStyle:{"font-size":"24px"}},[t._v(" "+t._s(t.bank.bankName))])])])])])])},k=[],q={data:function(){return{bank:[]}},created:function(){this.getbank()},methods:{getbank:function(){var t=this;l.a.get("http://128.199.187.173:5000/carddash/bank",{}).then((function(a){t.bank=a.data[0],console.log(t.bank)}))}}},j=q,w=(e("83f8"),Object(p["a"])(j,x,k,!1,null,"3c36d938",null)),S=w.exports,E=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-bar-chart card-stat",staticStyle:{"font-family":"'Mitr', sans-serif"},attrs:{bordered:!1}},[t._m(0),e("div",{staticClass:"div-table-content"},[e("div",{staticClass:"card-content"},[e("div",{staticClass:"stat"},[e("div",{staticClass:"icon-stat icon-blue"},[e("b-icon",{staticStyle:{color:"#2f8ce8","font-size":"24px"},attrs:{icon:"people-fill "}})],1),e("div",{staticClass:"detail-stat"},[e("span",{staticStyle:{"font-size":"24px"}},[t._v(t._s(t.customer.toFixed(0).replace(/\d(?=(\d{3})+\.)/g,"$&,")))]),e("br"),e("span",{attrs:{id:"text-stat"}},[t._v("ลูกค้า")])])]),e("div",{staticClass:"stat"},[e("div",{staticClass:"icon-stat icon-yellow"},[e("b-icon",{staticStyle:{color:"#f55d5d","font-size":"24px"},attrs:{icon:"file-earmark-code-fill"}})],1),e("div",{staticClass:"detail-stat"},[e("span",{staticStyle:{"font-size":"24px"}},[t._v(t._s(t.project.toFixed(0).replace(/\d(?=(\d{3})+\.)/g,"$&,")))]),e("br"),e("span",{attrs:{id:"text-stat"}},[t._v("โปรเจค ")])])]),e("div",{staticClass:"stat"},[e("div",{staticClass:"icon-stat icon-green"},[e("b-icon",{staticStyle:{color:"#376303"},attrs:{icon:"wallet-fill"}})],1),e("div",{staticClass:"detail-stat"},[e("span",{staticStyle:{"font-size":"24px"}},[t._v(t._s(t.payment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))]),e("br"),e("span",{attrs:{id:"text-stat"}},[t._v("รายได้")])])])])])])},O=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card-title"},[e("p",[t._v("สถิติของบริษัท")])])}],R=(e("d3b7"),e("159b"),{mounted:function(){var t=document.querySelectorAll(".counter-stat"),a=250;t.forEach((function(t){var e=function e(){var n=+t.getAttribute("data-target"),s=+t.innerText,o=parseInt(n/a)<1?1:parseInt(n/a);s<n?(t.innerText=s+o,setTimeout(e,1)):t.innerText=n};e()}))},data:function(){return{customer:0,project:0,payment:0}},created:function(){this.getcount()},methods:{getcount:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:l.a.get("http://128.199.187.173:5000/carddash/count",{}).then((function(a){t.customer=a.data[0][0].ccus,t.project=a.data[1][0].cquo,t.payment=a.data[1][0].p,console.log(t.customer),console.log(t.project),console.log(t.payment)}));case 1:case"end":return a.stop()}}),a)})))()}}}),$=R,B=(e("d9fb"),Object(p["a"])($,E,O,!1,null,"76851c04",null)),T=B.exports,z=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},D=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"card"},[n("div",{staticClass:"profile-banner"},[n("img",{attrs:{src:e("9faf"),alt:"Bank Cover Photo"}})]),n("div",{staticClass:"card-body"},[n("div",{staticClass:"content-card-body"},[n("div",{staticClass:"bank-name m-0 center"},[n("span",{staticStyle:{"font-size":"24px"}},[t._v(" KASIKORNTHAI")])])]),n("p",{staticClass:"default-bank-text"},[t._v(" [default]")])])])}],N={},P=N,A=(e("9c0cc"),Object(p["a"])(P,z,D,!1,null,"69f89958",null)),H=A.exports,I={components:{CardProjectTable:m,CardUser:y,CardBank:S,CardCompanyStat:T,CardCustomerAnalytic:H},data:function(){return{tableData:tableData,tableColumns:tableColumns,stats:stats}}},G=I,F=Object(p["a"])(G,n,s,!1,null,"c697e444",null);a["default"]=F.exports},"756c":function(t,a,e){},"83f8":function(t,a,e){"use strict";e("ccec")},"94b3":function(t,a,e){t.exports=e.p+"img/banner-17.aaebb106.jpg"},"9c0cc":function(t,a,e){"use strict";e("205b")},"9faf":function(t,a,e){t.exports=e.p+"img/K_Banner570.6f55371f.jpg"},a640:function(t,a,e){"use strict";var n=e("d039");t.exports=function(t,a){var e=[][t];return!!e&&n((function(){e.call(null,a||function(){throw 1},1)}))}},ccec:function(t,a,e){},cf1b:function(t,a,e){"use strict";e("756c")},d9fb:function(t,a,e){"use strict";e("68d4")}}]);
//# sourceMappingURL=dashboard.d2407714.js.map