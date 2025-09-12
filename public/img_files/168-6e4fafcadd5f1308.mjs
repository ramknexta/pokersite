"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[168],{720687:(e,t,n)=>{n.d(t,{default:()=>o});var i=n(934980);let a=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,o={css:(0,i.Ll)([a]),animation:"pulsing 2s infinite"}},934980:(e,t,n)=>{n.d(t,{CC:()=>a,Ll:()=>r,XF:()=>o});let i=(e,t,n)=>({x:Math.floor(e*Math.cos(n)),y:Math.floor(t*Math.sin(n))}),a=(e,t)=>i(t/2,e/2,2*Math.random()*Math.PI),o=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,r=e=>["@-webkit-keyframes","@keyframes"].map(t=>e.map(e=>t+" "+e).join("\n")).join("\n")},31723:(e,t,n)=>{n.r(t),n.d(t,{default:()=>S});var i=n(667294),a=n(883119),o=n(573706),r=n(986782);function l(e,t,n){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:i+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let s={},u=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class m{constructor(){l(this,"idMap",new Map),l(this,"objMap",new WeakMap)}get(e){let t=u(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=u(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=u(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}function p(e,t){return"number"==typeof e?e:"_lg1"===t?e[t]??e.lg??1:e[t]??1}var d=n(587435),c=n(39260),h=n(876594),g=n(720687),y=n(512541),f=n(785893);let{css:_,animation:b}=g.default,x={backgroundColor:h._VP,animation:b,borderRadius:h.Ev2};function v({data:e}){let{height:t}=e;return(0,f.jsxs)(i.Fragment,{children:[(0,f.jsx)(y.Z,{unsafeCSS:_}),(0,f.jsx)(a.xu,{dangerouslySetInlineStyle:{__style:x},"data-test-id":"skeleton-pin",children:(0,f.jsx)(a.xu,{height:t})})]})}var w=n(679482),C=n(297728),M=n(730212),$=n(410150),k=n(415787),j=n(855746);function S(e){let{align:t,cacheKey:n,id:l,isFetching:u,isGridCentered:h=!0,items:g,layout:_,loadItems:b,masonryRef:x,optOutFluidGridExperiment:S=!1,renderItem:E,scrollContainerRef:A,virtualize:R=!0,_getColumnSpanConfig:W,_getResponsiveModuleConfigForSecondItem:I,_dynamicHeights:F,useLoadingState:L,isLoadingAccessibilityLabel:N,isLoadedAccessibilityLabel:P}=e,V=(0,$.ZP)(),{isAuthenticated:G,isRTL:O}=(0,M.B)(),{logContextEvent:B}=(0,o.v)(),D=(0,C.F)(),H="desktop"===V,Z=(0,j.MM)(),T=((0,i.useRef)(g.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),H&&!S),{experimentalColumnWidth:z,experimentalGutter:X}=(0,d.Z)(T),q=e.serverRender??!!H,K="flexible"===_||"uniformRowFlexible"===_||"desktop"!==V||T,U=(K&&_?.startsWith("uniformRow")?"uniformRowFlexible":void 0)??(q?"serverRenderedFlexible":"flexible"),J=e.columnWidth??z??w.yF;K&&(J=Math.floor(J));let Q=e.gutterWidth??X??(H?w.oX:1),Y=e.minCols??w.yc,ee=((0,i.useRef)(0),J+Q),et=function(e){if(null==e)return;let t=function(e){let t=s[e];return t&&t.screenWidth===window.innerWidth||(s[e]={screenWidth:window.innerWidth}),s[e]}(e);return t.measurementCache||(t.measurementCache=new m),t.measurementCache}(n),en=(0,i.useCallback)(()=>A?.current||window,[A]),ei=(0,i.useRef)(!0),{anyEnabled:ea}=F?D.checkExperiment("dynamic_heights_v2"):{anyEnabled:!1},{anyEnabled:eo}=D.checkExperiment("web_masonry_enable_dynamic_heights_for_all"),{anyEnabled:er}=D.checkExperiment("web_masonry_pin_overlap_calculation_and_logging"),{anyEnabled:el,group:es}=D.checkExperiment("web_masonry_multicolumn_position_algoV2"),eu=h&&ei.current?"centered":"",{className:em,styles:ep}=function(e){let t=`m_${Object.keys(e).sort().reduce((t,n)=>{let i=e[n];return null==i||"object"==typeof i||"function"==typeof i?t:"boolean"==typeof i?t+(i?"t":"f"):t+i},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:i,isRTL:a,itemWidth:o,maxColumns:r,minColumns:l,items:s,_getColumnSpanConfig:u,_getResponsiveModuleConfigForSecondItem:m}=e,d=u?s.map((e,t)=>({index:t,columnSpanConfig:u(e)??1})).filter(e=>1!==e.columnSpanConfig):[],c=o+i,h=Array.from({length:r+1-l},(e,t)=>t+l).map(e=>{let h,g;let y=e===l?0:e*c,f=e===r?null:(e+1)*c-.01;u&&m&&s.length>1&&(h=u(s[0]),g=m(s[1]));let{styles:_,numberOfVisibleItems:b}=d.reduce((a,r)=>{let{columnSpanConfig:l}=r,u=Math.min(function({columnCount:e,columnSpanConfig:t,firstItemColumnSpanConfig:n,isFlexibleWidthItem:i,secondItemResponsiveModuleConfig:a}){let o=e<=2?"sm":e<=4?"md":e<=6?"_lg1":e<=8?"lg":"xl",r=p(t,o);if(i){let t=p(n,o);r="number"==typeof a?a:a?Math.max(a.min,Math.min(a.max,e-t)):1}return r}({columnCount:e,columnSpanConfig:l,isFlexibleWidthItem:!!g&&r===s[1],firstItemColumnSpanConfig:h??1,secondItemResponsiveModuleConfig:g??1}),e),m=null!=r.index&&a.numberOfVisibleItems>=u+r.index,d=n?100/e*u:o*u+i*(u-1),{numberOfVisibleItems:c}=a;return m?c-=u-1:r.index<c&&(c+=1),{styles:a.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:i,width:a,flexible:o}){let r="number"==typeof n?n:btoa(JSON.stringify(n));return o?`
      .${e} .static[data-column-span="${r}"]:nth-child(${t+1}) {
        visibility: ${i?"visible":"hidden"} !important;
        position: ${i?"inherit":"absolute"} !important;
        width: ${a}% !important;
      }`:`
      .${e} .static[data-column-span="${r}"]:nth-child(${t+1}) {
        visibility: ${i?"visible":"hidden"} !important;
        position: ${i?"inherit":"absolute"} !important;
        width: ${a}px !important;
      }`}({className:t,index:r.index,columnSpanConfig:l,visible:m,width:d,flexible:n})),numberOfVisibleItems:c}},{styles:"",numberOfVisibleItems:e}),x=n?`
      .${t} .static {
        box-sizing: border-box;
        width: calc(100% / ${e}) !important;
      }
    `:`
      .${t} {
        max-width: ${e*c}px;
      }

      .${t} .static {
        width: ${o}px !important;
      }
    `;return{minWidth:y,maxWidth:f,styles:`
      .${t} .static:nth-child(-n+${b}) {
        position: static !important;
        visibility: visible !important;
        float: ${a?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${i/2}px;
      }

      ${x}

      ${_}
    `}}),g=h.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),y=h.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),f=`
    ${g.join("")}
    @supports not (container-type: inline-size) {
      ${y.join("")}
    }
  `;return{className:t,styles:`
  .masonryContainer {
      container-type: inline-size;
    }

    .masonryContainer > .centered {
      margin-left: auto;
      margin-right: auto;
    }

    .${t} .static {
      position: absolute !important;
      visibility: hidden !important;
    }

    ${f}
  `}}({gutterWidth:Q,flexible:K,items:g,isRTL:O,itemWidth:J,maxColumns:e.maxColumns??Math.max(g.length,w.g5),minColumns:Y,_getColumnSpanConfig:W,_getResponsiveModuleConfigForSecondItem:I}),ed=`${eu} ${em}`.trim(),{anyEnabled:ec,expName:eh,group:eg,isMeasureAllEnabled:ey}=(0,c.Z)(),ef=((0,i.useRef)(),(0,i.useRef)(g.length)),e_=(0,i.useRef)(0),eb=(0,i.useRef)(null);(0,i.useEffect)(()=>{ef.current=g.length,e_.current+=1},[g]),(0,i.useEffect)(()=>{ei.current&&(ei.current=!1)},[]),(0,i.useEffect)(()=>()=>{},[]);let ex=(0,i.useCallback)(e=>{let t=e.reduce((e,t)=>e+t),n=t/e.length;(0,k.S0)("webapp.masonry.multiColumnWhitespace.average",n,{sampleRate:1,tags:{experimentalMasonryGroup:eg||"unknown",multicolumnLayoutAlgoV2Group:es||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),(0,k.S0)("webapp.masonry.twoColWhitespace",n,{sampleRate:1,tags:{columnWidth:J,minCols:Y}}),B({event_type:15878,component:14468,aux_data:{total_whitespace_px:t}}),B({event_type:16062,component:14468,aux_data:{average_whitespace_px:n}}),B({event_type:16063,component:14468,aux_data:{max_whitespace_px:Math.max(...e)}}),e.forEach(t=>{t>=50&&((0,k.nP)("webapp.masonry.multiColumnWhitespace.over50",{sampleRate:1,tags:{experimentalMasonryGroup:eg||"unknown",multicolumnLayoutAlgoV2Group:es||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),B({event_type:16261,component:14468})),t>=100&&((0,k.nP)("webapp.masonry.multiColumnWhitespace.over100",{sampleRate:1,tags:{experimentalMasonryGroup:eg||"unknown",multicolumnLayoutAlgoV2Group:es||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),B({event_type:16262,component:14468}))}),(0,k.nP)("webapp.masonry.multiColumnWhitespace.count",{sampleRate:1,tags:{experimentalMasonryGroup:eg||"unknown",multicolumnLayoutAlgoV2Group:es||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}})},[J,B,Y,G,Z,eg,es]),{_items:ev,_renderItem:ew}=function({initialLoadingStatePinCount:e=50,infiniteScrollPinCount:t=10,isFetching:n,items:a=[],renderItem:o,useLoadingState:r}){let l=a.filter(e=>"object"==typeof e&&null!==e&&"type"in e&&"closeup_module"===e.type).length>0,s=r&&n&&0===a.length,u=r&&n&&l&&1===a.length,m=r&&n&&a.length>(l?1:0),p=(0,i.useMemo)(()=>Array.from({length:m?t:e}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236,key:`skeleton-pin-${n}`,isSkeleton:!0}],[]),[e,t,m]);return{_items:(0,i.useMemo)(()=>u||m?[...a,...p]:s?p:a,[s,m,u,a,p]),_renderItem:(0,i.useMemo)(()=>r?e=>{let{itemIdx:t,data:n}=e;return t>=a.length&&n&&"object"==typeof n&&"key"in n&&"height"in n?(0,f.jsx)(v,{data:n},n.key):o(e)}:o,[r,o,a.length])}}({useLoadingState:L,items:g,renderItem:(0,i.useCallback)(e=>(0,f.jsx)(r.Z,{name:"MasonryItem",children:E(e)}),[E]),isFetching:u}),eC=L&&u;return(0,i.useEffect)(()=>{er&&requestAnimationFrame(()=>{let e=Array.from(eb.current?.querySelectorAll("[data-grid-item-idx]")??[]);if(0===e.length)return;let t=e.map(e=>{let t=e.getAttribute("data-grid-item-idx");return{rect:e.getBoundingClientRect(),itemIdx:t}});for(let e=0;e<t.length;e+=1){let n=t[e]?.rect;for(let i=e+1;i<t.length;i+=1){let e=t[i]?.rect;n&&e&&n.right>=e.left&&n.left<=e.right&&n.bottom>=e.top&&n.top<=e.bottom&&n.height>0&&e.height>0&&(0,k.nP)("webapp.masonry.pinOverlapHits",{sampleRate:1,tags:{isAuthenticated:G,isDesktop:H,experimentalMasonryGroup:eg||"unknown"}})}}})},[J,eg,G,H,er,g]),(0,f.jsxs)(i.Fragment,{children:[L&&!ei.current&&(0,f.jsx)(a.xu,{"aria-live":"polite",display:"visuallyHidden",children:eC?N:P}),(0,f.jsx)("div",{ref:eb,"aria-busy":L?!!eC:void 0,className:"masonryContainer","data-test-id":"masonry-container",id:l,style:T?{padding:`0 ${Q/2}px`}:void 0,children:(0,f.jsxs)("div",{className:ed,children:[q&&ei.current?(0,f.jsx)(y.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:ep}):null,(0,f.jsx)(a.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?ee*e.maxColumns:void 0,children:ec?(0,f.jsx)(a.GX,{ref:e=>{x&&(x.current=e)},_dynamicHeights:eo||F,_dynamicHeightsV2Experiment:ea,_getColumnSpanConfig:W,_getResponsiveModuleConfigForSecondItem:I,_logTwoColWhitespace:ex,_measureAll:ey,_multiColPositionAlgoV2:el,align:t,columnWidth:J,gutterWidth:Q,items:ev,layout:K?U:_??"basic",loadItems:b,measurementStore:et,minCols:Y,renderItem:ew,scrollContainer:en,virtualBufferFactor:.3,virtualize:R}):(0,f.jsx)(a.Rk,{ref:e=>{x&&(x.current=e)},_dynamicHeights:eo||F,_dynamicHeightsV2Experiment:ea,_getColumnSpanConfig:W,_getResponsiveModuleConfigForSecondItem:I,_logTwoColWhitespace:ex,_multiColPositionAlgoV2:el,align:t,columnWidth:J,gutterWidth:Q,items:ev,layout:K?U:_??"basic",loadItems:b,measurementStore:et,minCols:Y,renderItem:ew,scrollContainer:en,virtualBufferFactor:.3,virtualize:R})})]})})]})}},587435:(e,t,n)=>{n.d(t,{Z:()=>i});function i(e=!0){let t=e?16:void 0,n=t?Math.floor(t/4):void 0;return{experimentalColumnWidth:e?221:void 0,experimentalGutter:t,experimentalGutterBoints:n}}},39260:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(297728),a=n(730212),o=n(855746);function r(e){let{isAuthenticated:t}=(0,a.B)(),{expName:n,anyEnabled:r,group:l}=function({experimentsClient:e,handlerId:t,isAuthenticated:n,skipActivation:i}){let{checkExperiment:a}=e,o=a(n?"web_masonry_v2_auth":"web_masonry_v2_unauth",{dangerouslySkipActivation:i});return o.group?{expName:n?"web_masonry_v2_auth":"web_masonry_v2_unauth",...o}:"www/[username]/[slug].js"!==t||n?"www/pin/[id].js"!==t||n?{expName:"",anyEnabled:!1,group:""}:{expName:"web_masonry_v2_unauth_pin",...a("web_masonry_v2_unauth_pin",{dangerouslySkipActivation:i})}:{expName:"web_masonry_v2_unauth_board",...a("web_masonry_v2_unauth_board",{dangerouslySkipActivation:i})}}({experimentsClient:(0,i.F)(),handlerId:(0,o.MM)(),isAuthenticated:t,skipActivation:e?.skipActivation??!1});return{expName:n,anyEnabled:r,group:l,isMeasureAllEnabled:"enabled_measure_all"===l||"enabled_measure_all_impression_fix"===l,isImpressionFixEnabled:"control_impression_fix"===l||"enabled_impression_fix"===l||"enabled_measure_all_impression_fix"===l}}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/168-6e4fafcadd5f1308.mjs.map