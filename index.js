

(function() {

	MXU = function( form, data ) {

		let fels = form.elements;

		function form_get( name ) {
			return fels[ name ] ? fels[ name ].value : undefined;
		}
		function form_set( name, val ) {
			if( fels[ name ] ) fels[ name ].value  = val;
		}

		let p = new Proxy( data, {
			get: function( tgt, prop ) { //console.log("get");
				tgt[ prop ] = form_get( prop );
				return tgt[ prop ];
			},

			set: function( tgt, prop, val ) { //console.log("set");
				tgt[ prop ] = val;
				form_set( prop, val );
			},
		});

		for(let key in data ) {
			let e = fels[ key ];
			if( e ) {
				e.value = data[ key ];
				e.onchange = evt => { //log("changed");
					data[ key ] = e.value;
				}
			}
		}

		return p;

	};

})();



