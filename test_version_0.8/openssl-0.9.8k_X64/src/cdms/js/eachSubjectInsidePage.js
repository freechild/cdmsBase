define(["pageView"], function(fnc) {
    let view = new fnc.pageFnc();
    let _commonFnc = view.getCommonFnc();
    let _memberFnc = view.getMemberFnc();
    let docu = document;
    _commonFnc._setAdd('/cdms')



    view.setNav({
      fileDownload : {name:"fileDownload" , id:".fileDownload", _event:"click",type: "POST", async: 'false' ,url:"BoardDownload"}
    })

    let _nav = view.getNav();
    view.setObservable({
      startForm : function(){

        // read One Board document
        this.readOneDocument();

        // write One Board document
        this.writeOneDocument();
      },

      writeModalFormDone : function(result){
        event.preventDefault();
        console.log(result);
      },
      fileDownload : function(){
        var url = event.target.href
        event.preventDefault();
        // url = url.split('eachSubjectInsidePage/')
        // console.log(url);
        let list ={};
        list.href = url;
        console.log(list);
        _commonFnc.$a(list,_nav['fileDownload']);
      },
      fileDownloadDone : function(result){
        event.preventDefault();
        console.log(result);
      }
      ,
      writeOneDocument : function(){
        $('#writeModal').on('hidden.bs.modal', function (event) {
          $(this)
           .find("input,textarea,select")
              .val('')
              .end()
        })
        $('#writeModalForm').on('submit', function (event) {
          event.preventDefault();
          var list =  $( this ).serialize();
          var myForm = document.getElementById('writeModalForm');

          var formData = new FormData(myForm);
          var curData = $('#urlValue').val();
          formData.append('page', curData);
          for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
          }
          $.ajax( {
            url: '/cdms/writeBoard',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            xhr: function(){
              var xhr = $.ajaxSettings.xhr();
              if ( xhr.upload ) {
                xhr.upload.onprogress = function(e){
                  if (e.lengthComputable) {
                    var percentage = (e.loaded / e.total) * 100;
                    var progressVal = Number(percentage);
                    var $div = $('.progress-bar');
                    var $span = $div.find('span');
                    $div.attr('aria-valuenow', progressVal);
                    $div.css('width', progressVal + '%');
                    $span.text(progressVal + '% Complete');
                  }
                }
                xhr.onerror = function(e) {
                  console.log('Error');
                  console.log(e);
                };
                xhr.onload = function() {
                  console.log(this.statusText);
                  console.log('done');
                };
              }
              return xhr;
            }
          }).done(function(result){
            if(result == true){
              alert('글쓰기 완료')
              $('#writeModal').modal('hide')
              $('.placeholder table').
              load(location.href+' .placeholder table >')
            }
          })
          // _commonFnc.$a(formData,_nav['writeModalForm'])
        })
      }
      ,
      readOneDocument : function(_result){
        var SendData = {name:"readOneDocument", type: "POST", async: 'true' ,url:"readOneDocument"}
        $('#readModal').on('show.bs.modal', function (event) {
          let button = $(event.relatedTarget) // Button that triggered the modal
          //let recipient = button.data('whatever') // Extract info from data-* attributes
          //let curData = location.href.split('eachSubjectInsidePage/')[1];
          let which_document_obj = {}
          which_document_obj.recipient = button.data('whatever');
          which_document_obj.curPage = $('#urlValue').val();


          _commonFnc.$a(which_document_obj,SendData)
        })
      }
      ,
      readOneDocumentDone : function(_result){
        $('#readModal #recipient-name').val(_result.name);
        $('#readModal #recipient-title').val(_result.title);
        $('#readModal #message-text').val(_result.content);
      }

    })
    return{
      init : view.init
    }
  })
