define([], function() {

  var memberFnc = (function(){

    function chkMem(type,val,name){
      let array = [];
      let check_Eng= /[a-z]|[A-Z]/;
      let check_Num= /^[0-9]{6,11}$/g
      let check_Num_Eng= /[0-9]|[a-z]|[A-Z]/;
      let check_Pw = /^(?=.*[0-9])(?=.*[a-z])([A-Za-z\d!@#$%^&*()-_+=,./<>?]{6,20})$/;
      let check_kor = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i;
      let check_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let pattern = /\s/g;
      console.log(val);

      if(val=="" || val=="null" || val.match(pattern) || !val ){
        $('#' +name).focus();
        return '공백을 없이 입력해주세요';
      }else{
        if(type == "email"){
          if(!val.match(check_email)){
            //alert('이메일 형식이 틀렸습니다.')
            $('#' +name).focus();
            return '이메일 형식이 틀렸습니다.';
          }

        }else if(type == "pw"){
          //console.log(val.search(check_Pw));
          if(val.length < 6 || val.length > 21){
            //console.log('비밀번호가 길거나 짧습니다.')
            $('#' +name).focus();
            return '비밀번호가 길거나 짧습니다.';
          }
          else if(val.search(check_Pw) != 0){
            //alert('비밀번호는 영문 숫자를 혼합해주세요')
            $('#' +name).focus();
            return '비밀번호는 영문 숫자를 혼합해주세요';
          }
        }else if(type == "phone"){
          if(val.length < 6 || val.length > 12){
            //alert('휴대폰번호가 길거나 짧습니다..')
            $('#' +name).focus();
            return '휴대폰번호가 길거나 짧습니다.';
          }else if(val.search(check_Num) != 0){
            //alert('휴대폰은 숫자만 입력해주세요')
            $('#' +name).focus();
            return '휴대폰은 숫자만 입력해주세요';
          }
        }
      }

      return true;
    }

    return {
      _chkMem : chkMem
    }
  })
  return{
    memberFnc : memberFnc
  }
})
