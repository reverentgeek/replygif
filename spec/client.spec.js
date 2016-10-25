const client = require( "../" );
const chai = require( "chai" );
const should = chai.should();

describe( "Client integration tests", () => {
	it( "returns replies", done => {
		client.replies( ( err, replies ) => {
			should.not.exist( err );
			should.exist( replies );
			replies.should.be.an( "Array" );
			replies.length.should.be.above( 0 );
			const reply = replies[ 0 ];
			reply.should.have.property( "title" );
			reply.should.have.property( "id" );
			reply.should.have.property( "url" );
			reply.should.have.property( "count" );
			done();
		} );
	} );

	it( "gifs throws exception when no parameters supplied", done => {
		try {
			client.gifs();
			should.not.exist( true );
		} catch ( err ) {
			should.exist( err );
			err.toString().should.contain( "options is required" );
		} finally {
			done();
		}
	} );

	it( "gifs returns err when null options supplied", done => {
		client.gifs( null, ( err, gifs ) => {
			should.exist( err );
			should.not.exist( gifs );
			err.toString().should.contain( "options is required" );
			done();
		} );
	} );

	it( "gifs returns err when empty options supplied", done => {
		client.gifs( {}, ( err, gifs ) => {
			should.exist( err );
			should.not.exist( gifs );
			err.toString().should.contain( "id, tag or reply is required" );
			done();
		} );
	} );

	it( "gifs request with tag returns gifs", done => {
		const options = { tag: "yes" };
		client.gifs( options, ( err, gifs ) => {
			should.not.exist( err );
			should.exist( gifs );
			gifs.should.be.an( "Array" );
			gifs.length.should.be.above( 0 );
			const gif = gifs[ 0 ];
			gif.should.have.property( "id" );
			gif.should.have.property( "tags" ).and.is.a( "Array" );
			gif.should.have.property( "caption" );
			gif.should.have.property( "url" );
			gif.should.have.property( "file" );
			done();
		} );
	} );

	it( "gifs request with reply returns gifs", done => {
		const options = { reply: "yes" };
		client.gifs( options, ( err, gifs ) => {
			should.not.exist( err );
			should.exist( gifs );
			gifs.should.be.an( "Array" );
			gifs.length.should.be.above( 0 );
			const gif = gifs[ 0 ];
			gif.should.have.property( "id" );
			gif.should.have.property( "tags" ).and.is.a( "Array" );
			gif.should.have.property( "caption" );
			gif.should.have.property( "url" );
			gif.should.have.property( "file" );
			done();
		} );
	} );

	it( "gifs request with id returns gifs", done => {
		const options = { id: "1337" };
		client.gifs( options, ( err, gifs ) => {
			should.not.exist( err );
			should.exist( gifs );
			gifs.should.be.an( "Array" );
			gifs.length.should.equal( 1 );
			const gif = gifs[ 0 ];
			gif.should.have.property( "id" );
			gif.should.have.property( "tags" ).and.is.a( "Array" );
			gif.should.have.property( "caption" );
			gif.should.have.property( "url" );
			gif.should.have.property( "file" );
			done();
		} );
	} );

	// it( "gifs request with multiple id returns gifs", done => {
	// 	const options = { id: "1337,1568" };
	// 	client.gifs( options, ( err, gifs ) => {
	// 		should.not.exist( err );
	// 		should.exist( gifs );
	// 		gifs.should.be.an( "Array" );
	// 		gifs.length.should.equal( 2 );
	// 		const gif = gifs[ 0 ];
	// 		gif.should.have.property( "id" );
	// 		gif.should.have.property( "tags" ).and.is.a( "Array" );
	// 		gif.should.have.property( "caption" );
	// 		gif.should.have.property( "url" );
	// 		gif.should.have.property( "file" );
	// 		done();
	// 	} );
	// } );

	it( "tags throws exception when no parameters supplied", done => {
		try {
			client.tags();
			should.not.exist( true );
		} catch ( err ) {
			should.exist( err );
			err.toString().should.contain( "options is required" );
		} finally {
			done();
		}
	} );

	it( "tags returns err when no options supplied", done => {
		client.tags( null, ( err, tags ) => {
			should.exist( err );
			should.not.exist( tags );
			err.toString().should.contain( "options is required" );
			done();
		} );
	} );

	it( "tags returns err when no title and no reply supplied", done => {
		const options = { title: "" };
		client.tags( options, ( err, tags ) => {
			should.exist( err );
			should.not.exist( tags );
			err.toString().should.contain( "title or reply is required" );
			done();
		} );
	} );

	it( "tags request with title returns tags", done => {
		const options = { title: "yes" };
		client.tags( options, ( err, tags ) => {
			should.not.exist( err );
			should.exist( tags );
			tags.should.be.an( "Array" );
			tags.length.should.be.above( 0 );
			const tag = tags[ 0 ];
			tag.should.have.property( "title" );
			tag.should.have.property( "id" );
			tag.should.have.property( "reaction" ).and.is.a( "boolean" );
			tag.should.have.property( "url" );
			tag.should.have.property( "reply" );
			tag.should.have.property( "count" );
			done();
		} );
	} );

	it( "tags request with reply returns tags", done => {
		const options = { reply: "yes" };
		client.tags( options, ( err, tags ) => {
			should.not.exist( err );
			should.exist( tags );
			tags.should.be.an( "Array" );
			tags.length.should.be.above( 0 );
			const tag = tags[ 0 ];
			tag.should.have.property( "title" );
			tag.should.have.property( "id" );
			tag.should.have.property( "reaction" ).and.is.a( "boolean" );
			tag.should.have.property( "url" );
			tag.should.have.property( "reply" );
			tag.should.have.property( "count" );
			done();
		} );
	} );
} );
