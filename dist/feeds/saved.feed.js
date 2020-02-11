'use strict';
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
const class_transformer_1 = require('class-transformer');
const feed_1 = require('../core/feed');
class SavedFeed extends feed_1.Feed {
  set state(body) {
    this.moreAvailable = body.more_available;
    this.nextMaxId = body.next_max_id;
  }
  async request() {
    const { body } = await this.client.request.send({
      url: '/api/v1/feed/saved/',
      method: 'POST',
      qs: {
        max_id: this.nextMaxId,
      },
    });
    this.state = body;
    return body;
  }
  async items() {
    const { items } = await this.request();
    return items.map(i => i.media);
  }
}
__decorate([class_transformer_1.Expose(), __metadata('design:type', String)], SavedFeed.prototype, 'nextMaxId', void 0);
exports.SavedFeed = SavedFeed;
//# sourceMappingURL=saved.feed.js.map
