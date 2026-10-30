import React,{useState,useEffect,useRef} from "react";
import "./App.css";
import logo from "./images/logo.jpeg";
import kentLogo from "./images/kent-logo.png";
import sapphireIot from "./images/kent-sapphire-iot.webp";
import grandIot from "./images/kent-grand-iot.webp";
import sterling from "./images/kent-sterling-star-iot-black.webp";
import sapphire from "./images/kent-sapphire-black.webp";
import crystal from "./images/kent-crystal-alkaline-white.webp";
import maxxPlus from "./images/kent-maxx-plus.webp";
import maxx from "./images/kent-maxx.webp";

const LOGO=logo;
const PHONES=["96555 77666","96555 99666"];
const BRANCHES=["Salem","Coimbatore","Dharmapuri"];
// Edit prices here (Kent MRP, incl. taxes, indicative)
const P=[
{n:"Kent Sapphire IoT",tag:"IoT Enabled",img:sapphireIot,tech:"RO+UF+UV+Alkaline+Copper+TDS Control+UV in Tank",tank:"8 L",rate:"20 L/hr",mount:"Wall mount",price:"28,000",pts:["Real-time purity & filter-life display on app","Alkaline water (pH 8.0+) with copper","4 years free service"]},
{n:"Kent Grand IoT",tag:"IoT Enabled",img:grandIot,tech:"RO+UF+UV+Alkaline+Copper+TDS Control+UV in Tank",tank:"8 L",rate:"20 L/hr",mount:"Wall mount",price:"28,000",pts:["Digital display of purity, minerals & filter life","Automatic service call registration","4 years free service"]},
{n:"Kent Sterling IoT",tag:"Under-counter",img:sterling,tech:"RO+UF+UV+Alkaline+Copper+TDS Control",tank:"6 L",rate:"Hydrostatic tank",mount:"Under-the-counter",price:"29,000",pts:["Ideal for modular kitchens","Alkaline water (pH 8.0+) with copper","IoT alerts for filter & membrane life"]},
{n:"Kent Sapphire",tag:"Best Seller",img:sapphire,tech:"RO+UF+UV+Alkaline+Copper+TDS Control+UV in Tank",tank:"8 L",rate:"20 L/hr",mount:"Wall mount",price:"25,000",pts:["Retains essential minerals","Alkaline water (pH 8.0+) with copper","4 years free service"]},
{n:"Kent Crystal Alkaline",tag:"Mineral RO",img:crystal,tech:"RO+UV+UF+TDS Control+Alkaline+Copper",tank:"11 L",rate:"20 L/hr",mount:"Wall mount",price:"24,750",pts:["Zero water wastage, computer controlled","Mineral RO technology","4 years free service"]},
{n:"Kent Maxx Plus",tag:"UV+UF Alkaline",img:maxxPlus,tech:"UV+UF+Alkaline",tank:"7 L",rate:"UV + UF",mount:"Table / wall",price:"10,100",pts:["Best for low TDS water","Filter change & UV fail alarm","Transparent, detachable tank"]},
{n:"Kent Maxx",tag:"Value Pick",img:maxx,tech:"UV+UF Purification",tank:"7 L",rate:"60 L/hr",mount:"Table / wall",price:"10,000",pts:["Strong 11W UV lamp, double purification","LED power & purification indicators","Best suited for low TDS water"]}
];
const h=React.createElement;
function perView(){const w=window.innerWidth;return w>=1000?3:w>=640?2:1}
function Card({p}){return h("div",{className:"card"},
 h("div",{className:"pic"},h("img",{src:p.img,alt:p.n}),h("span",{className:"tag"},p.tag)),
 h("div",{className:"body"},h("h3",null,p.n),h("p",{className:"tech"},p.tech),
  h("div",{className:"sp"},h("div",null,"Tank",h("b",null,p.tank)),h("div",null,"Purification",h("b",null,p.rate)),h("div",{style:{gridColumn:"1/3"}},"Installation",h("b",null,p.mount))),
  h("ul",null,p.pts.map(x=>h("li",{key:x},x))),
  h("div",{className:"price"},h("b",null,"₹"+p.price),h("span",null,"Kent MRP, incl. taxes")),
  h("a",{className:"btn",href:"tel:+919655577666"},"Enquire: "+PHONES[0])))}
function Slider(){
 const[pv,setPv]=useState(perView()),[i,setI]=useState(0),[hold,setHold]=useState(false),sx=useRef(null);
 const max=P.length-pv;
 useEffect(()=>{const f=()=>setPv(perView());window.addEventListener("resize",f);return()=>window.removeEventListener("resize",f)},[]);
 useEffect(()=>{if(i>max)setI(max)},[pv]);
 useEffect(()=>{if(hold)return;const t=setInterval(()=>setI(x=>x>=P.length-perView()?0:x+1),3500);return()=>clearInterval(t)},[hold]);
 const go=d=>setI(x=>Math.max(0,Math.min(max,x+d)));
 const w=100/pv;
 return h("div",null,
  h("div",{className:"view",onMouseEnter:()=>setHold(true),onMouseLeave:()=>setHold(false),
   onTouchStart:e=>{sx.current=e.touches[0].clientX;setHold(true)},
   onTouchEnd:e=>{const d=e.changedTouches[0].clientX-sx.current;if(Math.abs(d)>40)go(d<0?1:-1);setHold(false)}},
   h("div",{className:"track",style:{transform:"translateX(-"+i*w+"%)"}},
    P.map(p=>h("div",{className:"slot",key:p.n,style:{width:w+"%"}},h(Card,{p}))))),
  h("div",{className:"nav"},
   h("button",{className:"arr","aria-label":"Previous",onClick:()=>go(-1)},"‹"),
   h("div",{className:"dots"},Array.from({length:max+1},(_,k)=>h("button",{key:k,"aria-label":"Slide "+(k+1),className:"dot"+(k===i?" on":""),onClick:()=>setI(k)}))),
   h("button",{className:"arr","aria-label":"Next",onClick:()=>go(1)},"›")))}
function Zoom(){
 const[i,setI]=useState(0),[hold,setHold]=useState(false);
 useEffect(()=>{if(hold)return;const t=setInterval(()=>setI(x=>(x+1)%P.length),4500);return()=>clearInterval(t)},[hold]);
 const p=P[i];
 return h("div",{onMouseEnter:()=>setHold(true),onMouseLeave:()=>setHold(false)},
  h("div",{className:"zs",key:i},
   h("div",{className:"zimg"},h("img",{src:p.img,alt:p.n})),
   h("div",{className:"zinfo"},h("span",{className:"tag",style:{position:"static"}},p.tag),h("h3",null,p.n),h("p",{className:"tech"},p.tech),
    h("div",{className:"sp"},h("div",null,"Tank",h("b",null,p.tank)),h("div",null,"Purification",h("b",null,p.rate)),h("div",{style:{gridColumn:"1/3"}},"Installation",h("b",null,p.mount))),
    h("ul",{style:{margin:"12px 0"}},p.pts.map(x=>h("li",{key:x},x))),
    h("div",{className:"price"},h("b",null,"₹"+p.price),h("span",null,"Kent MRP, incl. taxes")),
    h("a",{className:"btn",style:{marginTop:12},href:"tel:+919655577666"},"Enquire: "+PHONES[0]))),
  h("div",{className:"thumbs"},P.map((q,k)=>h("button",{key:q.n,"aria-label":q.n,className:"th"+(k===i?" on":""),onClick:()=>setI(k)},h("img",{src:q.img,alt:""})))))}
const D={
"Kent Sapphire IoT":{t:"IoT Enabled · Most Advanced RO Water Purifier",d:"Real-time display of water quality and filter life. Automatic service call registration in case of major faults and timely notifications of filter/membrane life. Service and parts replacement history available.",f:["Digital display of purity, minerals & filter life","Makes alkaline water (8.0+ pH) infused with goodness of copper","High purification rate of 20 L/hr","8 L purified water tank"],pu:"RO+UF+UV+Alkaline+Active Copper+TDS Control+UV in Tank",b:"Best suited for wall mounting"},
"Kent Grand IoT":{t:"IoT powered RO water purifier with goodness of active copper & alkaline",d:"Real-time display of water quality and filter life. Automatic service call registration in case of major faults and timely notifications of filter/membrane life. Service and parts replacement history available.",f:["Digital display of purity, minerals & filter life","Makes alkaline water (8.0+ pH) infused with goodness of copper","High purification rate of 20 L/hr","8 L purified water tank"],pu:"RO+UF+UV+Alkaline+Active Copper+TDS Control+UV in Tank",b:"Best suited for wall mounting"},
"Kent Sterling IoT":{t:"IoT powered under-the-counter RO water purifier with built-in hydrostatic tank",d:"Real-time display of water quality and filter life. Automatic service call registration in case of major faults and timely notifications of filter/membrane life.",f:["Digital display of purity, minerals & filter life","Makes alkaline water (8.0+ pH) & infused with goodness of copper","6 L purified water hydrostatic tank"],pu:"RO+UF+UV+Alkaline+Active Copper+TDS Control",b:"Best suited for under-the-counter installation in modular kitchens"},
"Kent Sapphire":{t:"RO water purifier with goodness of active copper and alkaline",d:"Compact wall-mounted purifier that keeps the essential minerals in your water healthy and safe.",f:["Makes alkaline water (8.0+ pH) & infused with goodness of copper","Retains essential minerals and makes water healthy","High purification rate of 20 L/hr","8 L purified water tank"],pu:"RO+UF+UV+Alkaline+Active Copper+TDS Control+UV in Tank",b:"Best suited for wall mounting"},
"Kent Crystal Alkaline":{t:"Mineral RO water purifier with zero water wastage",d:"Computer controlled purifier with auto flushing, removing bacteria, viruses, chemicals and dissolved impurities while retaining minerals.",f:["Zero water wastage with Mineral RO technology","Alkaline + copper enriched water","High purification rate of 20 L/hr","11 L purified water tank"],pu:"RO+UV+UF+TDS Control+Alkaline+Copper",b:"Best suited for wall mounting"},
"Kent Maxx Plus":{t:"UV + UF water purifier with alkaline, next-gen UV technology",d:"Double purification with UV + UF. Inline UV purification combined with UF helps remove bacteria and viruses.",f:["Alkaline water with UV + UF purification","Filter change alarm & UV fail alarm","Transparent, detachable tank","7 L purified water storage tank"],pu:"UV+UF+Alkaline",b:"Best suited for low TDS water"},
"Kent Maxx":{t:"UV + UF purifier with storage",d:"Double purification by UF + UV, giving disinfection from bacteria and viruses.",f:["Strong 11W UV lamp","Transparent, detachable tank for easy on-site cleaning","LED indicators for power and purification process on display","High purification capacity of 60 L/hr","7 L purified water storage tank"],pu:"UF+UV",b:"Best suited for low TDS water"}};
function Bro({p}){const x=D[p.n];return h("div",{className:"bro"},
 h("div",null,h("h3",null,h("b",null,"KENT "),p.n.replace("Kent ","")),h("p",{className:"bt"},x.t),h("p",{className:"bd"},x.d),h("p",{className:"bb"},x.b),
  h("div",{className:"price"},h("b",null,"₹"+p.price),h("span",null,"Kent MRP, incl. taxes")),
  h("a",{className:"btn",href:"tel:+919655577666"},"Enquire: "+PHONES[0])),
 h("div",null,h("h4",null,"FEATURES"),h("ul",null,x.f.map(y=>h("li",{key:y},y))),h("p",{className:"pl"},"Purification by:"),h("div",{className:"pb"},x.pu)))}
function Fan(){
 const n=P.length,[i,setI]=useState(0),[hold,setHold]=useState(false);
 useEffect(()=>{if(hold)return;const t=setInterval(()=>setI(x=>(x+1)%n),3000);return()=>clearInterval(t)},[hold]);
 const p=P[i],m=Math.floor(n/2);
 return h("div",{onMouseEnter:()=>setHold(true),onMouseLeave:()=>setHold(false)},
  h("div",{className:"fan"},P.map((q,k)=>{const d=((k-i+n+m)%n)-m,a=Math.abs(d);
   return h("div",{key:q.n,className:"fc",onClick:()=>setI(k),style:{zIndex:10-a,opacity:a>2?0:1,pointerEvents:a>2?"none":"auto",transform:"translateX(calc("+d+" * var(--sx))) translateY("+a*a*10+"px) rotate("+d*10+"deg) scale("+(d===0?1.06:1)+")"}},
    h("img",{src:q.img,alt:q.n}),h("div",null,q.n))})),
  h("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:14,marginTop:14}},
   h("button",{"aria-label":"Previous",onClick:()=>setI((i+n-1)%n),style:{width:42,height:42,borderRadius:"50%",border:0,background:"#1a9a9a",color:"#fff",fontSize:22,cursor:"pointer"}},"‹"),
   h("div",{style:{display:"flex",gap:7}},P.map((q,k)=>h("button",{key:q.n,"aria-label":q.n,onClick:()=>setI(k),style:{width:k===i?28:10,height:10,borderRadius:99,border:0,padding:0,cursor:"pointer",background:k===i?"#7cc242":"#d3e8e8",transition:"all .3s"}}))),
   h("button",{"aria-label":"Next",onClick:()=>setI((i+1)%n),style:{width:42,height:42,borderRadius:"50%",border:0,background:"#1a9a9a",color:"#fff",fontSize:22,cursor:"pointer"}},"›")),
  h(Bro,{p,key:i}))}
function App(){return h("div",null,
 h("header",null,h("div",{className:"wrap"},
  h("div",{className:"top"},
   h("img",{src:LOGO,alt:"Aakash Aqua Tech logo"}),
   h("div",{className:"nm"},h("h1",null,"Aakash Aqua Tech Pvt Ltd"),h("p",null,"Technology, the natural way · Kent Water Purifier Catalog")),
   h("div",{className:"a25"},h("div",{className:"n"},"25",h("sup",null,"th")),h("div",{className:"rb"},"ANNIVERSARY"))),
  h("div",{className:"badges"},
   h("span",{className:"badge"},"ISO Certified Company 9001:2015"),
   h("span",{className:"badge"},BRANCHES.join(" · ")),
   h("img",{src:kentLogo,alt:"KENT",className:"kl"})))),
 h("main",null,h("div",{className:"wrap"},
  h("div",{className:"sec"},h("h2",null,"Our Kent Water Purifiers"),h("p",{className:"sub"},"Pure, safe drinking water for every home."),h(Fan)),
  h("p",{className:"note"},"Prices shown are indicative Kent MRP (incl. taxes); offers and final prices may vary. Call us for the best price."),
  )),
 h("footer",null,"© Aakash Aqua Tech Pvt Ltd · 25 Years of Pure Trust · ",PHONES.join(" / ")))}
export default App;