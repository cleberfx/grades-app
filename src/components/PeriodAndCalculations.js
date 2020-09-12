import React, { useState,useEffect } from 'react';
import service from '../services/TransactionService';
// import Select from 'react-select';

export default function PeriodAndCalculations(props) {
  const [bh, setBh] = useState(props.yearMonth);
  useEffect(() => {
    setBh(props.yearMonth);
  }, [props.yearMonth]);
  console.log(bh);
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

  return (
    <div>
      <p>{props.yearMonth}</p>
    </div>
  );
}
