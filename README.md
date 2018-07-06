# redis-del
redis key delete tool

## setup

```bash
$ yarn
$ vi config/test.json
```

## run

```bash
$ NODE_ENV=test node app.js

SAMPLE_*
  SAMPLE_2
  SAMPLE_1
Delete keys? (yes/no)  y
  deleted 2 keys.

TEST_*
  TEST_1
Delete keys? (yes/no)  n
  canceled.

Finished.
```
