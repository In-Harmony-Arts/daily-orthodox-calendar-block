const OCButton = ( { show, css, text, text_acc } ) => {
	if ( ! show ) return null;

	const classes = [ 'ocButton', css ].join( ' ' );

	return (
		<button type="button" className={ classes }>
			{ text_acc && (
				<span className="screen-reader-text">{ text_acc }</span>
			) }
			{ text }
		</button>
	);
};

export default OCButton;
