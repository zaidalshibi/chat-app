'use strict';

const router = require( 'express' ).Router();

const { db, User, Message, Room } = require( '../models' );

router.post( '/user', async ( req, res ) => {
    const { username } = req.body;
    try {
        const user = await User.findOne( { where: { username } } );
        if ( user ) {
            return res.status( 200 ).json( user );
        }
        const newUser = await User.create( { username } );
        return res.status( 201 ).json( newUser );
    } catch ( error ) {
        return res.status( 500 ).json( error );
    }
} );





module.exports = router;