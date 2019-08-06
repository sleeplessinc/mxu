// Copyright 2019 - Sleepless Inc. - All Rights Reserved
(function() {

	let form_types = "input select textarea".toUpperCase().split( " " );

	MXU = function( base, data ) {

		function named_element( name ) {
			return base.querySelector( "[name="+name+"]" );
		}
		
		let proxy = new Proxy( data, {

			get: function( tgt, prop ) {
				let e = named_element( prop );
				if( e ) {
					let v;
					if( form_types.includes( e.tagName ) ) {
						if( e.type == "checkbox" ) {
							v = e.checked;
						}
						else {
							v = e.value;
						}
					}
					else {
						v = e.innerHTML;
					}
					tgt[ prop ] = v;
				}
				return tgt[ prop ];
			},

			set: function( tgt, prop, v ) {
				tgt[ prop ] = v;
				let e = named_element( prop );
				if( e ) {
					if( form_types.includes( e.tagName ) ) {
						if( e.type == "checkbox" ) {
							e.checked = !! v;
						}
						else {
							e.value = v;
						}
					}
					else {
						e.innerHTML = v;
					}
				}
			},

		});

		for(let key in data ) {
			proxy[ key ] = data[ key ];
			let e = named_element( key );
			if( form_types.includes( e.tagName ) ) {
				e.onchange = evt => {
					proxy[ key ] = e.value;
				}
			}
		}

		return proxy;
	};

})();



