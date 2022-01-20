'use strict';

const slack = require('../lib');
const nock = require('nock');

describe('slack', () => {
    const _slack = new slack.default()
    describe('slack operations', () => {
      const sourceOptions = { access_token: '123456' };
      test('#list_users', async () => {
        nock(`https://slack.com`).get('/api/users.list').reply(200, { body: "{}", message: 'ok' });
        const queryOptions = { operation: 'list_users' }
        const response = await _slack.run(sourceOptions, queryOptions);
        expect(response.status).toEqual('ok');
		  });

      test('#send_message', async () => {
        nock(`https://slack.com`).post('/api/chat.postMessage').reply(200, { body: "{}", message: 'ok' });
        const queryOptions = { operation: 'send_message', channel: 1, message: 'hello', sendAsUser: false }
        const response = await _slack.run(sourceOptions, queryOptions);
        expect(response.status).toEqual('ok');
		  });
    });
});
