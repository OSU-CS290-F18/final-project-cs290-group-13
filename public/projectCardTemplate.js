(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['projectCard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.post,depth0,{"name":"post","data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"project-card\" title="
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + ">\n        \r\n	<div class=\"project-header\">\n            \r\n		<a>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n            \r\n		<button type=\"button\" id=\""
    + alias4(((helper = (helper = helpers.button || (depth0 != null ? depth0.button : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button","hash":{},"data":data}) : helper)))
    + "\" class=\"post-expand-button\">\r\n			<i class=\"fa fa-plus\"></i>\r\n		</button>\n            \r\n		<button type=\"button\" id=\""
    + alias4(((helper = (helper = helpers.button10 || (depth0 != null ? depth0.button10 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button10","hash":{},"data":data}) : helper)))
    + "\" class=\"hidden post-close-button\">\r\n			<i class=\"fa fa-minus\"></i>\r\n		</button>\n        \r\n	</div>\n\n\n             \r\n	<div id=\"posts-backdrop\" class = \"posts-backdrop\" class=\"hidden\"></div>\n        \r\n	<div id=\"posts\" class=\"hidden posts\">\n            \r\n		<div class=\"posts-dialog\">\n\n  \r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.posts : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n        \r\n	</div>\n    \r\n</div>";
},"usePartial":true,"useData":true});
})();