import React from 'react';
import service from '../services/TransactionService';
// import Select from 'react-select';

export default function PeriodAndCalculations() {
  let opt = [];

  const allTransaction = async () => {
    const result = await service.getAll();
    const yM = result.data.map((transaction) => {
      return transaction.yearMonth;
    });
    const uniqueSet = new Set(yM);
    let backToArray = [...uniqueSet];
    console.log(backToArray);
    opt = backToArray.map((str, index) => {
      return { id: index + 1, name: str };
    });
    console.log(opt);
  };
  allTransaction();

  return <div></div>;
}
