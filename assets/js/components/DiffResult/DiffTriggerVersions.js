import React from 'react';
import DiffVersionsCommon from './DiffVersionsCommon.js';

export default class DiffTagVersions extends DiffVersionsCommon{

    createParticularRows( params ){
        switch( params[ 0 ] ){
            case 'filter':
                return this.createFilterRows( params );
            default:
                return super.createParticularRows( params );
        }
    }

    createFilterRows( params ){
        return null;

        return (
            <tr>
                <th>hoge</th>
                <td>hoge</td>
                <td>hoge</td>
            </tr>
        );
    }
};
