require.config({
  baseUrl: "/cdms/js", // 모듈을 로딩할 기본 패스를 지정한다.
  waitSeconds: 15,
  shim:{
    'lodash' : {
      deps: ["/javascripts/jquery-3.0.0.min.zopfli.js.gz","https://www.gstatic.com/charts/loader.js"],
      exports:'Lodash'
    }
  }
});


require(
  [
    'lodash'
  ],
  function(){
    var js = $('#loadJS').val()
    require(["/javascripts/jquery-ui-1.9.2.custom.min.js","/bootstrap/js/bootstrap.min.js",js], function() {})
  }
 )
