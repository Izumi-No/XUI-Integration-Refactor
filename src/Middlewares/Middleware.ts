import { HttpResponse } from '~/Helpers/HTTPResponseHelpers';

export interface Middleware<T = any, U = any> {
  handle: (httpRequest: T, httpBody?: U) => Promise<HttpResponse | false>;
}
