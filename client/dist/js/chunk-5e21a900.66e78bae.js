(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e21a900"],{"0cb2":function(e,t,i){var n=i("7b0b"),o=Math.floor,r="".replace,a=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,c=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,i,l,s,u){var d=i+e.length,p=l.length,f=c;return void 0!==s&&(s=n(s),f=a),r.call(u,f,(function(n,r){var a;switch(r.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,i);case"'":return t.slice(d);case"<":a=s[r.slice(1,-1)];break;default:var c=+r;if(0===c)return n;if(c>p){var u=o(c/10);return 0===u?n:u<=p?void 0===l[u-1]?r.charAt(1):l[u-1]+r.charAt(1):n}a=l[c-1]}return void 0===a?"":a}))}},"107c":function(e,t,i){var n=i("d039");e.exports=n((function(){var e=RegExp("(?<a>b)","string".charAt(5));return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},1148:function(e,t,i){"use strict";var n=i("a691"),o=i("1d80");e.exports=function(e){var t=String(o(this)),i="",r=n(e);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(t+=t))1&r&&(i+=t);return i}},1276:function(e,t,i){"use strict";var n=i("d784"),o=i("44e7"),r=i("825a"),a=i("1d80"),c=i("4840"),l=i("8aa5"),s=i("50c4"),u=i("14c3"),d=i("9263"),p=i("9f7f"),f=i("d039"),g=p.UNSUPPORTED_Y,v=[].push,m=Math.min,x=4294967295,h=!f((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var i="ab".split(e);return 2!==i.length||"a"!==i[0]||"b"!==i[1]}));n("split",(function(e,t,i){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,i){var n=String(a(this)),r=void 0===i?x:i>>>0;if(0===r)return[];if(void 0===e)return[n];if(!o(e))return t.call(n,e,r);var c,l,s,u=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,g=new RegExp(e.source,p+"g");while(c=d.call(g,n)){if(l=g.lastIndex,l>f&&(u.push(n.slice(f,c.index)),c.length>1&&c.index<n.length&&v.apply(u,c.slice(1)),s=c[0].length,f=l,u.length>=r))break;g.lastIndex===c.index&&g.lastIndex++}return f===n.length?!s&&g.test("")||u.push(""):u.push(n.slice(f)),u.length>r?u.slice(0,r):u}:"0".split(void 0,0).length?function(e,i){return void 0===e&&0===i?[]:t.call(this,e,i)}:t,[function(t,i){var o=a(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,o,i):n.call(String(o),t,i)},function(e,o){var a=i(n,this,e,o,n!==t);if(a.done)return a.value;var d=r(this),p=String(e),f=c(d,RegExp),v=d.unicode,h=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(g?"g":"y"),b=new f(g?"^(?:"+d.source+")":d,h),y=void 0===o?x:o>>>0;if(0===y)return[];if(0===p.length)return null===u(b,p)?[p]:[];var w=0,S=0,E=[];while(S<p.length){b.lastIndex=g?0:S;var N,I=u(b,g?p.slice(S):p);if(null===I||(N=m(s(b.lastIndex+(g?S:0)),p.length))===w)S=l(p,S,v);else{if(E.push(p.slice(w,S)),E.length===y)return E;for(var D=1;D<=I.length-1;D++)if(E.push(I[D]),E.length===y)return E;S=w=N}}return E.push(p.slice(w)),E}]}),!h,g)},"14c3":function(e,t,i){var n=i("c6b6"),o=i("9263");e.exports=function(e,t){var i=e.exec;if("function"===typeof i){var r=i.call(e,t);if("object"!==typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==n(e))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(e,t)}},"408a":function(e,t,i){var n=i("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=n(e))throw TypeError("Incorrect invocation");return+e}},"44e7":function(e,t,i){var n=i("861d"),o=i("c6b6"),r=i("b622"),a=r("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[a])?!!t:"RegExp"==o(e))}},5319:function(e,t,i){"use strict";var n=i("d784"),o=i("d039"),r=i("825a"),a=i("50c4"),c=i("a691"),l=i("1d80"),s=i("8aa5"),u=i("0cb2"),d=i("14c3"),p=i("b622"),f=p("replace"),g=Math.max,v=Math.min,m=function(e){return void 0===e?e:String(e)},x=function(){return"$0"==="a".replace(/./,"$0")}(),h=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),b=!o((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));n("replace",(function(e,t,i){var n=h?"$":"$0";return[function(e,i){var n=l(this),o=void 0==e?void 0:e[f];return void 0!==o?o.call(e,n,i):t.call(String(n),e,i)},function(e,o){if("string"===typeof o&&-1===o.indexOf(n)&&-1===o.indexOf("$<")){var l=i(t,this,e,o);if(l.done)return l.value}var p=r(this),f=String(e),x="function"===typeof o;x||(o=String(o));var h=p.global;if(h){var b=p.unicode;p.lastIndex=0}var y=[];while(1){var w=d(p,f);if(null===w)break;if(y.push(w),!h)break;var S=String(w[0]);""===S&&(p.lastIndex=s(f,a(p.lastIndex),b))}for(var E="",N=0,I=0;I<y.length;I++){w=y[I];for(var D=String(w[0]),z=g(v(c(w.index),f.length),0),R=[],q=1;q<w.length;q++)R.push(m(w[q]));var $=w.groups;if(x){var k=[D].concat(R,z,f);void 0!==$&&k.push($);var A=String(o.apply(void 0,k))}else A=u(D,f,z,R,$,o);z>=N&&(E+=f.slice(N,z)+A,N=z+D.length)}return E+f.slice(N)}]}),!b||!x||h)},"8aa5":function(e,t,i){"use strict";var n=i("6547").charAt;e.exports=function(e,t,i){return t+(i?n(e,t).length:1)}},9263:function(e,t,i){"use strict";var n=i("ad6d"),o=i("9f7f"),r=i("5692"),a=i("7c73"),c=i("69f3").get,l=i("fce3"),s=i("107c"),u=RegExp.prototype.exec,d=r("native-string-replace",String.prototype.replace),p=u,f=function(){var e=/a/,t=/b*/g;return u.call(e,"a"),u.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),g=o.UNSUPPORTED_Y||o.BROKEN_CARET,v=void 0!==/()??/.exec("")[1],m=f||v||g||l||s;m&&(p=function(e){var t,i,o,r,l,s,m,x=this,h=c(x),b=h.raw;if(b)return b.lastIndex=x.lastIndex,t=p.call(b,e),x.lastIndex=b.lastIndex,t;var y=h.groups,w=g&&x.sticky,S=n.call(x),E=x.source,N=0,I=e;if(w&&(S=S.replace("y",""),-1===S.indexOf("g")&&(S+="g"),I=String(e).slice(x.lastIndex),x.lastIndex>0&&(!x.multiline||x.multiline&&"\n"!==e[x.lastIndex-1])&&(E="(?: "+E+")",I=" "+I,N++),i=new RegExp("^(?:"+E+")",S)),v&&(i=new RegExp("^"+E+"$(?!\\s)",S)),f&&(o=x.lastIndex),r=u.call(w?i:x,I),w?r?(r.input=r.input.slice(N),r[0]=r[0].slice(N),r.index=x.lastIndex,x.lastIndex+=r[0].length):x.lastIndex=0:f&&r&&(x.lastIndex=x.global?r.index+r[0].length:o),v&&r&&r.length>1&&d.call(r[0],i,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(r[l]=void 0)})),r&&y)for(r.groups=s=a(null),l=0;l<y.length;l++)m=y[l],s[m[0]]=r[m[1]];return r}),e.exports=p},"9f7f":function(e,t,i){var n=i("d039"),o=function(e,t){return RegExp(e,t)};t.UNSUPPORTED_Y=n((function(){var e=o("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=n((function(){var e=o("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,i){"use strict";var n=i("23e7"),o=i("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},ad6d:function(e,t,i){"use strict";var n=i("825a");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},b680:function(e,t,i){"use strict";var n=i("23e7"),o=i("a691"),r=i("408a"),a=i("1148"),c=i("d039"),l=1..toFixed,s=Math.floor,u=function(e,t,i){return 0===t?i:t%2===1?u(e,t-1,i*e):u(e*e,t/2,i)},d=function(e){var t=0,i=e;while(i>=4096)t+=12,i/=4096;while(i>=2)t+=1,i/=2;return t},p=function(e,t,i){var n=-1,o=i;while(++n<6)o+=t*e[n],e[n]=o%1e7,o=s(o/1e7)},f=function(e,t){var i=6,n=0;while(--i>=0)n+=e[i],e[i]=s(n/t),n=n%t*1e7},g=function(e){var t=6,i="";while(--t>=0)if(""!==i||0===t||0!==e[t]){var n=String(e[t]);i=""===i?n:i+a.call("0",7-n.length)+n}return i},v=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){l.call({})}));n({target:"Number",proto:!0,forced:v},{toFixed:function(e){var t,i,n,c,l=r(this),s=o(e),v=[0,0,0,0,0,0],m="",x="0";if(s<0||s>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(m="-",l=-l),l>1e-21)if(t=d(l*u(2,69,1))-69,i=t<0?l*u(2,-t,1):l/u(2,t,1),i*=4503599627370496,t=52-t,t>0){p(v,0,i),n=s;while(n>=7)p(v,1e7,0),n-=7;p(v,u(10,n,1),0),n=t-1;while(n>=23)f(v,1<<23),n-=23;f(v,1<<n),p(v,1,1),f(v,2),x=g(v)}else p(v,0,i),p(v,1<<-t,0),x=g(v)+a.call("0",s);return s>0?(c=x.length,x=m+(c<=s?"0."+a.call("0",s-c)+x:x.slice(0,c-s)+"."+x.slice(c-s))):x=m+x,x}})},beb4:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("div",{staticStyle:{display:"flex","font-size":"40px","text-align":"center","justify-content":"center"}},[e._v(" LOADING .... ")])])}],r=i("1da1"),a=(i("96cf"),i("d3b7"),i("d81d"),i("b0c0"),i("ac1f"),i("5319"),i("b680"),i("1276"),i("e499")),c=i.n(a),l=i("b738"),s=i.n(l),u=i("bc3a"),d=i.n(u),p=(i("c1df"),""),f={name:"App",data:function(){return{g:"",inID:"",invoice:[],invoiceDetail:[],invDate:"",qaddress:"",qsubdistrict:"",qdistrict:"",qprovince:"",qpostcode:"",qwcompanyNumber:"",qtaxNumber:"",qemployeeEmail:"",price:0,totalprice:0,netprice:0,vat7:0,priceAfter7:0,withholding3:0}},create:function(){this.inID=this.$route.params.id},mounted:function(){this.getBase64FromUrl("http://128.199.187.173:5000/stamp/stamp.png").then((function(e){p=e})),this.export()},methods:{getBase64FromUrl:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(e);case 2:return i=t.sent,t.next=5,i.blob();case 5:return n=t.sent,t.prev=6,t.abrupt("return",new Promise((function(e){var t=new FileReader;t.readAsDataURL(n),t.onloadend=function(){var i=t.result;e(i)}})));case 10:t.prev=10,t.t0=t["catch"](6),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[6,10]])})))()},export:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var i,n,o,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.inID=e.$route.params.id,console.log(e.inID),console.log("get-quotation-pdf"),t.prev=3,console.log("now im trying"),t.next=7,d.a.get("http://128.199.187.173:5000/invoice/createInvoicePDF/".concat(e.inID));case 7:return i=t.sent,t.next=10,d.a.get("http://128.199.187.173:5000/invoice/createInvoicePDF/detail/".concat(e.inID));case 10:n=t.sent,console.log(i.data[0]),e.invoice=i.data[0],e.invoiceDetail=n.data,console.log(e.invoice),console.log(e.invoiceDetail),e.invDate=e.invoice.dateinvoice,""==e.invoice.caddress&&""==e.invoice.csubdistrict||(e.qaddress="\nที่อยู่: "+e.invoice.caddress,e.qsubdistrict=" ต. "+e.invoice.csubdistrict,e.qdistrict=" อ. "+e.invoice.cdistrict,e.qprovince="\n จ. "+e.invoice.cprovince,e.qpostcode=e.invoice.cpostcode),""!=e.invoice.contactNumber&&(e.qwcompanyNumber=",  เบอร์โทร: "+e.invoice.contactNumber),""!=e.invoice.ctaxNumber&&(e.qtaxNumber="\nหมายเลขผู้เสียภาษี: "+e.invoice.ctaxNumber),""!=e.invoice.contactEmail&&(e.qemployeeEmail="\nอีเมล: "+e.invoice.contactEmail),"นิติบุคคล"==e.invoice.customerstatus&&"vatนอก"==e.invoice.vatstatus?(console.log("niti outvat"),e.price=e.invoice.totalpriceinv,e.totalprice=e.price,e.vat7=.07*e.totalprice,e.priceAfter7=e.totalprice+e.vat7,e.withholding3=.03*e.price,e.totalprice=e.priceAfter7-e.withholding3):"นิติบุคคล"==e.invoice.customerstatus&&"vatใน"==e.invoice.vatstatus?(console.log("niti innervat"),e.totalprice=e.invoice.totalpriceinv,e.vat7=e.totalprice-100*e.totalprice/107,e.price=e.totalprice-e.vat7,e.priceAfter7=e.totalprice,e.withholding3=.03*e.price,e.totalprice=e.invoice.priceINV):"บุคคลธรรมดา"==e.invoice.customerstatus&&"vatนอก"==e.invoice.vatstatus?(console.log("normal outervat"),e.price=e.invoice.totalpriceinv,e.totalprice=e.price,e.vat7=.07*e.totalprice,e.priceAfter7=e.totalprice+e.vat7,e.totalprice=e.priceAfter7):"บุคคลธรรมดา"==e.invoice.customerstatus&&"vatใน"==e.invoice.vatstatus?(console.log("niti innervat"),e.totalprice=e.invoice.totalpriceinv,e.vat7=e.totalprice-100*e.totalprice/107,e.price=e.totalprice-e.vat7,e.priceAfter7=e.totalprice,e.totalprice=e.invoice.priceINV):alert(" something went wrong ! please check quotation's detail "),t.next=27;break;case 24:t.prev=24,t.t0=t["catch"](3),console.log(t.t0);case 27:c.a.vfs=s.a.pdfMake.vfs,c.a.fonts={Roboto:{normal:"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",bold:"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",italics:"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",bolditalics:"https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf"},Kanit:{normal:"Kanit-Regular.ttf",bold:"Kanit-Medium.ttf",italics:"Kanit-Italic.ttf",bolditalics:"Kanit-MediumItalic.ttf"}},o={pageSize:"A4",background:[{image:"stamp",width:"550",opacity:.1,absolutePosition:{x:20,y:150}}],content:[{alignment:"justify",columns:[{image:"stamp",width:80,style:"lineSpacing2"},{width:"*",text:""},{margin:[0,30,0,0],width:130,fontSize:20,alignment:"left",text:"ใบวางบิล"}]},{alignment:"justify",columns:[{width:"auto",alignment:"left",fontSize:10,bold:!1,text:[e.invoice.wcompanyName+"\nที่อยู่: "+e.invoice.address+"ต."+e.invoice.subdistrict+"อ."+e.invoice.district+"\nจ."+e.invoice.province+" "+e.invoice.postcode+", เบอร์โทร: "+e.invoice.wcompanyNumber+"\nเลขผู้เสียภาษี: "+e.invoice.taxNumber+"\n อีเมล: "+e.invoice.employeeEmail]},{width:"*",text:""},{width:140,alignment:"left",fontSize:10,type:"none",ol:["เลขที่: INV"+e.invoice.invoiceID,"วันที่: "+e.invoice.dateinvoice,"ผู้ขาย: "+e.invoice.employeeName,"เบอร์: "+e.invoice.employeeNumber]}],style:"lineSpacing2"},{alignment:"justify",columns:[{width:"auto",alignment:"left",fontSize:10,bold:!1,text:[{text:"ลูกค้า: ",bold:!0},{text:e.invoice.companyName},{text:e.qaddress+" "+e.qsubdistrict+" "+e.qdistrict+e.qprovince+"   "+e.qpostcode+"  "+e.qwcompanyNumber+e.qemployeeEmail+e.qtaxNumber}]}],style:"lineSpacing2"},{alignment:"center",columns:[{style:"tableExample",alignment:"center",table:{widths:[30,"*",30,100,100],fontSize:10,body:[[{fontSize:10,fillColor:"#4E4D4D",text:"#",color:"white"},{fontSize:10,fillColor:"#4E4D4D",color:"white",text:"รายละเอียด"},{fontSize:10,fillColor:"#4E4D4D",text:"จำนวน",color:"white"},{fontSize:10,fillColor:"#4E4D4D",text:"ราคาต่อหน่วย",color:"white"},{fontSize:10,fillColor:"#4E4D4D",text:"ราคารวม",color:"white"}]]},layout:"lightHorizontalLines"}],style:"lineSpacing3"},{margin:[0,-40,0,0],alignment:"center",columns:[{style:"tableExample",alignment:"center",table:{widths:[30,"*",30,100,100],fontSize:10,body:e.invoiceDetail.map((function(e,t){var i=e.quantity*e.price;return[{text:t+1},{alignment:"left",text:e.name},{text:e.quantity.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")},{text:e.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")},{text:i.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")}]}))},layout:"headerLineOnly"}],style:"lineSpacing3"},{alignment:"justify",columns:[{width:"auto",alignment:"center",fontSize:10,bold:!1,text:" ( "+e.ThaiBaht(e.totalprice.toFixed(2))+" ) "},{width:"*",alignment:"right",fontSize:10,type:"none",ol:["ราคาก่อนภาษี : "+e.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท","ภาษี 7% : "+e.vat7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท","ราคารวมภาษีมูลค่าเพิ่ม 7% : "+e.priceAfter7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท","หัก ณ ที่จ่าย 3% : "+e.withholding3.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท","รวมเงินสุทธิ : "+e.totalprice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท"],style:{lineHeight:1.2,bold:!1,border:[!1,!1,!1,!0]}}],style:"lineSpacing4"},{height:"*",alignment:"justify",columns:[{width:1,canvas:[{type:"rect",x:5,y:4,w:10,h:10,border:"black",fillOpacity:.5}]},{width:"*",alignment:"left",margin:[20,2,0,0],fontSize:10,bold:!1,text:[{text:"โอนผ่าน",bold:!0},{text:e.invoice.bankName},{text:"\nเลขบัญชี ",bold:!0},{text:e.invoice.bankAccount},{text:"\nชื่อบัญชี ",bold:!0},{text:e.invoice.accountName}]},{width:120,text:""},{width:"*",alignment:"left",fontSize:10,type:"none",text:[{text:"ในนามของ ",bold:!0},{text:e.invoice.wcompanyName},{alignment:"center",lineHeight:5,text:" "},{alignment:"center",text:"\nผู้รับเงิน ",bold:!0,margin:[0,5,0,0]},{alignment:"center",text:"\n(                                               ) ",bold:!0,margin:[0,5,0,0]},{alignment:"center",text:"\n"+e.invDate}],style:{lineHeight:1.2,bold:!1,border:[!1,!1,!1,!0]}}],style:"lineSpacing"}],images:{stamp:p},styles:{header:{fontSize:18,bold:!0,margin:[0,0,0,10]},subheader:{fontSize:16,bold:!0,margin:[0,10,0,5]},tableExample:{margin:[0,5,0,15]},tableHeader:{bold:!0,fontSize:13,color:"black"},lineSpacing:{margin:[0,0,0,6]},lineSpacing2:{margin:[0,0,0,10]},lineSpacing3:{margin:[0,0,0,20]},lineSpacing4:{margin:[0,0,0,50]}},defaultStyle:{font:"Kanit"}},r={pageSize:"A4",background:[{image:"stamp",width:"550",opacity:.1,absolutePosition:{x:20,y:150}}],content:[{alignment:"justify",columns:[{image:"stamp",width:80,style:"lineSpacing2"},{width:"*",text:""},{margin:[0,30,0,0],width:130,fontSize:20,alignment:"left",text:"ใบวางบิล"}]},{alignment:"justify",columns:[{width:"auto",alignment:"left",fontSize:10,bold:!1,text:[e.invoice.wcompanyName+"\nที่อยู่: "+e.invoice.address+"ต."+e.invoice.subdistrict+"อ."+e.invoice.district+"\nจ."+e.invoice.province+" "+e.invoice.postcode+", เบอร์โทร: "+e.invoice.wcompanyNumber+"\nเลขผู้เสียภาษี: "+e.invoice.taxNumber+"\n อีเมล: "+e.invoice.employeeEmail]},{width:"*",text:""},{width:140,alignment:"left",fontSize:10,type:"none",ol:["เลขที่: INV"+e.invoice.invoiceID,"วันที่: "+e.invoice.dateinvoice,"ผู้ขาย: "+e.invoice.employeeName,"เบอร์: "+e.invoice.employeeNumber]}],style:"lineSpacing2"},{alignment:"justify",columns:[{width:"auto",alignment:"left",fontSize:10,bold:!1,text:[{text:"ลูกค้า: ",bold:!0},{text:e.invoice.companyName},{text:e.qaddress+" "+e.qsubdistrict+" "+e.qdistrict+e.qprovince+"   "+e.qpostcode+"  "+e.qwcompanyNumber+e.qemployeeEmail+e.qtaxNumber}]}],style:"lineSpacing2"},{alignment:"center",columns:[{style:"tableExample",alignment:"center",table:{widths:[30,"*",30,100,100],fontSize:10,body:[[{fontSize:10,fillColor:"#4E4D4D",text:"#",color:"white"},{fontSize:10,fillColor:"#4E4D4D",color:"white",text:"รายละเอียด"},{fontSize:10,fillColor:"#4E4D4D",text:"จำนวน",color:"white"},{fontSize:10,fillColor:"#4E4D4D",text:"ราคาต่อหน่วย",color:"white"},{fontSize:10,fillColor:"#4E4D4D",text:"ราคารวม",color:"white"}]]},layout:"lightHorizontalLines"}],style:"lineSpacing3"},{margin:[0,-40,0,0],alignment:"center",columns:[{style:"tableExample",alignment:"center",table:{widths:[30,"*",30,100,100],fontSize:10,body:e.invoiceDetail.map((function(e,t){var i=e.quantity*e.price;return[{text:t+1},{alignment:"left",text:e.name},{text:e.quantity.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")},{text:e.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")},{text:i.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")}]}))},layout:"headerLineOnly"}],style:"lineSpacing3"},{alignment:"justify",columns:[{width:"auto",alignment:"center",fontSize:10,bold:!1,text:" ( "+e.ThaiBaht(e.totalprice.toFixed(2))+" ) "},{width:"*",alignment:"right",fontSize:10,type:"none",ol:["ราคาก่อนภาษี : "+e.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท","ภาษี 7% : "+e.vat7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท","ราคารวมภาษีมูลค่าเพิ่ม 7% : "+e.priceAfter7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท","รวมเงินสุทธิ : "+e.totalprice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")+" บาท"],style:{lineHeight:1.2,bold:!1,border:[!1,!1,!1,!0]}}],style:"lineSpacing4"},{height:"*",alignment:"justify",columns:[{width:1,canvas:[{type:"rect",x:5,y:4,w:10,h:10,border:"black",fillOpacity:.5}]},{width:"*",alignment:"left",margin:[20,2,0,0],fontSize:10,bold:!1,text:[{text:"โอนผ่าน",bold:!0},{text:e.invoice.bankName},{text:"\nเลขบัญชี ",bold:!0},{text:e.invoice.bankAccount},{text:"\nชื่อบัญชี ",bold:!0},{text:e.invoice.accountName}]},{width:120,text:""},{width:"*",alignment:"left",fontSize:10,type:"none",text:[{text:"ในนามของ ",bold:!0},{text:e.invoice.wcompanyName},{alignment:"center",lineHeight:5,text:" "},{alignment:"center",text:"\nผู้รับเงิน ",bold:!0,margin:[0,5,0,0]},{alignment:"center",text:"\n(                                               ) ",bold:!0,margin:[0,5,0,0]},{alignment:"center",text:"\n"+e.invDate}],style:{lineHeight:1.2,bold:!1,border:[!1,!1,!1,!0]}}],style:"lineSpacing"}],images:{stamp:p},styles:{header:{fontSize:18,bold:!0,margin:[0,0,0,10]},subheader:{fontSize:16,bold:!0,margin:[0,10,0,5]},tableExample:{margin:[0,5,0,15]},tableHeader:{bold:!0,fontSize:13,color:"black"},lineSpacing:{margin:[0,0,0,6]},lineSpacing2:{margin:[0,0,0,10]},lineSpacing3:{margin:[0,0,0,20]},lineSpacing4:{margin:[0,0,0,50]}},defaultStyle:{font:"Kanit"}},"นิติบุคคล"==e.invoice.customerstatus?(console.log("open create pdf"),c.a.createPdf(o).open({},window)):(console.log("lemme go idiot!"),console.log("here come normal person"),c.a.createPdf(r).open({},window));case 32:case"end":return t.stop()}}),t,null,[[3,24]])})))()},ThaiBaht:function(e){var t=new Array("ศูนย์","หนึ่ง","สอง","สาม","สี่","ห้า","หก","เจ็ด","แปด","เก้า","สิบ"),i=new Array("","สิบ","ร้อย","พัน","หมื่น","แสน","ล้าน"),n="",o="";if(isNaN(e))return"ข้อมูลนำเข้าไม่ถูกต้อง";if(e-0>9999999.9999)return"ข้อมูลนำเข้าเกินขอบเขตที่ตั้งไว้";e=e.split("."),e[1].length>0&&(e[1]=e[1].substring(0,2));for(var r=e[0].length-0,a=0;a<r;a++){var c=e[0].substring(a,a+1)-0;0!=c&&(n+=a==r-1&&1==c?"เอ็ด":a==r-2&&2==c?"ยี่":a==r-2&&1==c?"":t[c],n+=i[r-a-1])}if(n+="บาท","0"==e[1]||"00"==e[1])n+="ถ้วน";else{o=e[1].length-0;for(a=0;a<o;a++){c=e[1].substring(a,a+1)-0;0!=c&&(n+=a==o-1&&1==c?"เอ็ด":a==o-2&&2==c?"ยี่":a==o-2&&1==c?"":t[c],n+=i[o-a-1])}n+="สตางค์"}return n}}},g=f,v=i("0c7c"),m=Object(v["a"])(g,n,o,!1,null,null,null);t["default"]=m.exports},d784:function(e,t,i){"use strict";i("ac1f");var n=i("6eeb"),o=i("9263"),r=i("d039"),a=i("b622"),c=i("9112"),l=a("species"),s=RegExp.prototype;e.exports=function(e,t,i,u){var d=a(e),p=!r((function(){var t={};return t[d]=function(){return 7},7!=""[e](t)})),f=p&&!r((function(){var t=!1,i=/a/;return"split"===e&&(i={},i.constructor={},i.constructor[l]=function(){return i},i.flags="",i[d]=/./[d]),i.exec=function(){return t=!0,null},i[d](""),!t}));if(!p||!f||i){var g=/./[d],v=t(d,""[e],(function(e,t,i,n,r){var a=t.exec;return a===o||a===s.exec?p&&!r?{done:!0,value:g.call(t,i,n)}:{done:!0,value:e.call(i,t,n)}:{done:!1}}));n(String.prototype,e,v[0]),n(s,d,v[1])}u&&c(s[d],"sham",!0)}},fce3:function(e,t,i){var n=i("d039");e.exports=n((function(){var e=RegExp(".","string".charAt(0));return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=chunk-5e21a900.66e78bae.js.map