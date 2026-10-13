import { isValidCredentials, validateLogin } from '../src/utils/validators';

describe('validateLogin', () => {
  it('requires username and password', () => {
    expect(validateLogin('', '')).toEqual({
      username: 'Username is required',
      password: 'Password is required',
    });
  });

  it('rejects passwords shorter than 6 characters', () => {
    expect(validateLogin('test', '123').password).toMatch(/at least 6/);
  });

  it('passes valid input', () => {
    expect(validateLogin('test', '123456')).toEqual({});
  });
});

describe('isValidCredentials', () => {
  it('accepts the static credentials', () => {
    expect(isValidCredentials('test', '123456')).toBe(true);
  });

  it('rejects wrong credentials', () => {
    expect(isValidCredentials('test', '654321')).toBe(false);
    expect(isValidCredentials('user', '123456')).toBe(false);
  });
});
