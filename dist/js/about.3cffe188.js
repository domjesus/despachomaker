(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"42d2":function(e,t,s){"use strict";var o=s("ee3f"),a=s.n(o);a.a},b8e8:function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"main"},[e.userNome?s("div",{staticClass:"heade-img-locale"},[s("img",{attrs:{src:"https://teletrabalho.net/scpr/brasao_pq.png"}}),s("br"),s("p",[e._v("Instituto Nacional do Seguro Social")]),s("br"),s("div",{staticClass:"localization mb-5"},[e._v(" GEX "+e._s(e.gex)),s("br"),e._v(" "+e._s(e.olNome)+" - "+e._s(e.olNumero)+" "),s("br"),e._v(" "+e._s(e.cidade)+" - "+e._s((new Date).toLocaleDateString())+" ")])]):s("div",{staticClass:"alert alert-warning"},[e._v(" Atenção! Dados do usuário não recuperados! ")]),e.nomeSegurado&&e.especie&&e.numeroBeneficio?s("div",{staticClass:"segurado mb-3"},[s("div",{staticClass:"row"},[e._m(0),s("div",{staticClass:"col col-md-6"},[s("input",{staticClass:"form-control disabled",attrs:{type:"text",name:"nomeSegurado",readonly:"true"},domProps:{value:e.nomeSegurado}})])]),s("div",{staticClass:"row mb-3 mt-3"},[e._m(1),s("div",{staticClass:"col col-md-1"},[s("input",{staticClass:"form-control disabled",attrs:{type:"text",readonly:"true"},domProps:{value:e.especie}})]),e._m(2),s("div",{staticClass:"col col-md-3"},[s("input",{staticClass:"form-control disabled",attrs:{type:"text",name:"nb",readonly:"true"},domProps:{value:e.numeroBeneficio}})])])]):s("div",[s("p",{staticClass:"alert alert-warning no-print"},[e._v(" Não foi informado Nome ou Espécie ou NB ")])]),s("div",{staticClass:"textos"},[s("h4",[e._v(" Assunto: Trata-se de requerimento de "+e._s(e.especieExtenso)+" o qual foi "+e._s(e.conclusao.decisao)+", tendo em vista "+e._s(e.trataConclusao)+", com fundamento no "+e._s(e.conclusao.norma)+". ")]),s("div",{staticClass:"vinculos mt-3"},[e._v(e._s(e.vinculos)+" "+e._s(e.obsVinculos))]),s("div",{staticClass:"recolhimentos mt-3"},[e._v(" Recolhimentos: "+e._s(e.recolhimentos)+" "+e._s(e.obsRecolhimentos)+" ")]),s("div",{staticClass:"ppp mt-3"},[e._v("PPP: "+e._s(e.ppp)+" "+e._s(e.obsPPP))]),s("div",{staticClass:"rural mt-3"},[e._v("Rural: "+e._s(e.rural)+" "+e._s(e.obsRural))]),s("div",{staticClass:"dependentes mt-3"},[e._v(" Dependentes: "+e._s(e.dependentes)+" "+e._s(e.obsDependentes)+" ")]),s("div",{staticClass:"bpc mt-3"},[e._v("Bpc: "+e._s(e.bpc)+" "+e._s(e.obsBpc))]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.obsGerais,expression:"obsGerais"}],staticClass:"obsGerais mt-3"},[e._v(" Obs Gerais: "+e._s(e.obsGerais)+" ")])]),e.userNome?s("div",{staticClass:"mt-5",attrs:{id:"servidor_aux"}},[s("div",{attrs:{id:"servidor"}},[e._v(" "+e._s(e.userNome)),s("br"),e._v(" "+e._s(e.userCargo)),s("br"),e._v(" Matrícula: "+e._s(e.userMatricula)+" ")])]):s("div",{staticClass:"alert alert-warning no-print"},[e._v(" Atenção! Dados do usuário não recuperados!"),s("br"),s("router-link",{attrs:{to:"/"}},[s("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.right.hover",modifiers:{right:!0,hover:!0}}],staticClass:"btn btn-md span-edit",attrs:{title:"Voltar para edição."}},[s("span",{staticClass:"span-edit"},[s("font-awesome-icon",{attrs:{icon:"arrow-left"}})],1)])])],1),s("div",{staticClass:"back-to-edit mb-2 no-print"},[s("router-link",{attrs:{to:"/"}},[s("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.right.hover",modifiers:{right:!0,hover:!0}}],staticClass:"btn btn-sm",attrs:{title:"Voltar para edição."}},[s("span",{staticClass:"span-edit"},[s("font-awesome-icon",{attrs:{icon:"arrow-left",size:"lg"}})],1)])]),s("div",{on:{click:e.print}},[s("font-awesome-icon",{attrs:{icon:"print",size:"lg"}})],1)],1)])},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col col-md-2"},[s("label",{attrs:{for:"nomeSegurado"}},[e._v("Nome:")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col col-md-2 mt-2"},[s("label",{attrs:{for:"esp"}},[e._v("Esp:")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col col-sm-1 mt-2 text-center"},[s("label",{attrs:{for:"nb"}},[e._v("NB:")])])}],i=(s("4160"),s("ac1f"),s("1276"),s("159b"),s("5530")),r=s("2f62"),n=s("ecee"),c=s("c074"),l=s("ad3d");n["c"].add(c["a"],c["b"]);var d={name:"EditingComponent",computed:Object(i["a"])(Object(i["a"])({},Object(r["c"])({userNome:"getUsuarioNome",userMatricula:"getUsuarioMatricula",userCargo:"getUsuarioCargo",cidade:"getCidade",gex:"getGex",olNumero:"getOlNumero",olNome:"getOlNome",nomeSegurado:"getNome",numeroBeneficio:"getNb",especie:"getEspecie",especieExtenso:"getEspecieExtenso",vinculos:"getVinculos",recolhimentos:"getRecolhimentos",ppp:"getPPP",rural:"getRural",dependentes:"getDependentes",bpc:"getBpc",obsVinculos:"getObsVinculos",obsRecolhimentos:"getObsRecolhimentos",obsPPP:"getObsPPP",obsRural:"getObsRural",obsDependentes:"getObsDependentes",obsBpc:"getObsBpc",obsGerais:"getObsGerais",conclusao:"getConclusao"})),{},{trataConclusao:function(){var e=this.conclusao.descricao;return e?e.split("-")?e.split("-")[0]:e.descricao:"MOTIVO DE CONCLUSÃO NÃO INFORMADO"}}),methods:{print:function(){window.print()}},mounted:function(){var e=document.querySelectorAll(".vinculos,.recolhimentos,.ppp,.rural,.dependentes,.bpc,.obsGerais");e.forEach((function(e){return e.setAttribute("contenteditable","true")}))},components:{FontAwesomeIcon:l["a"]}},u=d,m=(s("42d2"),s("2877")),p=Object(m["a"])(u,o,a,!1,null,"28468ffa",null);t["default"]=p.exports},ee3f:function(e,t,s){}}]);
//# sourceMappingURL=about.3cffe188.js.map