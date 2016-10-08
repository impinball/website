!function(){"use strict";function t(t){return{href:t,config:m.route}}function e(t){return{view:function(){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);return t.apply(null,e)}}}function n(t){return null!=t&&/^[\w ,\-]+$/.test(t)}function r(t){return null!=t?t.split(/\s*,\s*/g):[]}function o(t){return t.replace(/&<"/g,function(t){return"&"===t?"&amp;":"<"===t?"&lt;":"&quot;"})}function a(){d=Object.create(null),y().forEach(function(t){t.tags.forEach(function(e){e=e.toLowerCase();var n=d[e]=d[e]||[];n.indexOf(t)<0&&n.push(t)})})}function i(t){if(null==d&&a(),!n(t))return[];var e=[],o=Object.create(null);return r(t.toLowerCase()).forEach(function(t){d[t]&&d[t].forEach(function(t){o[t.url]||(o[t.url]=!0,e.push(t))})}),e}function u(t){if(!I)try{var e=t?"/tags":m.route();I=!!t,window.ga("send","pageview",location.pathname+e)}catch(n){}}m.deferred.onerror=function(){var t=m.deferred.onerror;return function(e){try{console.error(e)}finally{return t(e)}}}();var s={controller:function(){var t=m.route.param("tag"),e=this;this.fail=m.prop(null!=t&&!n(t)),this.value=m.prop(null!=t?t:""),this.onsubmit=function(t){t=t||event,t.defaultPrevented||13!==(t.which||t.keyCode)&&"Enter"!==t.key||(t.preventDefault(),t.stopPropagation(),n(e.value())?m.route("/tags/"+encodeURIComponent(e.value())):e.fail(!0))}},view:function(t){return m(".tag-search",[m("label","Search by tag:"),m("input[type=text]",{value:t.value(),oninput:m.withAttr("value",t.value),onkeydown:t.onsubmit}),t.fail()?m(".warning",["Tags may only be a comma-separated list of phrases."]):null])}},l=e(function(){return m(".summary-header",[m(".summary-title","Posts, sorted by most recent."),m(s)])}),c={controller:function(t,e){if(n(e)){var o,a=r(e);if(1===a.length)o="'"+a[0]+"'";else if(2===a.length)o="'"+a[0]+"' or '"+a[1]+"'";else{var i=a.pop();o=a.map(function(t){return"'"+t+"'"}).join(", ")+", or '"+i+"'"}this.banner="Posts tagged "+o+" ("+t+" post"+(1===t?"":"s")+"):"}else this.banner="Invalid tag: '"+e+"'"},view:function(e){return m(".summary-header",[m(".summary-title",[m(".tag-title",e.banner),m("a.back",t("/"),["Back to posts ",m.trust("&#9658;")])]),m(s)])}},f=e(function(t,e,n){return m(".post-tags",[m("span","Tags:"),t.tags.map(function(t){return m("a.post-tag",{"class":e&&t===n?".post-tag-active":"",href:"/tags/"+t,config:m.route},t)})])}),p=e(function(t,e){return m(".feed",[t,m("a",{href:e},m("img.feed-icon[src=./feed-icon-16.gif]"))])}),h=e(function(e,n){var r=m.route.param("tag"),o=r&&r.toLowerCase();return m(".blog-summary",[m("p",["My ramblings about everything (religion, politics, ","coding, etc.)"]),m(".feeds",[m(p,"Atom","blog.atom.xml"),m(p,"RSS","blog.rss.xml")]),n?m(c,e.length,o):m(l),m(".blog-list",e.map(function(e){return m("a.blog-entry",t("/posts/"+e.url),[m(".post-date",e.date.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})),m(".post-stub",[m(".post-title",e.title),m(".post-preview",e.preview,"...")]),m(f,e,n,o)])}))])}),g=new marked.Renderer;g.code=function(t,e){return'<pre><code class="hljs hljs-'+e+'">'+hljs.highlight(e,t).value+"</code></pre>"},g.image=function(t,e,n){var r=/\s=\s*(\d*%?)\s*x\s*(\d*%?)\s*$/.exec(t);r&&(t=t.slice(0,-r[0].length));var a='<img src="'+o(t)+'" alt="'+o(n);return e&&(a+='" title="'+o(e)),r&&r[1]&&(a+='" height="'+r[1]),r&&r[2]&&(a+='" width="'+r[2]),a+'">'},marked.setOptions({sanitize:!0,renderer:g});var d,v={controller:function(t){var e=this.content=m.prop();m.request({method:"GET",url:"./blog/"+t.url,deserialize:function(t){return t}}).then(function(t){e(marked(t))&&m.redraw()})},view:function(e,n){return m(".blog-post",m(".blog-post-wrapper",[m("a.post-home",t("/"),"Home ",m.trust("&#9658;")),m("h3.post-title",n.title),m(".post-body",[null!=e.content()?m.trust(e.content()):m(".post-loading","Loading...")]),m(".post-footer",[m("a.post-home",t("/"),"Home ",m.trust("&#9658;")),m(f,n)])]))}},y=m.prop(),w=Object.create(null),b=m.deferred(),E=m.request({method:"GET",url:"./blog.json"}).then(function(t){return t.posts}).then(y).then(function(t){var e=6e4*((new Date).getTimezoneOffset()-300);t.forEach(function(t){t.date=new Date(Date.parse(t.date)+e),w[t.url]=t}),t.sort(function(t,e){return e.date-t.date})});document.addEventListener("DOMContentLoaded",function(){document.getElementById("blog").innerHTML="<p>Loading...</p><p>If this text doesn't disappear within a few seconds, you may have to reload the page, as the blog is loading slowly. If that doesn't help (as in you still see this message after reloading), then <a href='contact.html'>please tell me</a>. As soon as I get the message, I'll try to get it fixed as soon as I can.</p><p>If you happen to use GitHub, you can also tell me <a href='https://github.com/isiahmeadows/website'>here</a>, and if you'd like, feel free to help me fix whatever it is.</p>",b.resolve()});var I=!1;m.sync([E,b.promise]).then(function(){m.route.mode="hash",m.route(document.getElementById("blog"),"/",{"/":{controller:function(){u(!1)},view:function(){return m(h,y())}},"/posts/:post":{controller:function(){return{}.hasOwnProperty.call(w,m.route.param("post"))?u(!1):m.route("/",null,!0)},view:function(){return m(v,w[m.route.param("post")])}},"/tags/:tag":{controller:function(){u(!0)},view:function(){return m(h,i(m.route.param("tag")),!0)}}}),m.route(m.route())})}();