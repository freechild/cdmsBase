define(["pageView","eachSubjectInsidePage"], function(fnc,eachSubjectInsidePage) {
    let view = new fnc.pageFnc();
    let _commonFnc = view.getCommonFnc();
    let _memberFnc = view.getMemberFnc();
    let docu = document;
    _commonFnc._setAdd('/cdms')




    view.setNav({

    })

    let _nav = view.getNav();
    view.setObservable({
      startForm : function(){
        $('tbody > tr > td > a').on('click',function(event){
          event.preventDefault();
          let parent = event.target.parentNode.parentNode.id + "," + event.target.parentNode.id
          let link = '/cdms/eachSubjectInsidePage/' +parent
          _commonFnc._movepage(true,link,eachSubjectInsidePage);
        })
      }

    })
    return{
      init : view.init
    }
  })
