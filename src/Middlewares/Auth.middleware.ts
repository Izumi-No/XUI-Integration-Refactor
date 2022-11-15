
import {configs} from '~/configs'
import { AccessDeniedError } from '~/Helpers/HTTPErrorsHelpers'
import { forbidden, HttpResponse, ok } from '~/Helpers/HTTPResponseHelpers'
import { Middleware } from './Middleware'





export class AuthMiddleware implements Middleware {
  constructor() {}

  async handle(req: {authorization: string}): Promise<HttpResponse> {
    const bearrerHeader = req.authorization
    if (typeof bearrerHeader === "undefined") return forbidden(new AccessDeniedError)
      const bearrer = bearrerHeader.split(' ')
    const bearrerToken = bearrer[1]

      if (bearrerToken == configs.secret) return ok()
      return forbidden(new AccessDeniedError)
  }
}

