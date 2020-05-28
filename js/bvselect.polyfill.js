/*
#
#  BVSelect - VanillaJS Fully Customizable Selectboxes
#  polyfill Version
#  Build: 1.2
#
#  Developed by Bruno Vieira
#
*/

"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var BVSelect=function(){function e(e){var t=e.selector,n=void 0===t?"defaultId":t,o=e.width,l=void 0===o?"100%":o,i=e.searchbox,r=void 0!==i&&i,s=e.offset,a=void 0===s||s,c=e.search_placeholder,d=void 0===c?"Search...":c,u=e.placeholder,m=void 0===u?"Select Option":u,y=Math.floor(1e4*Math.random())+0,p=d,f=m,h=0,g=[],_="";function v(){var e=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0),t=document.getElementById("ul_"+y).lastChild.getBoundingClientRect().top;Math.round(t+50)>Math.round(e)?(h=y,document.getElementById("ul_"+y).style.position="fixed",document.getElementById("ul_"+y).style.bottom="0px"):(h=0,document.getElementById("ul_"+y).style.position="absolute",document.getElementById("ul_"+y).style.bottom="")}this.selector=n.substring(1),this.searchbox=r,this.width=l,this.offset=a,this.randomID=y,this.search_placeholder,document.getElementById(this.selector).style.display="none",this.SetupListOptions=function(){for(var c=this,d=document.getElementById(this.selector),e=0;e<d.length;e++){var t,n,o,l=d[e].text,i=(d[e].value,d[e].disabled),r=d[e].getAttribute("data-separator"),s=d[e].getAttribute("data-img"),a=d[e].getAttribute("data-icon");t=1==i?"bv_disabled":"",n=r?"bv_separator":"",o=s?"<img src="+s+">":a?"<i class='"+a+"' aria-hidden='true'></i>":"",document.getElementById("ul_"+y).insertAdjacentHTML("beforeend","<li class='"+t+" "+n+"'  > "+o+" "+l+"</li>")}document.querySelectorAll("#ul_"+y+" li").forEach(function(a){a.addEventListener("click",function(e){var t,n=Array.from(a.parentNode.children).indexOf(a),o=document.getElementById(c.selector);if(t=1==c.searchbox?-1:"",!(a.classList.contains("bv_disabled")||a.classList.contains("nofocus")||a.classList.contains("bv_separator"))){if(o.attributes.multiple){var l,i="";if(event.preventDefault(),-1<g.indexOf(n)?(l=g.indexOf(n),g.splice(l,1),document.getElementById(c.selector)[n+t].selected=!1):g.push(n),0==g.length)i=f;else{for(var r=0;r<g.length;r++){var s=g[r];document.getElementById(c.selector).getElementsByTagName("option")[s+t].selected="selected",i+=", "+o[s-1].innerHTML}i=i.substring(2)}document.getElementById("main_"+y).innerHTML=i+"<i id='arrow_"+y+"' class='arrows_bv arrow down'></i>"}else document.getElementById(c.selector).getElementsByTagName("option")[n+t].selected="selected",null!=d.getAttribute("onchange")&&document.getElementById(c.selector).onchange(),document.getElementById("main_"+y).innerHTML=a.textContent+"<i id='arrow_"+y+"' class='arrows_bv arrow down'></i>",document.getElementById("ul_"+y).style.display="none";1==c.searchbox&&(document.getElementById("input_"+y).value="",Array.from(document.querySelectorAll("#ul_"+y+" li")).forEach(function(e){e.style.display="block"})),v()}})})},this.CriarDivBase=function(){document.getElementById(this.selector).insertAdjacentHTML("afterend",'<div id="bv_'+y+'" data-search="'+this.searchbox+'" class="bv_mainselect"></div>'),document.getElementById("bv_"+y).insertAdjacentHTML("afterbegin",'<div id="main_'+y+'" style="width:'+this.width+';" class="bv_atual bv_background"></div><ul id="ul_'+y+'" class="bv_ul_inner bv_background"></ul>');var o=document.getElementById("ul_"+y),e=(document.getElementById("bv_"+y),document.getElementById("main_"+y).offsetWidth);o.style.width=e+"px",1==this.searchbox&&document.querySelector("#ul_"+y).insertAdjacentHTML("afterbegin",'<li class="nofocus"><div class="innerinput"><input placeholder="'+p+'" class="bv_input" id="input_'+y+'" type="text"></div</li>');var t=document.getElementById(this.selector);if(t.attributes.multiple)_=f;else{for(var n,l=0;l<t.length;l++){""==t[l].getAttribute("selected")&&(n=1)}_=1==n?t.options[t.selectedIndex].text:f}document.getElementById("main_"+y).innerHTML=_+"<i id='arrow_"+y+"' class='arrows_bv arrow down'></i>",document.getElementById("main_"+y).addEventListener("click",function(){document.getElementById("ul_"+y).style.position="absolute",document.getElementById("ul_"+y).style.bottom="";var n,e,t=document.getElementById("main_"+y).offsetWidth;o.style.width=t+"px","block"==document.getElementById("ul_"+y).style.display?(document.getElementById("ul_"+y).style.display="none",Array.from(document.querySelectorAll(".arrows_bv")).forEach(function(e){e.classList.remove("up"),e.classList.add("down")})):(Array.from(document.querySelectorAll(".bv_ul_inner")).forEach(function(e){e.style.display="none"}),(n=document.getElementById("ul_"+y)).style.opacity=0,n.style.display=e||"block",function e(){var t=parseFloat(n.style.opacity);1<(t+=.1)||(n.style.opacity=t,requestAnimationFrame(e))}(),Array.from(document.querySelectorAll(".arrows_bv")).forEach(function(e){e.classList.remove("up"),e.classList.add("down")}),document.querySelector("#arrow_"+y).classList.remove("down"),document.querySelector("#arrow_"+y).classList.add("up")),1==a&&v()},!1),this.SetupListOptions()},this.CriarDivBase(),document.addEventListener("scroll",function(){var e,t;0!=h&&(e=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0),t=document.getElementById("main_"+y).lastChild.getBoundingClientRect().top,document.getElementById("ul_"+y).clientHeight<e-t&&v())},!1),1==this.searchbox&&document.getElementById("input_"+y).addEventListener("keyup",function(){var e,t=document.getElementById("input_"+y).value.toUpperCase(),n=document.getElementById("ul_"+y).getElementsByTagName("li");for(Array.from(document.querySelectorAll(".bv_separator")).forEach(function(e){e.style.display="none"}),e=0;e<n.length;e++)""==t?Array.from(document.querySelectorAll("#ul_"+y+" li")).forEach(function(e){e.style.display="block"}):-1<(n[e].innerText||n[e].textContent).toUpperCase().indexOf(t)&&!n[e].classList.contains("bv_separator")?n[e].style.display="":n[e].classList.contains("nofocus")||(n[e].style.display="none")},!1),document.addEventListener("click",function(e){e.target.closest(".bv_ul_inner")&&event.target.classList.contains("bv_input")||event.target.classList.contains("bv_input")||event.target.classList.contains("bv_atual")||"LI"!=event.target.nodeName&&(Array.from(document.querySelectorAll(".bv_ul_inner")).forEach(function(e){e.style.display="none"}),Array.from(document.querySelectorAll(".arrows_bv")).forEach(function(e){e.classList.remove("up"),e.classList.add("down")}),Array.from(document.querySelectorAll("#input_"+y)).forEach(function(e){e.value=""}),Array.from(document.querySelectorAll("#ul_"+y+" li")).forEach(function(e){e.style.display="block"}),document.getElementById("ul_"+y)&&(h=0,document.getElementById("ul_"+y).style.position="absolute",document.getElementById("ul_"+y).style.bottom=""))},!0)}var t=e.prototype;return t.Destroy=function(){document.getElementById("bv_"+this.randomID).remove(),document.getElementById(this.selector).style.display="block"},t.Update=function(){Array.from(document.querySelectorAll("#ul_"+this.randomID+" li")).forEach(function(e){e.classList.contains("nofocus")||e.remove()}),this.SetupListOptions()},t.GetID=function(){return this.randomID},t.Change=function(e){if(e.placeholder&&(document.getElementById("main_"+this.randomID).innerHTML=e.placeholder+"<i id='arrow_"+this.randomID+"' class='arrows_bv arrow down'></i>"),e.search_placeholder&&(document.getElementById("input_"+this.randomID).placeholder=e.search_placeholder),e.options&&"object"===_typeof(e.options)){document.querySelector("#"+this.selector).innerHTML="";for(var t=Object.keys(e.options).length,n=0;n<t;n++){var o=1==e.options[n].disabled?"disabled":"",l=1==e.options[n].separator?"data-separator='true'":"",i=e.options[n].img?"data-img='"+e.options[n].img+"'":"",r=e.options[n].icon?"data-icon='"+e.options[n].icon+"'":"";document.getElementById(this.selector).insertAdjacentHTML("beforeend","<option "+i+" "+r+" "+l+" "+o+" value="+e.options[n].value+" >"+e.options[n].inner_text+"</option>")}}else console.error("Options must be and Object. Read documentation.")},e}();