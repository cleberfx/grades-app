import React, { useState, useEffect } from 'react';
import service from '../services/TransactionService';
// import Select from 'react-select';

export default function PeriodAndCalculations(props) {
  const [yM, setYM] = useState(props.yearMonth);
  // const [y, setY] = useState(props.year);

  const [resultAllByDate, setResultAllByDate] = useState(0);
  const [sumRecByDate, setSumRecByDate] = useState(0);
  const [sumDesByDate, setSumDesByDate] = useState(0);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    setYM(props.yearMonth);
  }, [props.yearMonth]);

  console.log(yM);

  const allTransactionByDate = async () => {
    const result = await (await service.getAllByDate(yM)).data.map(
      (transaction) => {
        return { value: transaction.value, type: transaction.type };
      }
    );
    console.log(result);

    setResultAllByDate(result.length);

    const resultReceitas = result
      .filter((el) => el.type === '+')
      .reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual.value;
      }, 0);
    console.log(resultReceitas);
    setSumRecByDate(resultReceitas);

    const resultDespesas = result
      .filter((el) => el.type === '-')
      .reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual.value;
      }, 0);
    console.log(resultDespesas);
    setSumDesByDate(resultDespesas);
    // const sumReceitas = resultReceitas.reduce((acumulador, valorAtual) => {
    //   return acumulador + valorAtual.value;
    // }, 0);
    // console.log(sumReceitas);
    // setSumRecByDate(sumReceitas);

    // const sumDespesas = resultDespesas.reduce((acumulador, valorAtual) => {
    //   return acumulador + valorAtual.value;
    // }, 0);
    // console.log(sumDespesas);
    // setSumDesByDate(sumDespesas);
    setSaldo(sumRecByDate - sumDesByDate);
  };

  allTransactionByDate();

  
  return (
    <div>
      <p>{props.yearMonth}</p>
      <p>Lançamentos: {resultAllByDate}</p>
      <p>Receitas: {sumRecByDate}</p>
      <p>Despesas: {sumDesByDate}</p>
      <p>Saldo: {saldo}</p>
    </div>
  );
}
