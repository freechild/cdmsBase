define(["/javascripts/commonFnc.js","sideTab",'modify',"AdminMode","eachSubject","eachSubjectInsidePage"], function(comm,side,modify,AdminMode,eachSubject,eachSubjectInsidePage) {
  let _commonFnc = comm.commonFnc();
  function get(fnc){
      return new Promise(function(resolve, reject) {
        if (fnc) {
          resolve("Stuff worked!");
        }
        else {
          reject(Error("It broke"));
        }
      })
  }


  get(side).then(function(result) {
    console.log(result); // "Stuff worked!"
    side.init();
  }, function(err) {
    console.log(err); // Error: "It broke"
  })

  window.addEventListener('popstate', function(event) {
    let curLocation_href = document.location.href
    let curLocation = curLocation_href.split("cdms/")[1];
    if(curLocation == ""){
      _commonFnc._movepage(false,curLocation_href,false)
    }else{

      curLocation = curLocation.split("/")
      let func;
      switch (curLocation[0]) {
        case "modify":
          func = modify;
          break;
        case "AdminMode":
          func = AdminMode;
          break;
        case "eachSubject" :
          func = eachSubject;
          break;
        case "eachSubjectInsidePage" :
          func = eachSubjectInsidePage;
          break;
      }
      console.log(func);
      _commonFnc._movepage(false,curLocation_href,func)
    }


  });

})
