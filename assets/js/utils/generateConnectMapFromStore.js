export default function generateConnectMapFromStore( store ){
    return function( state ){
        return Object.keys( store.getState() ).reduce( ( map, key ) => {
            map[ key ] = state[ key ];
            return map;
        }, {} );
    }
}