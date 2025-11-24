import ResultBox from './ResultBox';
import '@testing-library/jest-dom';
import {render, screen, cleanup} from '@testing-library/react';


describe('Component ResultBox', () => {

  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100}/>);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from="PLN" to="USD" amount={100}/>);
    const result = screen.getByTestId('result');
    expect(result).toHaveTextContent('PLN 100.00 = $28.57');
  });


  it(`should convert PLN → USD properly for amount`, () => {
    const testCases = [
      {amount: '100', expected: '$28.57'},
      {amount: '20', expected: '$5.71'},
      {amount: '200', expected: '$57.14'},
      {amount: '345', expected: '$98.57'},
    ];

    for (const testObj of testCases) {
      // const { amount, expected } = testCases[i];
      const numericAmount = Number(testObj.amount);

      render(<ResultBox from="PLN" to="USD" amount={numericAmount}/>);
      const result = screen.getByTestId('result');

      expect(result).toHaveTextContent(
        `PLN ${numericAmount.toFixed(2)} = ${testObj.expected}`
      );

      cleanup();
    }
  });

  it(`should convert USD->PLN properly for amount`, () => {
    const testCases = [
      {amount: '100', expected: 'PLN 350.00'},
      {amount: '20', expected: 'PLN 70.00'},
      {amount: '200', expected: 'PLN 700.00'},
      {amount: '345', expected: 'PLN 1,207.50'},
    ];

    for (const testObj of testCases) {
      // const { amount, expected } = testCases[i];
      const numericAmount = Number(testObj.amount);

      render(<ResultBox from="USD" to="PLN" amount={numericAmount}/>);
      const result = screen.getByTestId('result');

      expect(result).toHaveTextContent(
        `$${numericAmount.toFixed(2)} = ${testObj.expected}`
      );

      cleanup();
    }
  });

  it(`should return the same amount when "from" and "to" currencies are identical`, () => {

      render(<ResultBox from="USD" to="USD" amount={100} expected={100}/>);
      const result = screen.getByTestId('result');

      expect(result).toHaveTextContent(
        '$100.00 = $100.00'
      );


  });

  it(`should return Error for negative amount`, () => {

      render(<ResultBox from="PLN" to="USD" amount={-37}/>);
      const result = screen.getByTestId('result');

      expect(result).toHaveTextContent(
        `Wrong value: -37`
      );


  });

});

