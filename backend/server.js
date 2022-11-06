'use strict';

const {start} = require( './index' );
require( 'dotenv' ).config();
const PORT = process.env.PORT || 3001;

start( PORT );