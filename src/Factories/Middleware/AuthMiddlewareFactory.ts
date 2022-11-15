import { AuthMiddleware } from '~/Middlewares/Auth.middleware';

export function AuthMiddlewareFactory() {
  console.log('a');

  return new AuthMiddleware();
}
