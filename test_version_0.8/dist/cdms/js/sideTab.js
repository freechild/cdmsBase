"use strict";define(["pageView","/javascripts/domReady.js","modify","AdminMode","eachSubject"],function(e,t,i,n,o){var a=new e.pageFnc,d=a.getCommonFnc();a.getMemberFnc();return d._setAdd("/cdms"),a.setNav({AdminMode:{name:"AdminMode",id:"#AdminMode",_event:"click"},modify:{name:"modify",id:"#modify",_event:"click"},logout:{name:"logout",id:"#logout",_event:"click"},chart_div:{name:"chart_div",id:"#chart_div"}}),a.getNav(),a.setObservable({startForm:function(){$(".container-fluid .row .col-sm-3 col-md-2 sidebar");var e=".container-fluid > .row > .col-sm-3";$(e+"> .sidetab").on("click",function(t){t.preventDefault(),t.target.id&&d._visible(e+"> #"+t.target.id)}),$(e+"> ul > li > a").on("click",function(e){e.preventDefault();var t="/cdms/eachSubject/"+e.target.id+","+e.target.innerHTML;d._movepage(!0,t,o)})},chart_div:function(){document.getElementById("chart_div")},SetPugData:function(e){PugData=e},getPugData:function(){return PugData},modify:function(){d._movepage(!0,"/cdms/modify",i)},AdminMode:function(){d._movepage(!0,"/cdms/AdminMode",n)},logout:function(){d._movepage(!1,event.target.href)}}),{init:a.init}});