(function(){require.config({paths:{lodash:"../vendor/lodash",rsvp:"../vendor/rsvp",react:"../vendor/react"}}),require(["react","./app","../vendor/fastclick"],function(e,n,r){return r.attach(document.body),e.renderComponent(n(),document.getElementById("container"))})}).call(this);