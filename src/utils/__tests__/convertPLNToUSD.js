import {convertPLNToUSD} from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('3')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('-37')).toBeNaN();
  });

  it('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return an "Error" if the input does not contain text or numbers', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD(new Date())).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
  });

  it('should return zero when input is lower than zero', () => {
    expect(convertPLNToUSD(-3)).toBe('$0.00');
    expect(convertPLNToUSD(-37)).toBe('$0.00');
    expect(convertPLNToUSD(-99)).toBe('$0.00');
  });
});


