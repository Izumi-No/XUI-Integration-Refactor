import { HttpResponse } from '~/Helpers/HTTPResponseHelpers';

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}
