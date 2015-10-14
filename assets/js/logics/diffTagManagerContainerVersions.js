var isEqual = require( 'lodash.isequal' );

export default function diffTagManagerContainerVersions( versionA, versionB ){
    var result = {};
    [ 'tag', 'trigger', 'variable' ].forEach( type => {
        result[ type ] = diffElements( versionA[ type ], versionB[ type ], type );
    } );
    return result;
}

function diffElements( versionA, versionB, type ){
    var result = [];

    if( versionA ){
        if( !versionB ){
            result = versionA.map( ( elementA ) => {
                return [ true, elementA, null ];
            } );
        }
        else {
            versionA.forEach( ( elementA ) => {
                let id = elementA[ type + 'Id' ],
                    target = versionB.filter( ( elementB ) => { return elementB[ type + 'Id' ] === id }  );

                if( !target.length ){
                    result[ parseInt( id, 10 ) ] = [ true, elementA, null ];
                }
                else {
                    result[ parseInt( id, 10 ) ] = [ !isEqual( elementA, target[ 0 ] ), elementA, target[ 0 ] ];
                }
            } );
            versionB.forEach( ( elementB ) => {
                let id = elementB[ type + 'Id' ],
                    target = versionB.filter( ( elementA ) => { return elementA[ type + 'Id' ] === id }  );

                if( target.length === 0 ){
                    result[ parseInt( id, 10 ) ] = [ true, null, elementB ];
                }
            } );
        }
    }
    else if( versionB ){
        result = versionB.map( ( elementB ) => {
            return [ true, null, elementB ];
        } );
    }

    return result.length ? result: null;
}
