import React from 'react';
import DiffVersionsCommon from './DiffVersionsCommon.js';

export default class DiffVariableVersions extends DiffVersionsCommon {
    constructor() {
        super();
        this.elementType = 'variable';
    }
};
