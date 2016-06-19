/* global describe, it */

import assert from 'power-assert';

import diff from '../../js/logics/diffTagManagerContainerVersions.js';

describe('logic', function() {
    describe('diffTagManagerContainerVersions()', function() {

        it('仮', function() {
            var fixtureA = require('./fixtures/sample-01-001.json'),
                fixtureB = require('./fixtures/sample-01-002.json');

            assert(diff(fixtureA, fixtureB));
        });
    });
});