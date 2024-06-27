import { inject, injectable } from 'inversify';

import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { Config } from '../../config/config.interface.js';
import { RestSchema } from '../../config/rest.schema.js';
import { getFullServerUrl } from '../../../helpers/common.js';

import { DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS } from './url-transformer.constant.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from '../../../../rest/rest.constant.js';

function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null;
}

@injectable()
export class UrlTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    this.logger.info('UrlTransformer created!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticUrl = STATIC_FILES_ROUTE;
            const uploadUrl = STATIC_UPLOAD_ROUTE;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');

            const rootUrl = this.hasDefaultImage(value) ? staticUrl : uploadUrl;
            current[key] = `${getFullServerUrl(serverHost, serverPort)}${rootUrl}/${value}`;
          }
        }
      }
    }

    return data;
  }
}
