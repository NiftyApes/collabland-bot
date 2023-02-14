// Copyright Abridged, Inc. 2023. All Rights Reserved.
// Node module: @collabland/example-hello-action
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  APIChatInputApplicationCommandInteraction,
  ApplicationCommandSpec,
  ApplicationCommandType,
  BaseDiscordActionController,
  buildSimpleResponse,
  DiscordActionMetadata,
  DiscordActionRequest,
  DiscordActionResponse,
  DiscordInteractionPattern,
  InteractionType,
} from '@collabland/discord';

import {MiniAppManifest} from '@collabland/models';
import {BindingScope, injectable} from '@loopback/core';
import {api} from '@loopback/rest';


const BUY_ACTION = 'buy';
const SELL_ACTION = 'sell';
const BORROW_ACTION = 'borrow';
const FOLLOW_ACTION = 'follow';

/**
 * HelloActionController is a LoopBack REST API controller that exposes endpoints
 * to support Collab.Land actions for Discord interactions.
 */
@injectable({
  scope: BindingScope.SINGLETON,
})
@api({basePath: '/niftyapes'})
export class NiftyapesController extends BaseDiscordActionController<APIChatInputApplicationCommandInteraction> {
  /**
   * Expose metadata for the action
   * @returns
   */
  async getMetadata(): Promise<DiscordActionMetadata> {
    const metadata: DiscordActionMetadata = {
      /**
       * Miniapp manifest
       */
      manifest: new MiniAppManifest({
        appId: 'niftyapes',
        developer: 'NiftyApes',
        name: 'NiftyApes Marketplace',
        platforms: ['discord'],
        shortName: 'niftyapes',
        version: {name: '0.0.1'},
        website: 'https://niftyapes.money',
        description: 'Buy, Sell, Borrow from the NiftyApes protocol. ',
      }),
      /**
       * Supported Discord interactions. They allow Collab.Land to route Discord
       * interactions based on the type and name/custom-id.
       */
      supportedInteractions: this.getSupportedInteractions(),
      /**
       * Supported Discord application commands. They will be registered to a
       * Discord guild upon installation.
       */
      applicationCommands: this.getApplicationCommands(),
    };
    return metadata;
  }

  /**
   * Handle the Discord interaction
   * @param interaction - Discord interaction with Collab.Land action context
   * @returns - Discord interaction response
   */
  protected async handle(
    interaction: DiscordActionRequest<APIChatInputApplicationCommandInteraction>,
  ): Promise<DiscordActionResponse> {


    let message = 'VALUE NOT PROVIDED';

    if (interaction.type === InteractionType.ApplicationCommand) {
      switch (interaction.data.name) {
        case SELL_ACTION:
          message = 'Sell on niftyapes.money';
          break;

        case BUY_ACTION:
          message = 'Buy on niftyapes.money';
          break;


        case BORROW_ACTION:
          message = 'Borrow on niftyapes.money';
          break;

        case FOLLOW_ACTION:
          message = 'Follow us on Twitter @niftyapes';
          break;
      }
    }

    return buildSimpleResponse(message, true);
  }

  /**
   * Build a list of supported Discord interactions
   * @returns
   */
  private getSupportedInteractions(): DiscordInteractionPattern[] {
    return [
      {
        type: InteractionType.ApplicationCommand,
        names: [BUY_ACTION, SELL_ACTION, BORROW_ACTION, FOLLOW_ACTION],
      },
    ];
  }

  /**
   * Build a list of Discord application commands. It's possible to use tools
   * like https://autocode.com/tools/discord/command-builder/.
   * @returns
   */
  private getApplicationCommands(): ApplicationCommandSpec[] {
    const commands: ApplicationCommandSpec[] = [

      {
        metadata: {
          name: 'NiftyApes Marketplace',
          shortName: 'niftyapes',
        },
        name: BUY_ACTION,
        type: ApplicationCommandType.ChatInput,
        description: 'Buy NFTs on the niftyapes.money marketplace',
      },
      {
        metadata: {
          name: 'NiftyApes Marketplace',
          shortName: 'niftyapes',
        },
        name: SELL_ACTION,
        type: ApplicationCommandType.ChatInput,
        description: 'Sell NFTs on the niftyapes.money marketplace',
      },
      {
        metadata: {
          name: 'NiftyApes Marketplace',
          shortName: 'niftyapes',
        },
        name: BORROW_ACTION,
        type: ApplicationCommandType.ChatInput,
        description: 'Use your NFTs as collateral',
      },
      {
        metadata: {
          name: 'NiftyApes Marketplace',
          shortName: 'niftyapes',
        },
        name: FOLLOW_ACTION,
        type: ApplicationCommandType.ChatInput,
        description: 'Follow NiftyApes and never miss important news',
      },
    ];
    return commands;
  }
}
