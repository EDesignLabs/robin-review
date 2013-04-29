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

   
 Handlebars.registerHelper('dynamicResultTemplate', function(name, context, options) {
	name = name + "Result"
	if (Template[name])
		return new Handlebars.SafeString(Template[name](context));

	return "Temple not found";
 });