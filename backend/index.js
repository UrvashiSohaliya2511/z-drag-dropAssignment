const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cards = require( './componants/routes' );
const app = express();
const cors = require( 'cors' );
let port = 8080;

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( '/cards', cards );
app.get( "/", ( req, res ) => {
    res.send( "hello to  cards api" )
} );

app.listen( port, async () => {
    await mongoose.connect( "mongodb+srv://tlcass0123:l5Nx7S1UrhQFXZ7e@cluster0.cpayqlx.mongodb.net/?retryWrites=true&w=majority" )
    console.log( `Server is listening on `, port )
} );