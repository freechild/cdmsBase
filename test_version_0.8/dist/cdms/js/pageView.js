"use strict";define(["/javascripts/commonFnc.js","memberFnc"],function(n,e){return{pageFnc:function(){var t=n.commonFnc(),r=e.memberFnc(),c={},o={},i=function(n){n||(n=[]),n.forEach(function(n){var e=n._event;e?$(n.id).on(e,function(){o[n.name](n.name)}):o[n.name](n.name)})};return{init:function(){t._setNav(c),t._setObservable(o),o.startForm(),_.forEach(c,function(n,e){i([c[e]])})},setNav:function(n){c=n},setObservable:function(n){o=n},getNav:function(){return c},getObservable:function(){return o},refreshNavi:i,getCommonFnc:function(){return t},getMemberFnc:function(){return r}}}}});