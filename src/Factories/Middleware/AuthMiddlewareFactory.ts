import { AuthMiddleware } from '~/Middlewares/Auth.middleware';

export function AuthMiddlewareFactory() {
  return new AuthMiddleware();
}
