define(["pageView"], function(fnc) {
    let view = new fnc.pageFnc();
    let _commonFnc = view.getCommonFnc();
    let _memberFnc = view.getMemberFnc();
    let inputCount = 0;
    let $input;
    let projectNum;
    let docu = document;
    _commonFnc._setAdd('/cdms')

    let emailChk = true;
    let editProjectTemplate = function(){
      var html = "";
        html +='<div class="input-group">'
        html +=  '<input class="form-control" id="projectName" type="text" placeholder="EDIT Project Name">  '
        html +=  '<span class="input-group-btn">'
        html +=    '<button class="btn btn-default" id="editProjectName" type="button"> EDIT'
        html +='</span></div>'
        html +='<form class="navbar-form">'
        html +=  '<div class="form-group">'
        html += '</div></form>'

      return html
    }
    let inputTemplate = function(count,val){
      let html ="";
      html += '<div id="subject_' + count + '">'
      html +=   '<div class="input-group"><span class="input-group-btn">'
      html +=     '<button class="btn btn-default subject_addBtn" id="addSubjects_' + count + '" type="button">'
      if(count == 1)
        html +=       '<span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button></span>'
      else{
        html +=       '<span class="glyphicon glyphicon-minus-sign" aria-hidden="true" id="statusMinus_' + count + '"></span>'
        html +=       '<span class="glyphicon glyphicon-arrow-right" aria-hidden="true" id="statusNomal_' + count + '"></span>'
        html +=       '</button></span>'
      }
      if(_.isObject(val))
        html +=     '<input class="form-control" id="subjects_' + count + '" type="text" placeholder="Input Subject Name" value=' + val.subject + '>'
      else
        html +=     '<input class="form-control" id="subjects_' + count + '" type="text" placeholder="Input Subject Name">'
      html +=   '</div>'
      html +=   '<div class="input-group">'
      if(_.isObject(val))
        html +=     '<input class="form-control" id="countSubjects_' + count + '" type="text" placeholder="How many subjects?" value=' + val.count + '><span class="input-group-btn">'
      else
        html +=     '<input class="form-control" id="countSubjects_' + count + '" type="number" placeholder="How many subjects?"><span class="input-group-btn">'
      html +=       '<button class="btn btn-default subject_doneBtn" id="subjectsOk_' + count + '" type="button">'
      html +=         '<span class="glyphicon glyphicon-ok" aria-hidden="true" id="statusOk_' + count + '"></span>'
      html +=         '<span class="glyphicon glyphicon-arrow-down" aria-hidden="true" id="statusNone_' + count + '"></span>'
      html +=       '</button>'
      html +=       '<button class="btn btn-default subjectsList" id="subjectsList_' + count + '" type="button">'
      html +=         '<span class="glyphicon glyphicon-align-justify" aria-hidden="true" id="statusOpen_' + count + '"></span>'
      html +=       '</button></span>'
      html +=   '</div>'
      html +=  '</div>'
      html += '<div id="chapters_' + count + '">'
      html += '</div>'
      return html;
    }
    let chapterTemplate = function(count,subjectNum,doc){

      let html="";
        html +=   '<div class="input-group">'
        html +=     '<input class="form-control chapterForm" type="text" value="각 차시명을 입력해주세요" readonly="true">'
        html +=     '<span class="input-group-btn">'
        html +=       '<button class="btn btn-default" id=addChapters_' + subjectNum +'_' + count + ' type="button"> 수정'
        html +=   '</div><br>'
      for (var i = 1; i <= count; i++) {
        console.log('chapter_' + doc[i-1]);
        html +=   '<div class="input-group">'
        if(doc[i-1].chapter)
          html +=     '<input class="form-control chapterForm" id="chapter_' + doc[i-1]._id+ '" type="text" placeholder="each chapter name?"  value="' + doc[i-1].chapter + '">'
        else
          html +=     '<input class="form-control chapterForm" id="chapter_' + doc[i-1]._id + '" type="text" placeholder="each chapter name?" >'
        html +=   '</div><br>'
      }
      return html;
    }
    let userTemplate = function(doc){
      console.log(doc);
      let html ="";
      html += '<div class="input-group">'
      html +=   '<span class="input-group-addon" id="status" >가입상태</span>'
      html +=   '<input type="text" id="editStatus" class="form-control" placeholder="Username" aria-describedby="basic-addon1" value=' + doc.status + '>'
      html += '</div>'
      html += '<div class="input-group">'
      html +=   '<span class="input-group-addon">프로젝트</span>'
      if(doc.projectNum.length){
        let projectValue = doc.projectNum.toString()
        html +=   '<input type="text" id="editProjects" class="form-control" placeholder="프로젝트명 입력" aria-describedby="basic-addon1" value=' + projectValue+ '>'
      }else{
        html +=   '<input type="text" id="editProjects" class="form-control" placeholder="프로젝트명 입력" aria-describedby="basic-addon1" >'
      }
      html += '</div>'
      html += '<button id="editUserBtn_' + doc._id + '" class="btn btn-lg btn-primary btn-block" type="button">수정하기'
      return html
    }
    let statusFunc = function(that){
      for (var i = 1; i <= inputCount; ++i) {
        $('#subjectsList_' + i).off('click')
        $('#subjectsList_' + i).on('click',function(){
          that.showSubjectList(that);
        })
        if(inputCount == 1 ){
          $('#statusNone_'+ i ).hide();
          $('#statusOk_'+ i ).show();

        }
        else if(i == inputCount) {

          $('#addSubjects_' + inputCount).on('click',function(){
            that.subject_removeBtn(that)
          })
          $('#statusNomal_'+ i ).hide()
          $('#statusMinus_'+ i ).show();

          $('#statusNone_'+ i ).hide();
          $('#statusOk_'+ i ).show();
        }else{
          $('#statusNomal_'+ i ).show();
          $('#statusMinus_'+ i ).hide()

          $('#statusNone_'+ i ).show();
          $('#statusOk_'+ i ).hide();
        }
      }
      $('#addSubjects_1').off('click')
      $('#addSubjects_1').on('click',function(){
        that.subject_addBtn(that);
      })
      $('#subjectsOk_' + inputCount).on('click',function(){
        that.subjectsOk(that);
      })
    }
    view.setNav({
      addProject : {name:"addProject" , id : "#addProject", _event : "click", type: "POST", async: 'true' ,url:"addProject"},
        editProject : {name:"editProject" ,  _event : "click", type: "POST", async: 'true' ,url:"editProject"},
      searchProject : {name:"searchProject" , id : "#searchProject", _event : "click", type: "POST", async: 'true' ,url:"searchProject"},
        subjectsOk : {name:"subjectsOk" , _event : "click", type: "POST", async: 'true' ,url:"addSubjects"},
        showSubjectList : {name:"showSubjectList" ,  _event : "click", type: "POST", async: 'true' ,url:"searchProjectID"},
        addChapters : {name:"addChapters" ,_event : "click", type: "POST", async: 'true' ,url:"addChapters"},
      searchUser : {name:"searchUser" , id : "#searchUser", _event : "click", type: "POST", async: 'true' ,url:"searchUser"},
        editUser : {name:"editUser" ,  _event : "click", type: "POST", async: 'true' ,url:"editUser"},
    })

    let _nav = view.getNav();
    view.setObservable({
      startForm : function(){
        $("#accordion").accordion(
         {
          beforeActivate: function( event, ui )
          {
            $('#searchedUserLayer > .navbar-form > .form-group').empty()
            $('#searchedLayer').empty();
            //docu.getElementsByClassName('form-control').value="";
             $('.form-control').val("")
          }
          ,
          collapsible: true,
          heightStyle: "content"
         });
      }
      ,
      addChapters : function(that,targetID){
        let list = this.addChaptersSet(targetID);
        if(list == false){
          alert("각각의 주차명을 입력해주세요!")
        }else{
          _commonFnc.$a(list,_nav['addChapters']);
        }
      }
      ,
      addChaptersSet : function(targetID){
        let list = {}
        let curTaget = targetID.split('_')[1]
        let count =targetID.split('_')[2]
        let doc = document;
        list["count"] = count;
        for (var i = 1; i <= count; ++i) {
          let eachValue = doc.getElementById('chapter_'+projectNum+"_"+curTaget+"_"+i).value

          if(eachValue == "")
            return false;
          let obj = {};
          obj._id = projectNum+"_"+curTaget+"_"+i
          obj.chapter =  eachValue

          list["data_" + i] = JSON.stringify(obj)
        }
        return list;
      }
      ,
      addChaptersDone : function(result){
        (result == true) ? alert("수정완료") : alert(result)
      }
      ,
      showSubjectList : function(){
        let curTaget = event.target.id
        let targetNum = curTaget.split('_')[1];
        let $cur = $('#chapters_'+targetNum);

        let countSub = $('#countSubjects_'+ targetNum).val();
        if(countSub){
          let curEle = document.getElementById('chapters_'+targetNum);
          let chk = curEle.hasChildNodes()
          if(chk){
            document.getElementById("subjects_" +targetNum).readOnly = false;
            document.getElementById("countSubjects_" +targetNum).readOnly = false;
            $cur.empty();
          }else{
            _commonFnc.$a(this.showSubjectListSet(targetNum),_nav["showSubjectList"]);
          }
        }else{
          alert('fill in the blanks')
        }



      }
      ,
      showSubjectListSet : function(curTagetNum){
        let obj = {project : projectNum , curTaget : curTagetNum};
        return obj;
      }
      ,
      showSubjectListDone : function(result){
        let that = this;
        console.log(result.doc);
        var chapterCount = _.size(result.doc)
        if(chapterCount != 0){
          let html = chapterTemplate(chapterCount,result.curTaget,result.doc)
          document.getElementById("subjects_" +result.curTaget).readOnly = true;
          document.getElementById("countSubjects_" +result.curTaget).readOnly = true;

          let $cur = $('#chapters_'+result.curTaget);
          $cur.html(html);
          $('#addChapters_' + result.curTaget + '_' + chapterCount ).on('click',function(){
            that.addChapters(that,event.target.id)
          })


        }else{
          console.log('Add subject 1st');
        }
      }
      ,
      subjectsOk  : function(){
        let list = this.subjectsOkSet();
        if(list == false){
          alert("각각의 차시를 입력해주세요!")
        }else{
          _commonFnc.$a(list,_nav['subjectsOk']);
        }
      }
      ,
      subjectsOkSet : function(){
        let list = {}
        list["count"] = inputCount;
        list["project"] = projectNum;
        for (var i = 1; i <= inputCount; ++i) {
          if($('#subjects_' + i).val() == "" || $('#countSubjects_' + i).val() == "" )
            return false;
          let obj = {};
          obj._id = projectNum+"_"+i;
          obj.subject =  $('#subjects_' + i).val()
          obj.count = $('#countSubjects_' + i).val()
          list["data_" + i] = JSON.stringify(obj)
        }
        return list;
      }
      ,
      subjectsOkDone : function(result){
        (result == true) ? alert("수정완료") : alert(result)
      }
      ,
      subject_addBtn : function(){
        let that = this;
        if(inputCount > 1){
          $('#addSubjects_' + inputCount).off('click')
        }
        $('#subjectsOk_' + inputCount).off('click')
        ++inputCount;
        let html = inputTemplate(inputCount,false)
        $input.append(html);
        statusFunc(that);
      }
      ,
      subject_removeBtn : function(){
        let that = this;
        let eve = event.currentTarget.parentNode.parentNode.parentNode.id;
        --inputCount;
        $('#'+eve).remove();
        statusFunc(that);
      }
      ,
      addProject : function(_id){
        event.preventDefault();
        _commonFnc.$a(this.addProjectSet(),_nav[_id]);
      }
      ,
      addProjectSet : function(){
        let obj = {project : $('#project').val()};
        return obj;
      }
      ,
      addProjectDone : function(result){
        console.log(result);
      }
      ,
      searchProject : function(){
        event.preventDefault();
        var obj = this.searchProjectSet();
        (obj == false) ? alert('검색어를 입력해주세요') : _commonFnc.$a(obj,_nav["searchProject"]);
      }
      ,
      searchProjectSet : function(){
        let val = docu.getElementById('searchProjects').value
        let obj;
        (!val) ? obj = false : obj = {project : val};
        return obj;
      }
      ,
      searchProjectDone : function(result){
        inputCount = 0;
        let that = this;
        if(result.doc == null)
          alert('검색되는 프로젝트가 없습니다.')
        else{
          projectNum = result.doc._id;
          $("#searchedLayer").html(editProjectTemplate())
          //
          $("#editProjectName").on('click',function(){
              that.editProject(that,result.doc)
          })
          $input = $('#searchedLayer > .navbar-form > .form-group')
          $('#projectName').val(result.doc.project)

          if(_.size(result.doc.subjects) != 0){
            inputCount = _.size(result.doc.subjects);
            let htmlBuilt ="";
            let value;
            var i = 1;

            _.forEach(result.doc.subjects,function(val){
              value = _.defaults( {'subject':val.subject},{'count':val.count} )
              let html = inputTemplate(i,value)
              ++i;
              htmlBuilt += html;
            })
            $input.html(htmlBuilt)
            statusFunc(that);

          }else{
            ++inputCount;
            let html = inputTemplate(inputCount,false)

            $input.html(html);
            statusFunc(that);

          }
        }
      }
      ,
      searchUser : function(){
        event.preventDefault();
        var obj = this.searchUsertSet();
        (obj == false) ? alert('검색어를 입력해주세요') : _commonFnc.$a(obj,_nav["searchUser"]);
      }
      ,
      searchUsertSet : function(){
        let val = docu.getElementById('Users').value
        let obj;
        (!val) ? obj = false : obj = {id : val};
        return obj;
      }
      ,
      searchUserDone : function(result){
        let that = this
        if(result == false)
          alert('존재하지 않는 아이디입니다.')
        else {
          // docu.getElementsByClassName("container3").innerHTML = userTemplate();
          $('#searchedUserLayer > .navbar-form > .form-group').html(userTemplate(result.doc))
          $('#editUserBtn_' + result.doc._id).on('click',function(event){
            that.editUser(that,event.target.id)
          })
        }
      }
      ,
      editUser : function(that,id){
        event.preventDefault();
        var obj = this.editUserSet(id);
        if(obj != false)
          _commonFnc.$a(obj,_nav["editUser"]);

      }
      ,
      editUserSet : function(id){
        let Status = docu.getElementById('editStatus').value
        let ProjectNum = docu.getElementById('editProjects').value
        console.log(Status);
        let _Id = id.split('_')[1]
        let obj;
        //(!val) ? obj = false : obj = {id : val};
        if(!Status){
          alert('가입상태값을 기입해주세요')
          return false;
        }
        else if(Number(Status) !=0 && Number(Status) !=2 && Number(Status) !=3  ){
          alert('0(대기중),2(관리자) 또는 3(일반) 만 입력해주세요')
          return false;
        }
        (!ProjectNum) ? obj = {_id : _Id , status:Status} : obj = {_id : _Id , status:Status , projectNum : ProjectNum}
        return obj;
      }
      ,
      editUserDone : function(result){
        if(result !=true){
          console.log(result);
          let originalItem =  result.originalItem.toString();
          let removeItem = result.removeItem
          alert(removeItem + " 은(는) 없는 프로젝트입니다.")
          docu.getElementById('editProjects').value = originalItem
        }else{
          alert('수정완료')
        }
      }
      ,
      editProject : function(that,doc){
        event.preventDefault();
        var obj = this.editProjectSet(doc);
        if(obj)
          _commonFnc.$a(obj,_nav["editProject"]);
      }
      ,
      editProjectSet : function(doc){
        let val = docu.getElementById('projectName').value
        let obj;
        if(!val){
          alert("프로젝트명을 입력해주세요");
          return false
        }else{
           obj = {_id : doc._id,project:val}
        }
        return obj;
      }
      ,
      editProjectDone : function(result){
        if(result != true)
          alert(result)
        else{
          let fixedItem = docu.getElementById('projectName').value
          docu.getElementById('searchProjects').value = fixedItem
          alert("수정완료")
        }
      }
    })
    return{
      init : view.init
    }
  })
