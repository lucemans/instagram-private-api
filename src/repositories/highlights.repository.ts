import { Repository } from '../core/repository';
import { HighlightsCreateReelOptions } from '../types/highlights.create-reel.options';
import { IgClientError } from '../errors';
import { HighlightsEditReelOptions } from '../types/highlights.edit-reel.options';
import { HighlightsCreateReelResponseRootObject } from '../responses/highlights.create-reel.response';
import { HighlightsTrayResponseRootObject } from '../responses/highlights.tray.response';
import { HighlightsEditReelResponseRootObject } from '../responses/highlights.edit-reel.response';

export class HighlightsRepository extends Repository {

  public async highlightsTray(userId: string | number): Promise<HighlightsTrayResponseRootObject> {
    const { body } = await this.client.request.send<HighlightsTrayResponseRootObject>({
      url: `/api/v1/highlights/${userId}/highlights_tray/`,
      method: 'GET',
      qs: {
        battery_level: 100,
        supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
        phone_id: this.client.state.phoneId,
        is_charging: 1,
        will_sound_on: 1,
      },
    });
    return body;
  }

  // TODO: support crop
  public async createReel(options: HighlightsCreateReelOptions): Promise<HighlightsCreateReelResponseRootObject> {
    if (options.mediaIds.length === 0) {
      throw new IgClientError('mediaIds has to contain elements');
    }
    const cover = {
      media_id: options.coverId || options.mediaIds[0],
    };
    const { body } = await this.client.request.send<HighlightsCreateReelResponseRootObject>({
      url: '/api/v1/highlights/create_reel/',
      method: 'POST',
      form: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
        supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
        source: options.source || 'self_profile',
        creation_id: Date.now(),
        cover: JSON.stringify(cover),
        title: options.title,
        media_ids: JSON.stringify(options.mediaIds),
      }),
    });
    return body;
  }

  // TODO: support crop
  public async editReel(highlightId: string, options: HighlightsEditReelOptions): Promise<HighlightsEditReelResponseRootObject> {
    const cover = {
      media_id: options.coverMediaId,
    };
    const { body } = await this.client.request.send<HighlightsEditReelResponseRootObject>({
      url: `/api/v1/highlights/${highlightId}/edit_reel/`,
      method: 'POST',
      form: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
        supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
        source: options.source || 'self_profile',
        title: options.title,
        cover: JSON.stringify(cover),
        added_media_ids: JSON.stringify(options.addedMediaIds || []),
        removed_media_ids: JSON.stringify(options.removedMediaIds || []),
      }),
    });
    return body;
  }

  public async deleteReel(highlightId: string): Promise<string> {
    const { body } = await this.client.request.send({
      url: `/api/v1/highlights/${highlightId}/delete_reel/`,
      method: 'POST',
      form: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return body.status;
  }
}
