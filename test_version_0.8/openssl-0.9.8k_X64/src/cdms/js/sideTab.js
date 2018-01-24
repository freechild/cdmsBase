define(["pageView","/javascripts/domReady.js",'modify',"AdminMode","eachSubject"], function(fnc,domReady,mod,AdminMode,eachSubject) {

  let view = new fnc.pageFnc();
  let _commonFnc = view.getCommonFnc();
  let _memberFnc = view.getMemberFnc();
  _commonFnc._setAdd('/cdms')

  view.setNav({
    AdminMode : {name:"AdminMode" ,id : "#AdminMode", _event : "click"},
    modify : {name:"modify" ,id : "#modify", _event : "click"},
    logout : {name:"logout" ,id : "#logout", _event : "click"},
    chart_div : {name:"chart_div",id:"#chart_div"},
  })

  let _nav = view.getNav();

  view.setObservable({
    startForm : function(){
      var $sideTab = $('.container-fluid .row .col-sm-3 col-md-2 sidebar');
      var sideTab = '.container-fluid > .row > .col-sm-3';

      // sidetab click event
      $(sideTab +'> .sidetab').on('click',function(event){
        event.preventDefault();
        if(event.target.id)
        _commonFnc._visible(sideTab +'> #' + event.target.id);
      })
      $(sideTab +'> ul > li > a').on('click',function(event){
        event.preventDefault();
        let link = '/cdms/eachSubject/'+event.target.id+','+event.target.innerHTML
        _commonFnc._movepage(true,link,eachSubject);
      })

    }
    ,
    chart_div : function(){

      var arr = [
                 ['Project', '자체', 'PM'],
                 ['기초튼튼! 실력쑥쑥!', 100, 50],
                 ['천천히 함께 걷기', 50, 30]
                ]
      var option = {
        title: '학습부진',
        chartArea: {width: '60%'},
        hAxis: {
          title: '전체 진행률',
          minValue: 0
        },
        vAxis: {
          title: 'Subject'
        }
      };
      var chartArea = document.getElementById('chart_div');
      //_commonFnc._chartMake(arr,option,chartArea);
    }
    ,
    SetPugData : function(i){
      PugData = i;
    }
    ,
    getPugData : function(){
      return PugData
    }
    ,
    modify : function(){
      // _commonFnc._movepage(true,event.target.href,mod)
      _commonFnc._movepage(true,'/cdms/modify',mod)
    }
    ,
    AdminMode : function(){
      _commonFnc._movepage(true,'/cdms/AdminMode',AdminMode);
    }
    ,
    logout : function(){
      _commonFnc._movepage(false,event.target.href);
    }
  })

  return{
    init : view.init
  }


})
