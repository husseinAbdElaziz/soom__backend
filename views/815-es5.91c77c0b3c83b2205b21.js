!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function r(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var u=c(this).constructor;n=Reflect.construct(r,arguments,u)}else n=r.apply(this,arguments);return o(this,n)}}function o(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}(self.webpackChunksoom=self.webpackChunksoom||[]).push([[815],{5808:function(o,c,u){u.r(c),u.d(c,{ActiveMailModule:function(){return w}});var i=u(8583),a=u(1472),f=u(5987),s=u(5106),l=u(9773),p=u(7716),h=u(9577);function v(t,e){if(1&t&&(p.ynx(0),p.TgZ(1,"div",2),p.TgZ(2,"h2",3),p._uU(3," \u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u062a\u0633\u062c\u064a\u0644\u0643 \u0628\u0646\u062c\u0627\u062d "),p.qZA(),p.TgZ(4,"h3",4),p._uU(5," \u0645\u0631\u062d\u0628\u0627\u064b \u0628\u0643 \u0641\u064a \u0633\u0648\u0645 "),p.qZA(),p.TgZ(6,"p"),p._uU(7," \u064a\u0645\u0643\u0646\u0643 \u0627\u0644\u0622\u0646 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0635\u0641\u0642\u0627\u062a\u060c \u0648\u0627\u0631\u0633\u0627\u0644 \u0645\u0632\u0627\u064a\u062f\u0627\u062a\u0643\u060c \u0627\u0633\u062a\u0645\u062a\u0639 \u0641\u064a \u0633\u0648\u0643 "),p.qZA(),p.qZA(),p.TgZ(8,"p"),p._uU(9),p.qZA(),p.BQk()),2&t){var n=p.oxw();p.xp6(9),p.hij(" \u0633\u064a\u062a\u0645 \u062a\u062d\u0648\u064a\u0644\u0643 \u0628\u0639\u062f ",n.currentCount," \u062b\u0648\u0627\u0646\u064a ")}}function y(t,e){1&t&&(p.ynx(0),p.TgZ(1,"div",5),p.TgZ(2,"h4",6),p._uU(3," \u0644\u0645 \u064a\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u062a\u0633\u062c\u064a\u0644\u0643 \u0645\u0646 \u0641\u0636\u0644\u0643 \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0627\u062e\u0631\u0649 "),p.qZA(),p.qZA(),p.BQk())}var g,d=((g=function(o){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}(f,o);var c,u,i,a=r(f);function f(e,n,r,o){var c;return t(this,f),(c=a.call(this)).activeRoute=e,c.router=n,c.authServ=r,c.ref=o,c.currentCount=5,c.showData=!1,c.showError=!1,c}return c=f,(u=[{key:"ngOnInit",value:function(){var t=this;this.setSubscription=this.activeRoute.queryParams.pipe((0,l.zg)(function(e){var n=e.userID,r=e.code;return t.authServ.verifyUser({userID:n,code:r})})).subscribe(function(e){if(console.log(e),e.success){t.showData=!0;var n=setInterval(function(){0===t.currentCount?(clearInterval(n),t.router.navigate(["/dashboard"])):t.currentCount--,t.ref.markForCheck()},1e3)}else t.showError=!0;t.ref.markForCheck()})}}])&&e(c.prototype,u),i&&e(c,i),f}(s.d)).\u0275fac=function(t){return new(t||g)(p.Y36(f.gz),p.Y36(f.F0),p.Y36(h.S),p.Y36(p.sBO))},g.\u0275cmp=p.Xpm({type:g,selectors:[["app-active-mail"]],features:[p.qOj],decls:3,vars:2,consts:[[1,"container","mt-3"],[4,"ngIf"],[1,"hello","py-5"],[1,"font-weight-bold"],[1,"font-weight-bold","my-3"],[1,"py-4"],[1,"text-danger"]],template:function(t,e){1&t&&(p.TgZ(0,"div",0),p.YNc(1,v,10,1,"ng-container",1),p.YNc(2,y,4,0,"ng-container",1),p.qZA()),2&t&&(p.xp6(1),p.Q6J("ngIf",e.showData),p.xp6(1),p.Q6J("ngIf",e.showError))},directives:[i.O5],styles:[".container[_ngcontent-%COMP%]{min-height:80vh}"],changeDetection:0}),g),b=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.oAB({type:e}),e.\u0275inj=p.cJS({imports:[[f.Bz.forChild([{path:"",pathMatch:"full",component:d}])]]}),e}(),w=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.oAB({type:e}),e.\u0275inj=p.cJS({imports:[[i.ez,a.m,b]]}),e}()}}])}();