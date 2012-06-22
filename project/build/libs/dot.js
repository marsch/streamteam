(function(){function encodeHTMLSource(){var a={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},b=/&(?!\\w+;)|<|>|"|'|\//g;return function(c){return c?c.toString().replace(b,function(b){return a[b]||b}):c}}function resolveDefs(c,block,def){return(typeof block=="string"?block:block.toString()).replace(c.define||skip,function(m,code,assign,value){return code.indexOf("def.")===0&&(code=code.substring(4)),code in def||(assign===":"?def[code]=value:eval("def['"+code+"']="+value)),""}).replace(c.use||skip,function(m,code){var v=eval(code);return v?resolveDefs(c,v,def):v})}function unescape(a){return a.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var doT={version:"0.2.0",templateSettings:{evaluate:/\{\{([\s\S]+?)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1},template:undefined,compile:undefined},global=function(){return this||(0,eval)("this")}();typeof module!="undefined"&&module.exports?module.exports=doT:typeof define=="function"&&define.amd?define(function(){return doT}):global.doT=doT,global.encodeHTML=encodeHTMLSource();var startend={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},skip=/$^/;doT.template=function(a,b,c){b=b||doT.templateSettings;var d=b.append?startend.append:startend.split,e,f,g=0,h;if(b.use||b.define){var i=global.def;global.def=c||{},e=resolveDefs(b,a,global.def),global.def=i}else e=a;e=("var out='"+(b.strip?e.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):e).replace(/'|\\/g,"\\$&").replace(b.interpolate||skip,function(a,b){return d.start+unescape(b)+d.end}).replace(b.encode||skip,function(a,b){return f=!0,d.startencode+unescape(b)+d.end}).replace(b.conditional||skip,function(a,b,c){return b?c?"';}else if("+unescape(c)+"){out+='":"';}else{out+='":c?"';if("+unescape(c)+"){out+='":"';}out+='"}).replace(b.iterate||skip,function(a,b,c,d){return b?(g+=1,h=d||"i"+g,b=unescape(b),"';var arr"+g+"="+b+";if(arr"+g+"){var "+c+","+h+"=-1,l"+g+"=arr"+g+".length-1;while("+h+"<l"+g+"){"+c+"=arr"+g+"["+h+"+=1];out+='"):"';} } out+='"}).replace(b.evaluate||skip,function(a,b){return"';"+unescape(b)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|}|^|{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|}|^|{)out\+=''\+/g,"$1out+="),f&&b.selfcontained&&(e="var encodeHTML=("+encodeHTMLSource.toString()+"());"+e);try{return new Function(b.varname,e)}catch(j){throw typeof console!="undefined"&&console.log("Could not create a template function: "+e),j}},doT.compile=function(a,b){return doT.template(a,null,b)}})()