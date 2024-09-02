/** This example was designed to run in a web browser's JavaScript console,
 * but it can also be run with Node.js as long as it doesn't include DOM examples. */

(function () {
  'use strict';

  function multiplier(factor) {
    return number => number * factor;
  }
  
  let twice = multiplier(2);
  console.log(twice(5));
})();
