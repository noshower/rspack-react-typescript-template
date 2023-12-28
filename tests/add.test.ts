import { add } from '../src/utils/add';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
