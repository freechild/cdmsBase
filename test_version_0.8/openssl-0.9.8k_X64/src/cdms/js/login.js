define(["pageView"], function(fnc) {
  //let view = new fnc();
  let view = new fnc.pageFnc();
  let _commonFnc = view.getCommonFnc();
  let _memberFnc = view.getMemberFnc();
  _commonFnc._setAdd('/cdms')

  view.setNav({
    loginForm : {name:"loginForm" , id : "#loginForm", _event : "click", type: "POST", async: 'true' ,url:"loginForm"},
    membersForm : {name:"membersForm" , id: "#membersForm", _event : "click" , type: "POST", async: 'true' , url:"membersForm"},
    showJoinLayer : {name:"showJoinLayer" ,id: "#showJoinLayer" , _event : "click" ,_true :"login" , _false:"joinUS" },
    showLogLayer : {name:"showLogLayer" ,id: "#showLogLayer" , _event : "click" ,_true :"login" , _false:"joinUS" },
    inputEvent : {name:"inputEvent" ,id : "#joinLayer input", _event : "change", type: "POST", async: 'true',url:"valCheck"},
  })

  let _nav = view.getNav();

  view.setObservable({
    startForm : function(){
    }


    ,
    loginForm : function(_id){
      event.preventDefault();
      _commonFnc.$a(this.loginFormSet(),_nav[_id]);
    }
    ,
    loginFormSet : function(){
      let obj = {id : $('#loginId').val(), pw : $('#loginPw').val()};
      return obj;
    }
    ,
    loginFormDone : function(result){
      if(result.flag){
        return location.reload();
        console.log('log');
      }
      return alert('아이디 또는 비밀번호 틀림??');
    }
    ,
    inputEvent : function(_id){
      //console.log(event.target.id);
      let type  = event.target.id;
      type = type.replace('join',"");
      type = type.toLowerCase();
      let value = event.target.value;
      let flag = _memberFnc._chkMem(type,value,type);
      if(flag == true){
        $('#each'+type).html('사용가능합니다.')
        if(type =="id" || type == "email")
          _commonFnc.$a(this.inputEventSet(type,value),_nav[_id]);
      }else{
        $('#each'+type).html(flag)
      }
      console.log(flag);
    }
    ,
    inputEventSet : function(type,value){
      let obj = {type : type, value : value };
      return obj;
    }
    ,
    inputEventDone : function(result){
      let ele = $('#each' + result.type);
      (result.flag) ?  ele.html('사용가능합니다.') : ele.html('중복된 값입니다.')
    }
    ,
    // show layer
    showJoinLayer : function(){
      var chk = _commonFnc._visible('#joinLayer');
      _commonFnc._visible('#loginLayer');
    },
    showLogLayer : function(){
      var chk = _commonFnc._visible('#joinLayer');
      _commonFnc._visible('#loginLayer');
    },
    // add member
    membersFormSet : function(){
      let obj = {
        id : $('#joinId').val(),
        pw : $('#joinPw').val(),
        email : $('#joinEmail').val(),
        name : $('#joinName').val(),
        phone: $('#joinPhone').val(),
        company: $('#joinCompany').val()
      };
      return obj;
    }
    ,
    membersFormDone : function(result){
      if(result.flag){
        alert(result.result);
        location.reload();
        return;
      }
      return alert(result.result);
    }
    ,
    membersForm : function(_id){
      let id = _memberFnc._chkMem("id",$('#joinId').val(),"id");
      let pw = _memberFnc._chkMem("pw",$('#joinPw').val(),"pw");
      let email = _memberFnc._chkMem("email",$('#joinEmail').val(),"email");
      let name = _memberFnc._chkMem("name",$('#joinName').val(),"name");
      let phone = _memberFnc._chkMem("phone",$('#joinPhone').val(),"phone");
      let company = _memberFnc._chkMem("company",$('#joinCompany').val(),"company");
      if(id == true && pw == true && email == true && name == true && phone == true && company == true){
        _commonFnc.$a(this.membersFormSet(),_nav[_id]);
      }else{
        alert('회원가입 양식에 맞지않습니다.');
        $('#eachid').html(id);
        $('#eachpw').html(pw);
        $('#eachemail').html(email);
        $('#eachname').html(name);
        $('#eachphone').html(phone);
        $('#eachcompany').html(company);
      }
    }
  })

  view.init()

})
