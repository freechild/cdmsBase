define(["pageView"], function(fnc) {
  // fnc.init()
  let view = new fnc.pageFnc();
  let _commonFnc = view.getCommonFnc();
  let _memberFnc = view.getMemberFnc();
  _commonFnc._setAdd('/cdms')

  let emailChk = true;

  view.setNav({
    inputEvent : {name:"inputEvent" ,id : ".eachValue", _event : "change", type: "POST", async: 'false',url:"valCheck"},
    modifyForm : {name:"modifyForm" , id: "#modifyBtn", _event : "click" , type: "POST", async: 'false' , url:"modify"},
  })

  let _nav = view.getNav();

  view.setObservable({
    startForm : function(){

    }
    ,
    inputEvent : function(_id){
      let type = event.target.id;
      let value = event.target.value;
      let flag = _memberFnc._chkMem(type,value,type);
      if(flag == true){
        $('#each'+type).html('사용가능합니다.')
        if(type == "email")
         if(value != $('#hiddenEmail').val()){
           _commonFnc.$a(this.inputEventSet(type,value),_nav[_id]);
         }
        }else{
          $('#each'+type).html(flag)
        }
    }
    ,
    inputEventSet : function(type,value){
      let obj = {type : type, value : value};
      return obj;
    }
    ,
    inputEventDone : function(result){
      let ele = $('#each' + result.type);
      if(result.flag){
        ele.html('사용가능합니다.')
        emailChk = true
      }else{
        ele.html('중복된 값입니다.')
        emailChk = false;
      }
    }
    ,
    modifyForm : function(_id){
      let flags = true;
      let obj = this.modifyFormSet();
      let pw = $('#pw').val()
      if(!pw){
        $('#eachpw').focus()
        $('#eachpw').html('비밀번호를 입력해주세요!');
        flags = false;
      }else{
        console.log('t');
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            let flag = _memberFnc._chkMem(key,obj[key],key);
            if(key =="email" && flag == true){
              if(obj[key] != $('#hiddenEmail').val()){
                _commonFnc.$a(this.inputEventSet("email",obj[key]),_nav["inputEvent"]);
              }else{
                emailChk = true;
              }
            }else if(flag != true){
              flags = false;
            }
          }
        }
      }
      if(flags&& emailChk)
        _commonFnc.$a(this.modifyFormSet(),_nav[_id]);
    }
    ,
    modifyFormSet : function(){
      let obj = {
        pw : $('#pw').val(),
        email : $('#email').val(),
        phone: $('#phone').val(),
        company: $('#company').val()
      };
      return obj;
    }
    ,
    modifyFormDone : function(result){
      (result.ok == 1) ? alert('수정완료!') : alert('error')
    }
  })
  return{
    init : view.init
  }

})
