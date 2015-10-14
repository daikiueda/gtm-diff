var expect = require( 'chai' ).expect;

var diff = require( '../../js/logics/diffTagManagerContainerVersions.js' );

describe( 'diffTagManagerContainerVersions', function(){

    it( 'テスト', function(){
        var fixtureA = require( './fixtures/sample-01-001.json' ),
            fixtureB = require( './fixtures/sample-01-002.json' );

        console.dir( diff( fixtureA, fixtureB ) );
    } );
} );