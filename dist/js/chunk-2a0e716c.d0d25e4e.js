(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a0e716c"],{"0034":function(t,e,n){},"09a5":function(t,e,n){"use strict";var a=n("0034"),r=n.n(a);r.a},df83:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("PageTable",{ref:"table",attrs:{url:"/prisoner/prisonerList",params:t.params,columns:t.columns},on:{"on-selection-change":t.selectChange}},[n("div",{staticClass:"table-param"},[n("div",{staticClass:"table-param-label"},[t._v("姓名：")]),n("div",{staticClass:"table-param-input"},[n("Input",{attrs:{clearable:""},model:{value:t.params.prisonerName,callback:function(e){t.$set(t.params,"prisonerName","string"===typeof e?e.trim():e)},expression:"params.prisonerName"}})],1)]),n("Button",{attrs:{type:"primary",loading:t.loading},on:{click:t.request}},[t._v("查询")]),n("Button",{attrs:{type:"primary"},on:{click:t.print}},[t._v("打印")])],1)},r=[],i=(n("99af"),n("a15b"),n("d81d"),n("b0c0"),n("2909")),c=(n("96cf"),n("1da1")),s=n("e94a"),o=(n("179a"),n("fe63")),l=n("bdaa"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._g({staticClass:"iconButton",class:t.className,attrs:{title:t.title}},t.$listeners))},p=[],m=n("ade3"),d={props:{type:{type:String},title:{type:String}},computed:{className:function(){return Object(m["a"])({},"iconButton-".concat(this.type),!0)}}},f=d,b=(n("09a5"),n("2877")),h=Object(b["a"])(f,u,p,!1,null,"8657c1b8",null),v=h.exports,g={components:{PageTable:s["a"],IconButton:v},data:function(){return{params:{prisonerName:""},loading:!1,selections:[]}},computed:{columns:function(){var t=this;this.$createElement;return[{type:"selection",width:60,align:"center"},{title:"姓名",key:"name"},{title:"编号",key:"number"},{title:"操作",render:function(e,n){var a=n.row;return[e(v,{on:{click:function(){return t.edit(a)}},attrs:{type:"edit",title:"编辑"}}),e(v,{on:{click:function(){return t.remove(a)}},attrs:{type:"remove",title:"删除"}})]}}]},printData:function(){var t="";return t='\n      <table border="1">\n      <caption>打印内容</caption>\n      <tr>\n        <th>姓名</th>\n        <th>编号</th>\n      </tr>\n      '.concat(this.selections.map((function(t){var e="\n        <tr>\n          <td>".concat(t.name,"</td>\n          <td>").concat(t.number,"</td>\n        </tr>");return e})).join(""),"\n    </table>"),t}},mounted:function(){this.request()},methods:{request:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.$refs.table.request();case 3:t.loading=!1;case 4:case"end":return e.stop()}}),e)})))()},selectChange:function(t){this.selections=Object(i["a"])(t)},print:function(){var t=this;0==this.selections.length?this.$Modal.confirm({title:"注意",content:"未勾选任何数据，是否打印全部查询条件数据？",onOk:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(l["d"])(t.params);case 3:n=e.sent,a=n.data,t.selections=Object(i["a"])(a),Object(o["a"])(t.printData),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),t.$Message.warning(e.t0);case 12:return e.prev=12,t.$Modal.remove(),t.selections=[],e.finish(12);case 16:case"end":return e.stop()}}),e,null,[[0,9,12,16]])})));function n(){return e.apply(this,arguments)}return n}()}):this.$Modal.confirm({title:"注意",content:"是否要打印勾选数据？",onOk:function(){Object(o["a"])(t.printData),t.$refs.table.selectAll(!1)}})},edit:function(t){},remove:function(t){}}},k=g,w=Object(b["a"])(k,a,r,!1,null,null,null);e["default"]=w.exports}}]);
//# sourceMappingURL=chunk-2a0e716c.d0d25e4e.js.map