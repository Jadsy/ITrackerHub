(function(e){function t(t){for(var a,r,o=t[0],u=t[1],s=t[2],l=0,d=[];l<o.length;l++)r=o[l],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&d.push(c[r][0]),c[r]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);p&&p(t);while(d.length)d.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var o=n[r];0!==c[o]&&(a=!1)}a&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},r={app:0},c={app:0},i=[];function o(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-12fd0ea8":"dbfc1efe","chunk-1287d802":"a365c190","chunk-1fc37de2":"be723ddc","chunk-2e0c3a73":"8ed1ec69","chunk-635b7c34":"120120b9","chunk-2d0e5bf3":"f7a815c5","chunk-304ff44a":"f81d7ef5","chunk-56aee8ec":"c5014f8e","chunk-cd677b82":"5bdde946","chunk-d5293448":"a279a0a6","chunk-ef70153e":"8d9d7c92","chunk-1b42c010":"8f31dacc","chunk-27c29d0c":"da65f90f","chunk-2d0d3dd8":"bfc64778","chunk-2d0a462b":"17c4ee4d","chunk-4c60cefa":"44ba165c","chunk-216bad50":"8633f5dd","chunk-62263386":"99650571","chunk-8efdc3ec":"61087dd4"}[e]+".js"}function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-12fd0ea8":1,"chunk-1287d802":1,"chunk-1fc37de2":1,"chunk-2e0c3a73":1,"chunk-635b7c34":1,"chunk-304ff44a":1,"chunk-56aee8ec":1,"chunk-cd677b82":1,"chunk-d5293448":1,"chunk-1b42c010":1,"chunk-27c29d0c":1,"chunk-4c60cefa":1,"chunk-216bad50":1,"chunk-62263386":1,"chunk-8efdc3ec":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-12fd0ea8":"d2b08c27","chunk-1287d802":"b808f0f3","chunk-1fc37de2":"07789a7b","chunk-2e0c3a73":"c7cff92b","chunk-635b7c34":"317cd787","chunk-2d0e5bf3":"31d6cfe0","chunk-304ff44a":"e44792fe","chunk-56aee8ec":"d5c9d50a","chunk-cd677b82":"4c8e0066","chunk-d5293448":"a4e5e3fb","chunk-ef70153e":"31d6cfe0","chunk-1b42c010":"ff3d539c","chunk-27c29d0c":"8b727632","chunk-2d0d3dd8":"31d6cfe0","chunk-2d0a462b":"31d6cfe0","chunk-4c60cefa":"54e402a1","chunk-216bad50":"9a05ac9e","chunk-62263386":"9a05ac9e","chunk-8efdc3ec":"a1e52fcc"}[e]+".css",c=u.p+a,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var s=i[o],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===a||l===c))return t()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){s=d[o],l=s.getAttribute("data-href");if(l===a||l===c)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var a=t&&t.target&&t.target.src||c,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],p.parentNode.removeChild(p),n(i)},p.href=c;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){r[e]=0})));var a=c[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=c[e]=[t,n]}));t.push(a[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=o(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=c[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}c[e]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/demo/materio-vuetify-vuejs-admin-template-free/demo/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var p=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0333":function(e,t,n){"use strict";n("39b1")},1510:function(e,t,n){},1698:function(e,t,n){"use strict";n("1510")},"39b1":function(e,t,n){},"3a6e":function(e,t,n){"use strict";n("614f")},"3c61":function(e,t,n){},4951:function(e,t,n){"use strict";n("6732")},5331:function(e,t,n){e.exports=n.p+"img/logo.a1918669.svg"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("ed09"),r=n("2b0e");r["default"].use(a["b"]);n("3c61"),n("f9e3"),n("2dd8");var c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n(e.resolveLayout,{tag:"component"},[n("router-view")],1)],1)},i=[],o=(n("b0c0"),n("5530")),u=function(){var e=Object(a["c"])().proxy,t=Object(a["d"])({route:e.$route});return Object(a["g"])((function(){return e.$route}),(function(e){t.route=e})),Object(o["a"])(Object(o["a"])({},Object(a["f"])(t)),{},{router:e.$router})},s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-main",[n("router-view")],1)],1)},l=[],d={},p=d,f=n("2877"),m=n("6544"),h=n.n(m),v=n("7496"),b=n("f6c4"),k=Object(f["a"])(p,s,l,!1,null,null,null),g=k.exports;h()(k,{VApp:v["a"],VMain:b["a"]});var y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("vertical-nav-menu",{attrs:{"is-drawer-open":e.isDrawerOpen},on:{"update:isDrawerOpen":function(t){e.isDrawerOpen=t},"update:is-drawer-open":function(t){e.isDrawerOpen=t}}}),n("v-app-bar",{attrs:{app:"",flat:"",absolute:"",color:"transparent"}},[n("div",{staticClass:"boxed-container w-full"},[n("div",{staticClass:"d-flex align-center mx-6"},[n("v-app-bar-nav-icon",{staticClass:"d-block d-lg-none me-2",on:{click:function(t){e.isDrawerOpen=!e.isDrawerOpen}}}),n("v-text-field",{staticClass:"app-bar-search flex-grow-0",attrs:{rounded:"",dense:"",outlined:"","prepend-inner-icon":e.icons.mdiMagnify,"hide-details":""}}),n("v-spacer"),n("theme-switcher"),n("app-bar-user-menu")],1)])]),n("v-main",[n("div",{staticClass:"app-content-container boxed-container pa-6"},[e._t("default")],2)])],1)},O=[],x=n("94ed"),_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-navigation-drawer",{staticClass:"app-navigation-menu",attrs:{value:e.isDrawerOpen,app:"",floating:"",width:"260",right:e.$vuetify.rtl},on:{input:function(t){return e.$emit("update:is-drawer-open",t)}}},[a("div",{staticClass:"vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2"},[a("router-link",{staticClass:"d-flex align-center text-decoration-none",attrs:{to:"/"}},[a("v-img",{staticClass:"app-logo me-3",attrs:{src:n("5331"),"max-height":"30px","max-width":"30px",alt:"logo",contain:"",eager:""}}),a("v-slide-x-transition",[a("h2",{staticClass:"app-title text--primary"},[e._v("ITrackerHub")])])],1)],1),a("v-list",{staticClass:"vertical-nav-menu-items pr-5",attrs:{expand:"",shaped:""}},[a("nav-menu-link",{attrs:{title:"Dashboard",to:{name:"dashboard"},icon:e.icons.mdiHomeOutline}}),a("v-list",[a("v-list-group",{attrs:{"prepend-icon":e.icons.mdiTelevisionGuide},scopedSlots:e._u([{key:"activator",fn:function(){return[a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:e._s("My Projects")}})],1)]},proxy:!0}])},e._l(e.projectList,(function(t,n){return a("v-list-item",{key:n},[a("v-icon",{staticClass:"mx-2"},[e._v(e._s(e.icons.mdiAccountGroup))]),a("v-list-item-content",[a("router-link",{staticClass:"d-flex align-center text-decoration-none black--text",attrs:{to:{name:"ProjectPage",params:{id:t.id,project:t,issuesList:e.issuesList,index:n}}}},[e._v(" "+e._s(t.title)+" ")])],1)],1)})),1)],1),a("nav-menu-link",{attrs:{title:"My Issues",to:{name:"MyIssues"},icon:e.icons.mdiBookEditOutline}}),a("nav-menu-link",{staticStyle:{position:"relative",top:"70px"},attrs:{title:"Account Settings",to:{name:"pages-account-settings"},icon:e.icons.mdiAccountCogOutline}}),a("nav-menu-link",{staticStyle:{position:"relative",top:"200px"},attrs:{title:"Create Project",to:{name:"CreateProject"},icon:e.icons.mdiPlusMinus}})],1)],1)},j=[],C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-list-group",{ref:"refVListGroup",staticClass:"vertical-nav-menu-group text--primary",scopedSlots:e._u([{key:"prependIcon",fn:function(){return[n("v-icon",{class:{"alternate-icon-small":!e.icon}},[e._v(" "+e._s(e.icon)+" ")])]},proxy:!0},{key:"activator",fn:function(){return[n("v-list-item-title",[e._v(" "+e._s(e.title)+" ")])]},proxy:!0}])},[e._t("default")],2)},w=[],P={props:{title:{type:String,required:!0},icon:{type:String,required:!0}},setup:function(){return{}}},L=P,V=(n("4951"),n("132d")),S=n("56b0"),I=n("5d23"),A=Object(f["a"])(L,C,w,!1,null,null,null),M=A.exports;h()(A,{VIcon:V["a"],VListGroup:S["a"],VListItemTitle:I["b"]});var E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-list-item",e._b({staticClass:"vertical-nav-menu-link",attrs:{"active-class":"bg-gradient-primary white--text"}},"v-list-item",e.$attrs,!1),[n("v-list-item-icon",[n("v-icon",{staticClass:"mx-auto",class:{"alternate-icon-small":!e.icon}},[e._v(" "+e._s(e.icon||e.alternateIcon)+" ")])],1),n("v-list-item-title",[e._v(" "+e._s(e.title)+" ")])],1)},T=[],F={props:{title:{type:String,required:!0},icon:{type:String,default:void 0}},setup:function(){return{alternateIcon:x["T"]}}},$=F,D=(n("1698"),n("da13")),B=n("34c3"),N=Object(f["a"])($,E,T,!1,null,"aafed2c8",null),G=N.exports;h()(N,{VIcon:V["a"],VListItem:D["a"],VListItemIcon:B["a"],VListItemTitle:I["b"]});var H=n("bc3a"),q=n.n(H),U={components:{NavMenuGroup:M,NavMenuLink:G},data:function(){return{projectList:[],issuesList:[]}},created:function(){this.getProjectList()},methods:{getProjectList:function(){var e=this;q.a.get("http://fadiserver.herokuapp.com/api/v1/my-projects/").then((function(t){e.projectList=t.data;for(var n=0;n<e.projectList.length;n++){var a=e.projectList[n].id;q.a.get("http://fadiserver.herokuapp.com/api/v1/my-issues/?projectid="+a).then((function(t){e.issuesList.push(t.data)})).catch((function(e){console.log(e)}))}})).catch((function(e){console.log(e)}))}},props:{isDrawerOpen:{type:Boolean,default:null}},setup:function(){return{icons:{mdiHomeOutline:x["zb"],mdiAlphaTBoxOutline:x["M"],mdiEyeOutline:x["pb"],mdiCreditCardOutline:x["gb"],mdiTable:x["Lb"],mdiFileOutline:x["sb"],mdiFormSelect:x["ub"],mdiAccountCogOutline:x["z"],mdiAccountGroup:x["B"],mdiAccountMultiple:x["C"],mdiTelevisionGuide:x["Mb"],mdiBookEditOutline:x["O"],mdiPlusMinus:x["Hb"]}}}},W=U,z=(n("3a6e"),n("adda")),J=n("8860"),K=n("f774"),Q=n("0789"),R=Object(f["a"])(W,_,j,!1,null,"888a3678",null),X=R.exports;h()(R,{VIcon:V["a"],VImg:z["a"],VList:J["a"],VListGroup:S["a"],VListItem:D["a"],VListItemContent:I["a"],VListItemTitle:I["b"],VNavigationDrawer:K["a"],VSlideXTransition:Q["d"]});var Y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-fade-transition",{attrs:{mode:"out-in"}},[n("v-icon",{key:e.$vuetify.theme.dark,on:{click:function(t){e.$vuetify.theme.dark=!e.$vuetify.theme.dark}}},[e._v(" "+e._s(e.$vuetify.theme.dark?e.icons.mdiWeatherSunny:e.icons.mdiWeatherNight)+" ")])],1)},Z=[],ee={setup:function(){return{icons:{mdiWeatherNight:x["Pb"],mdiWeatherSunny:x["Qb"]}}}},te=ee,ne=Object(f["a"])(te,Y,Z,!1,null,null,null),ae=ne.exports;h()(ne,{VFadeTransition:Q["c"],VIcon:V["a"]});var re=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("router-link",{attrs:{to:{name:"pages-login"}}},[n("v-icon",{staticStyle:{position:"relative","margin-left":"8px"}},[e._v(" "+e._s(e.icons.mdiLogoutVariant)+" ")])],1)},ce=[],ie={setup:function(){return{icons:{mdiAccountOutline:x["D"],mdiEmailOutline:x["mb"],mdiCheckboxMarkedOutline:x["U"],mdiChatOutline:x["R"],mdiCogOutline:x["db"],mdiCurrencyUsd:x["ib"],mdiHelpCircleOutline:x["yb"],mdiLogoutVariant:x["Fb"]}}}},oe=ie,ue=(n("cf72"),Object(f["a"])(oe,re,ce,!1,null,null,null)),se=ue.exports;h()(ue,{VIcon:V["a"]});var le={components:{VerticalNavMenu:X,ThemeSwitcher:ae,AppBarUserMenu:se},setup:function(){var e=Object(a["e"])(null);return{isDrawerOpen:e,icons:{mdiMagnify:x["Gb"],mdiBellOutline:x["N"],mdiGithub:x["vb"]}}}},de=le,pe=(n("0333"),n("40dc")),fe=n("5bc1"),me=n("2fa4"),he=n("8654"),ve=Object(f["a"])(de,y,O,!1,null,"fbdb30c6",null),be=ve.exports;h()(ve,{VApp:v["a"],VAppBar:pe["a"],VAppBarNavIcon:fe["a"],VMain:b["a"],VSpacer:me["a"],VTextField:he["a"]});var ke={components:{LayoutBlank:g,LayoutContent:be},setup:function(){var e=u(),t=e.route,n=Object(a["a"])((function(){return null===t.value.name?null:"blank"===t.value.meta.layout?"layout-blank":"layout-content"}));return{resolveLayout:n}}},ge=ke,ye=Object(f["a"])(ge,c,i,!1,null,null,null),Oe=ye.exports;h()(ye,{VApp:v["a"]});var xe=n("f309");n("67de");var _e={theme:{themes:{light:{primary:"#9155FD",accent:"#0d6efd",secondary:"#8A8D93",success:"#56CA00",info:"#16B1FF",warning:"#FFB400",error:"#FF4C51"},dark:{primary:"#9155FD",accent:"#0d6efd",secondary:"#8A8D93",success:"#56CA00",info:"#16B1FF",warning:"#FFB400",error:"#FF4C51"}}}};r["default"].use(xe["a"]);var je=new xe["a"]({preset:_e,icons:{iconfont:"mdiSvg"},theme:{options:{customProperties:!0,variations:!1}}}),Ce=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f"));r["default"].use(Ce["a"]);var we=[{path:"/",redirect:"dashboard"},{path:"/dashboard",name:"dashboard",component:function(){return Promise.all([n.e("chunk-12fd0ea8"),n.e("chunk-1287d802")]).then(n.bind(null,"5c3a"))}},{path:"/typography",name:"typography",component:function(){return Promise.all([n.e("chunk-12fd0ea8"),n.e("chunk-2d0e5bf3")]).then(n.bind(null,"9699"))}},{path:"/icons",name:"icons",component:function(){return n.e("chunk-8efdc3ec").then(n.bind(null,"af46"))}},{path:"/ProjectPage/:id",name:"ProjectPage",props:!0,component:function(){return Promise.all([n.e("chunk-1fc37de2"),n.e("chunk-2e0c3a73"),n.e("chunk-27c29d0c"),n.e("chunk-2d0a462b")]).then(n.bind(null,"05e5"))}},{path:"/MyIssues",name:"MyIssues",props:!0,component:function(){return Promise.all([n.e("chunk-1fc37de2"),n.e("chunk-27c29d0c"),n.e("chunk-2d0d3dd8")]).then(n.bind(null,"5f1b"))}},{path:"/IssuePage/:id",name:"IssuePage",props:!0,component:function(){return Promise.all([n.e("chunk-12fd0ea8"),n.e("chunk-cd677b82")]).then(n.bind(null,"8714"))}},{path:"/CreateProject",name:"CreateProject",component:function(){return Promise.all([n.e("chunk-12fd0ea8"),n.e("chunk-ef70153e")]).then(n.bind(null,"fb60"))}},{path:"/cards",name:"cards",component:function(){return Promise.all([n.e("chunk-12fd0ea8"),n.e("chunk-2e0c3a73"),n.e("chunk-304ff44a")]).then(n.bind(null,"85ca"))}},{path:"/simple-table",name:"simple-table",component:function(){return Promise.all([n.e("chunk-12fd0ea8"),n.e("chunk-d5293448")]).then(n.bind(null,"26b2"))}},{path:"/form-layouts",name:"form-layouts",component:function(){return Promise.all([n.e("chunk-12fd0ea8"),n.e("chunk-56aee8ec")]).then(n.bind(null,"0a6d"))}},{path:"/pages/account-settings",name:"pages-account-settings",component:function(){return Promise.all([n.e("chunk-12fd0ea8"),n.e("chunk-1fc37de2"),n.e("chunk-2e0c3a73"),n.e("chunk-635b7c34")]).then(n.bind(null,"d250"))}},{path:"/pages/login",name:"pages-login",component:function(){return Promise.all([n.e("chunk-4c60cefa"),n.e("chunk-216bad50")]).then(n.bind(null,"8b48"))},meta:{layout:"blank"}},{path:"/pages/register",name:"pages-register",component:function(){return Promise.all([n.e("chunk-4c60cefa"),n.e("chunk-62263386")]).then(n.bind(null,"aaf8"))},meta:{layout:"blank"}},{path:"/error-404",name:"error-404",component:function(){return n.e("chunk-1b42c010").then(n.bind(null,"dda8"))},meta:{layout:"blank"}},{path:"*",redirect:"error-404"}],Pe=new Ce["a"]({mode:"history",base:"/demo/materio-vuetify-vuejs-admin-template-free/demo/",routes:we}),Le=Pe,Ve=n("2f62");r["default"].use(Ve["a"]);var Se=new Ve["a"].Store({state:{},mutations:{},actions:{},modules:{}}),Ie=n("ba30"),Ae=n.n(Ie),Me=n("fcf4"),Ee=n("5f5b"),Te=n("b1e0");r["default"].config.productionTip=!1,r["default"].use(Ee["a"]),r["default"].use(Te["a"]),new r["default"]({router:Le,store:Se,ApexCharts:Ae.a,vuetify:je,colors:Me["a"],render:function(e){return e(Oe)}}).$mount("#app")},"614f":function(e,t,n){},6732:function(e,t,n){},"67de":function(e,t,n){},9711:function(e,t,n){},cf72:function(e,t,n){"use strict";n("9711")}});
//# sourceMappingURL=app.e4eb920f.js.map