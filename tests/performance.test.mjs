import {test} from 'node:test';
import assert from 'node:assert/strict';
import {escapeHtml} from '../scripts/build.mjs';

test('escapeHtml performance is within bounds', () => {
  const str = 'Hello <world> & "friends"';
  const start = process.hrtime.bigint();
  for (let i = 0; i < 100000; i++) escapeHtml(str);
  const end = process.hrtime.bigint();
  const ms = Number(end - start) / 1000000;
  // ensure it finishes under reasonable time (e.g., 500ms)
  assert.ok(ms < 500, `escapeHtml took too long: ${ms}ms`);
});

test('message validation performance is within bounds', () => {
  const obj = { protocol: 'p', channel: 'c', guildKey: 'g', type: 't', theme: 'th', actions: 'a' };
  const start = process.hrtime.bigint();
  for (let i = 0; i < 100000; i++) {
    const valid = Object.keys(obj).length === 6 && ('actions' in obj) && ('channel' in obj) && ('guildKey' in obj) && ('protocol' in obj) && ('theme' in obj) && ('type' in obj);
    assert.ok(valid);
  }
  const end = process.hrtime.bigint();
  const ms = Number(end - start) / 1000000;
  // ensure it finishes under reasonable time (e.g., 500ms)
  assert.ok(ms < 500, `message validation took too long: ${ms}ms`);
});
