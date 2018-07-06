'use strict';

const _ = require('lodash');
const config = require('config');
const readline = require('readline');
const Redis = require('ioredis');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const redis = new Redis();

(async function() {
  try {

    const targetKeys = config.delete_keys;
    for (let i = 0, len = targetKeys.length; i < len; i++) {
      const targetKey = targetKeys[i];
      const keys = await redis.keys(targetKey);
      if (_.isEmpty(keys)) continue;

      console.log(`${targetKey}:`);
      _.each(keys, key => console.log(`  ${key}`));

      if (await confirm()) {
        const count = await redis.del(keys);
        console.log(`  deleted ${count} keys.\n`);
      } else {
        console.log('  canceled.\n');
      }
    }

  } finally {
    rl.close();
    redis.disconnect();
    console.log(`Finished.`);
  }
})();

function confirm() {
  return new Promise((resolve, reject) => {
    rl.question('Delete keys? (yes/no)  ', answer => {
      return resolve((answer.toLowerCase() === 'yes') || (answer.toLowerCase() === 'y'));
    });
  });
}
