// @ts-ignore
import * as a from 'glob:./migrations/**/*';
// @ts-ignore
import c from 'glob:./migrations/**/*';

try {
  const b = require('glob:./entities/**/*');

  console.log(a);
  console.log(b);
  console.log(c);
} catch (e) {
  console.error(e);
}
