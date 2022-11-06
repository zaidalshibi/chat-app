'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();

app.use( cors() );
app.use( express.json() );



app.get( '/', ( req, res ) => {
    res.send( 'Hello World!' );
} );

function start(PORT) {
    app.listen( PORT, () => console.log( `Listening on port ${PORT}` ) );
}

module.exports = {
    app: app,
    start: start
};