export default function loadScriptAsync( srcURL ){
    var scriptElm = document.createElement( 'script' ),
        existedSibling = document.getElementsByTagName( 'script' )[ 0 ];

    scriptElm.src = srcURL;
    scriptElm.async = true;
    existedSibling.parentNode.insertBefore( scriptElm, existedSibling );
}