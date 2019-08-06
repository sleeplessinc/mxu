

(function() {

	MXU = function( form, data ) {

		let fels = form.elements;

		function form_get( name ) {
			let e = fels[ name ];
			if( ! e ) 
				return undefined;
			if( e.type == "checkbox" )
				return e.checked;
			return e.value; 
		}
		function form_set( name, val ) {
			let e = fels[ name ];
			if( e ) {
				if( e.type == "checkbox" )
					e.checked  = !!val;
				else
					e.value  = val;
			}
		}

		let p = new Proxy( data, {
			get: function( tgt, prop ) {
				let v = form_get( prop );
				if( v !== undefined )
					tgt[ prop ] = v;
				return tgt[ prop ];
			},
			set: function( tgt, prop, val ) {
				tgt[ prop ] = val;
				form_set( prop, val );
			},
		});

		for(let key in data ) {
			let e = fels[ key ];
			if( e ) {
				let val = data[ key ];
				if( e.type == "checkbox" )
					e.checked = !! val;
				else
					e.value = val;
				e.onchange = evt => {
					p[ key ] = ( e.type == "checkbox" ) ? e.checked : e.value;
				}
			}
		}

		return p;

	};

})();



