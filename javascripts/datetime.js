!function(){this.DateTime=function(){function e(){}return e.formatTime=function(e){var t,r,n,a,u,i,o;return r=new Date(e),n=r.getHours(),o=r.getMinutes(),t=n>12?"pm":"am",a=n%12,u=10>o?"0":"",i=u+o,a+":"+i+t},e.formatDate=function(e){var t,r,n,a,u;return r=new Array("January","February","March","April","May","June","July","August","September","October","November","December"),t=new Date(e),n=t.getDate(),a=t.getMonth(),u=t.getFullYear(),n+" "+r[a]+" "+u},e}()}.call(this);