'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export skeincore-lib', function() {
    var skeincore = require('../');
    should.exist(skeincore.lib);
    should.exist(skeincore.lib.Transaction);
    should.exist(skeincore.lib.Block);
  });
});
