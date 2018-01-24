define([], function() {
  //commonFnc
  var commonFnc = (function(){
    var mainAddress ="/"
    let docu = document;
    let _nav = {},
    _Observable = {};
    // ajax
    let $ajx = function(data,target){
      $.ajax({
        url:mainAddress + "/" + target.url ,
        type:target.type,
        async:target.async,
        data:data
      }).done(function(result){
        let navigation = _Observable [target.name +"Done"](result); // Execute current event
      }).fail(function(){ console.log("error") })
    }


    let setMainAddress = function(add){
      mainAddress = add;
    }
    let getMainAddress = function(){
      return mainAddress;
    }

    let setNav = function(add){
      _nav = add;
    }

    let setObservable = function(add){
      _Observable = add;
    }

    let visible = function (layer){
        event.preventDefault();
        var chk = $(layer).is(":visible");
        (chk) ? $(layer).hide() : $(layer).show();
        return chk
    }
    let spritespin = function(obj){

      $(obj.ele).spritespin({
        source: SpriteSpin.sourceArray(obj.dir, { lane: obj.Imglane, frame: obj.Imgframe, digits: 2}) ,
        // width and height of the display
        width: obj.width,
        height: obj.height,
        // the number of lanes (vertical angles)
        lanes: obj.lanes,
        // the number of frames per lane (per vertical angle)
        frames: obj.frames,
        // interaction sensitivity (and direction) modifier for horizontal movement
        sense: obj.sense,
        // interaction sensitivity (and direction) modifier for vertical movement
        senseLane: obj.senseLane,

        // the initial lane number
        lane: obj.lane,
        // the initial frame number (within the lane)
        frame: obj.frame,
        // disable autostart of the animation
        animate: obj.animate
      });
    }

    function movepage(flag,link,statusFnc){
      event.preventDefault();
      if(flag){
        var temp = link;
        var split = temp.split('/');
        var url = temp.replace(split[split.length-1],'')
        history.pushState({}, "load", url);
        // history.pushState({}, "load", link);
      }
      var chk = link.split("cdms/");
      $('.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main').
         load(link+' .col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main >',
        function (responseText, textStatus, XMLHttpRequest) {
          if (textStatus == "success") {
               // all good!
            if(chk[1] == "logout"){
              history.pushState({}, "load", "/cdms");
              location.reload();
            }
            else{
              if(statusFnc != false)
                statusFnc.init();

            }
          }
          if (textStatus == "error") {
               // oh noes!
          }
      })


    }

    function chartMake(arr,options,chartArea){
      google.charts.load('current', {packages: ['corechart', 'bar']});
      google.charts.setOnLoadCallback(drawMultSeries);
      function drawMultSeries() {
        var data = google.visualization.arrayToDataTable(arr);
        var chart = new google.visualization.BarChart(chartArea);
        chart.draw(data, options);
      }
    }
    return{
      $a : $ajx,
      _setAdd : setMainAddress,
      _getAdd : getMainAddress,
      _setNav : setNav,
      _setObservable : setObservable,
      _visible : visible,
      _movepage : movepage,
      _chartMake : chartMake,
      _spritespin : spritespin
    }
  });
  return{
    commonFnc : commonFnc
  }
})
