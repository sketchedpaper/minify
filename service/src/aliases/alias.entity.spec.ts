import { Alias } from './alias.entity';

describe('Alias class', () => {
  it('should make new object with no url', () => {
    const alias = new Alias('');
    expect(alias).toBeTruthy();
    expect(alias.id).toBeUndefined();
    expect(alias.fullUrl).toBe('');
  });
  it('should make new object with a url', () => {
    const alias = new Alias('http://google.com');
    expect(alias).toBeTruthy();
    expect(alias.id).toBeUndefined();
    expect(alias.fullUrl).toBe('http://google.com');
  });
});
