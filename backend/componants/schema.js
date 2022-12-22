const mongoose = require( "mongoose" );

const eventSchema = new mongoose.Schema( {
    text: { type: String, required: true },
    category: { type: String, required: true, enum: [ "red", "black", "green", "blue" ] },
    order: { type: Number, required: true }

} );

const event = mongoose.model( 'card', eventSchema );
module.exports = event