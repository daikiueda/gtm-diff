import React from 'react';
import DiffVersionsCommon from './DiffVersionsCommon.js';

export default class DiffTagVersions extends DiffVersionsCommon {
    constructor() {
        super();
        this.elementType = 'tag';
    }
};
