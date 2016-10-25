const request = require( "request" );
const apikey = "39YAprx5Yi";

const makeRequest = ( url, cb ) => {
	// console.log( url );
	request( { url, json: true }, ( err, res, body ) => {
		if ( cb ) {
			return cb( err, body );
		}
		return null;
	} );
}

const replies = cb => {
	const url = `http://replygif.net/api/replies?api-key=${ apikey }`;
	return makeRequest( url, cb );
}

const tags = ( options, cb ) => {
	if ( !options || typeof options === "function" ) {
		const optionErr = new Error( "options is required" );
		if ( cb ) {
			return cb( optionErr );
		}
		throw optionErr;
	}
	if ( !options.title && !options.reply ) {
		const reqErr = new Error( "title or reply is required" );
		if ( cb ) {
			return cb( reqErr );
		}
		throw reqErr;
	}
	const title = options.title ? `&title=${ options.title }` : "";
	const reply = options.reply ? `&reply=${ options.reply }` : "";
	const reaction = options.reaction ? "&reaction=1" : "";
	const url = `http://replygif.net/api/tags?api-key=${ apikey }${ title }${ reply }${ reaction }`;
	return makeRequest( url, cb );
}

const getOperator = op => {
	if ( op ) {
		op = op.toLower();
		if ( op !== "and" && op !== "or" && op !== "not" ) {
			return "and";
		}
		return op;
	}
	return "and";
}

const gifs = ( options, cb ) => {
	if ( !options || typeof options === "function" ) {
		const optionErr = new Error( "options is required" );
		if ( cb ) {
			return cb( optionErr );
		}
		throw optionErr;
	}
	if ( !options.id && !options.tag && !options.reply ) {
		const reqErr = new Error( "id, tag or reply is required" );
		if ( cb ) {
			return cb( reqErr );
		}
		throw reqErr;
	}
	const id = options.id ? `&id=${ options.id }` : "";
	const tag = options.tag ? `&tag=${ options.tag }` : "";
	const tagOp = ( tag && tag.indexOf( "," ) > -1 ) ? `&tag-operator=${ getOperator( options.tagOperator ) }` : "";
	const reply = options.reply ? `&reply=${ options.reply }` : "";
	const replyOp = ( tag && tag.indexOf( "," ) > -1 ) ? `&reply-operator=${ getOperator( options.replyOperator ) }` : "";
	const url = `http://replygif.net/api/gifs?api-key=${ apikey }${ id }${ tag }${ tagOp }${ reply }${ replyOp }`;
	return makeRequest( url, cb );
}

module.exports = {
	gifs,
	replies,
	tags
};
