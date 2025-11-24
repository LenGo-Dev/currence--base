import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import { useMemo } from 'react';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {

  const convertedAmount = useMemo(() => {

    if (amount >= 0) {
    if(from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if(from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);

    return formatAmountInCurrency(amount, from);
    }

    return `Wrong value: ${amount}`;
  }, [from, to, amount]);


  const formattedAmount = useMemo(() => formatAmountInCurrency(amount, from), [amount, from]);

  let content;

  if (amount < 0) {
    content = convertedAmount;
  } else {
    content = `${formattedAmount} = ${convertedAmount}`;
  }

  return (
    <div data-testid="result" className={styles.result}>
      {/*{formattedAmount} = {convertedAmount}*/}
      {content}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

export default ResultBox;