
# MXU

MXU is a function that will tie a Javascript object to some user interface elements in the browser DOM.
It makes use of the ES6 Proxy feature.

## Install

	npm install mxu


## Usage

First get the index.js file into your browser page:

	<script src="node_modules/mxu/index.js"></script>


Create a "default" data object that contains some initial values:

	default_data = { title: "MXU Rules!", who: "Bob" }


Then build some DOM elements that have "name" attributes.  
These elements will be matched up to the properties in your default data:

	<div id=base>
		<h1 name=title></h1>
		Who: <input name=who type=text>
	</div>

Form type elements (INPUT, TEXTAREA, SELECT, etc.) will have their editable values initialized to your defaults.
Other kinds elements will have their innerHTML set to the default value.

Finally, call the MXU function to tie your UI to an object by giving it a base element and your default data.
It will return a new object that you can then use to get/set values that will be reflected into and out of, the UI.

	<script>
		let live_data = MXU( document.getElementById( "base" ), default_data );
	</script>


Once you have the live_data object, you can change what appears in the UI by simply setting the properties on the object:

	live_data.title = "New Title"	// changes the innerHTML of the H1 element
	live_data.who = "Suzy"			// changes the value attribute of the INPUT element


Now if you click in the INPUT field and change it to "Nancy" you can do this:

	name = live_data.who		// name == "Nancy"


You can also use JSON.stringify() to convert the live_data object to JSON.


## Example

See test.html for a working.


