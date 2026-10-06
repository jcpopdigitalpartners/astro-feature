import {test} from 'node:test';
import assert from 'node:assert/strict';
import {estimate} from '../src/lib/pricing';
test('seat limits produce correct illustrative totals',()=>{
  assert.deepEqual(estimate('1',20),{seats:1,total:20});
  assert.deepEqual(estimate('1000',20),{seats:1000,total:20000});
  assert.deepEqual(estimate(' 25 ',20),{seats:25,total:500});
});
test('invalid inputs never produce a misleading estimate',()=>{
  for(const input of ['','0','1001','1.5','-5','cat','1e2','Infinity','9999999999999999999999'])assert.ok('error' in estimate(input,20),input);
});
