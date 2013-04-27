http://stackoverflow.com/questions/15035363/meteor-and-handlebars-each-to-iterate-over-object
Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

//http://stackoverflow.com/questions/10232574/handlebars-js-parse-object-instead-of-object-object
Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
