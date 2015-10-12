export default function diffTagManagerContainerVersions( versionA, versionB ){
    var result = {};

    result.this_is_dummy = [
        JSON.stringify( versionA ),
        JSON.stringify( versionB )
    ];

    return result;
}