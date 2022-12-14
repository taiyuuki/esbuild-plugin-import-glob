// @ts-ignore
import * as a from 'test:./migrations/**/*';
// @ts-ignore
import c from 'test:./migrations/**/*';

try {
  const b = require('test:./entities/**/*');

  console.log(a);
  console.log(b);
  console.log(c);
} catch (e) {
  console.error(e);
}
