/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 24.08.2020 12:59:00
 * @ Modified by: Tim Koepsel
 * @ Modified time: 01.12.2020 14:39:46
 * @ Description:
 */

import 'mocha';
import Server from '../../server';

import * as config from '../../server/api/cfg/config.json'

const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Api Authentication', function() {
    config.apikeys.forEach(element => {
        it(`Is Api Key for ${element.User} valid?`, function(done) {
            chai.request(Server)
            .get('/api/v1/core/status')
            .set('token', element.Key)
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
            });
          });
    });
})