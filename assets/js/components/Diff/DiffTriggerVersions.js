import React from 'react';
import DiffVersionsCommon from './DiffVersionsCommon.js';
import {CLASS_NAME} from './ElementDataRow.js';

import isEqual from 'lodash.isequal';

export default class DiffTriggerVersions extends DiffVersionsCommon {

    constructor() {
        super();
        this.elementType = 'trigger';
    }

    createParticularRows(params) {
        switch (params[0]) {
            case 'filter':
            case 'autoEventFilter':
                return this.createFilterRows(params);
            default:
                return super.createParticularRows(params);
        }
    }

    createFilterRows(params) {
        var valueA = params[1],
            valueB = params[2];

        return (
            <tr className={[
                isEqual(valueA, valueB) ? CLASS_NAME.NOT_MODIFIED : CLASS_NAME.MODIFIED
            ].join(' ')}>
                <th>{params[ 0 ]}</th>
                <td>{DiffTriggerVersions.createFilterItemsList(valueA)}</td>
                <td>{DiffTriggerVersions.createFilterItemsList(valueB)}</td>
            </tr>
        );
    }
}

DiffTriggerVersions.createFilterItemsList = function(items) {
    if (!items) {
        return '';
    }

    return items.map(item => {
        var parameters = item.parameter.map(param => {
            return <dd>{param.value}</dd>;
        });
        return (
            <dl>
                <dt>{item.type}</dt>
                {parameters}
            </dl>
        );
    });
};