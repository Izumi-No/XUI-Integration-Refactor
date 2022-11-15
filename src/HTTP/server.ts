import { configs } from '~/configs';

import { app } from './app';
const PORT = configs.port || 3000;

export function run() {
  app.listen(PORT, () => console.log(PORT));
}
