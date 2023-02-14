// Copyright Abridged, Inc. 2023. All Rights Reserved.
// Node module: @collabland/example-hello-action
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect, givenHttpServerConfig} from '@loopback/testlab';
import {HelloActionApplication} from '../../application.js';
import {main as client} from '../../client.js';
import {main} from '../../server.js';
import {ApplicationCommandType} from '@collabland/discord';

describe('NiftyApes - ed25519', () => {
  let app: HelloActionApplication;
  let signingKey: string;

  before('setupApplication', async () => {
    const restConfig = givenHttpServerConfig({});
    ({app, signingKey} = await main({rest: restConfig}, 'ed25519'));
  });

  after(async () => {
    await app.stop();
  });

  it('invokes action with ecdsa signature', async () => {
    const result = await client(
      app.restServer.url + '/niftyapes',
      'ed25519:' + signingKey,
    );
    expect(result.metadata.applicationCommands).to.eql([
      {
        metadata: {
          name: 'NiftyApes Marketplace',
          shortName: 'niftyapes',
        },
        name: 'buy',
        type: ApplicationCommandType.ChatInput,
        description: 'Buy NFTs on the niftyapes.money marketplace',
      },
      {
        metadata: {
          name: 'NiftyApes Marketplace',
          shortName: 'niftyapes',
        },
        name: 'sell',
        type: ApplicationCommandType.ChatInput,
        description: 'Sell NFTs on the niftyapes.money marketplace',
      },
      {
        metadata: {
          name: 'NiftyApes Marketplace',
          shortName: 'niftyapes',
        },
        name: 'borrow',
        type: ApplicationCommandType.ChatInput,
        description: 'Use your NFTs as collateral',
      },
      {
        metadata: {
          name: 'NiftyApes Marketplace',
          shortName: 'niftyapes',
        },
        name: 'follow',
        type: ApplicationCommandType.ChatInput,
        description: 'Follow NiftyApes and never miss important news',
      },
    ]);
    expect(result.response).to.eql({
      type: 4,
      data: {content: 'Buy on niftyapes.money', flags: 64},
    });
  });
});
