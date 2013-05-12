//http://stackoverflow.com/questions/15035363/meteor-and-handlebars-each-to-iterate-over-object
Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

//http://stackoverflow.com/questions/10232574/handlebars-js-parse-object-instead-of-object-object
Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

   
Handlebars.registerHelper("each_with_index", function (array, data) {

    array = data.contexts[0][array];

    var buffer = "";
    for (var i = 0, j = array.length; i < j; i++) {
        var item = array[i];

        // if item is already an object just add the index property
        if (typeof (item) == 'object') {
            item['index'] = i;
        } else { // make an object and add the index property
            item = {
                value: item, // TODO: make the name of the item configurable
                index: i
            };
        }

        buffer += data.fn(item);
    }

    // return the finished buffer
    return buffer;
});

 Handlebars.registerHelper('dynamicResultTemplate', function(activity, options) {

 	var name = activity.structure.structureSlug + "Result"
	return new Handlebars.SafeString(Template[name](activity));
		

	

 });

