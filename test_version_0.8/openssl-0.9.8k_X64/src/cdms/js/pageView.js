define(["/javascripts/commonFnc.js","memberFnc"], function(comm,mem) {
  var pageFnc = (function(){
    let _commonFnc = comm.commonFnc();
    let _memberFnc = mem.memberFnc();
    let _nav = {};
    let _Observable = {};

    let refresh = function(navigation){
      refreshNavi(navigation);
    };

    let refreshNavi = function(navigation){
      if (!navigation) navigation = [];
      navigation.forEach(function(action){
        let ac = action._event;
        if(ac){
          $(action.id).on(ac,function(){
            let navigation = _Observable [action.name](action.name); // Execute current event
          })
        }else{
          let navigation = _Observable [action.name](action.name); // Execute current event
        }
      })
    }
    let getNav = function(){
      return _nav;
    }
    let setNav = function(i){
      _nav = i;
    }
    let getObservable = function(){
      return _Observable;
    }
    let setObservable = function(i){
      _Observable = i;
    }
    let getCommonFnc = function(){
      return _commonFnc;
    }
    let getMemberFnc = function(){
      return _memberFnc;
    }
    let init = function(){
      _commonFnc._setNav(_nav);
      _commonFnc._setObservable(_Observable);

      _Observable.startForm();
      _.forEach(_nav, function(value, key) {
          refreshNavi([_nav[key]])
      });
    }
    return{
      init : init,
      setNav : setNav,
      setObservable : setObservable,
      getNav : getNav,
      getObservable : getObservable,
      refreshNavi : refreshNavi,
      getCommonFnc : getCommonFnc,
      getMemberFnc : getMemberFnc
    }
  })

  return{
    pageFnc:pageFnc
  }
})
