!function(){this.DateTime=function(){function e(){}return e.formatTime=function(e){var t,r,n,u,a,i,o;return r=new Date(e),n=r.getHours(),o=r.getMinutes(),t=n>=12?"pm":"am",u=this.convert_military_hours(n),a=10>o?"0":"",i=a+o,u+":"+i+t},e.formatDate=function(e){var t,r,n,u,a;return r=new Array("January","February","March","April","May","June","July","August","September","October","November","December"),t=new Date(e),n=t.getDate(),u=t.getMonth(),a=t.getFullYear(),n+" "+r[u]+" "+a},e.convert_military_hours=function(e){return 0===e?12:12>=e?e:e%12},e}()}.call(this);