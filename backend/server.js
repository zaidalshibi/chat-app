'use strict';

const { start } = require( './index' );
const { db } = require( './models' );
require( 'dotenv' ).config();
const PORT = process.env.PORT || 3001;


db.sync().then( () => {
    console.log( 'Database is connected' );
    start( PORT );
} );