const express = require( 'express' );
const cards = require( "./schema" )
const app = express.Router();


app.get( '/', async ( req, res ) => {
    try {
        let red = await cards.find( { category: "red" } ).sort( { order: 1 } );
        let blue = await cards.find( { category: "blue" } ).sort( { order: 1 } );
        let black = await cards.find( { category: "black" } ).sort( { order: 1 } );
        let gn = await cards.find( { category: "green" } ).sort( { order: 1 } );

        res.send( { red: red, blue: blue, green: gn, black: black } );
    } catch ( e ) {
        res.send( e );
    }
} );


app.post( '/', async ( req, res ) => {
    try {

        await cards.create( req.body );
        res.status( 200 ).send( 'cards created' )
    } catch ( e ) {
        res.send( e );
    }
} );

app.patch( '/:id', async ( req, res ) => {
    let { id } = req.params;

    try {
        let res = await cards.findByIdAndUpdate( id, req.body );
        res.status( 200 ).send( "cards updated successfully" )
    } catch ( e ) {

        res.send( e )
    }

} );

app.delete( '/:id', async ( req, res ) => {
    let { id } = req.params;

    try {
        let res = await cards.findByIdAndDelete( id );
        res.status( 200 ).send( "cards updated successfully" )
    } catch ( e ) {
        res.send( e )
    }

} );

module.exports = app;