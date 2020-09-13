import React, { useState, useEffect } from 'react';
import service from '../services/TransactionService';
// import Select from 'react-select';

export default function PeriodAndCalculationsByFilterDescription(props) {
  const [currentInput, setCurrentInput] = useState('');
  const [yM, setYM] = useState(props.yearMonth);
  const [input, setInput] = useState('');
  const [resultAllByDate, setResultAllByDate] = useState(0);
  const [sumRecByDate, setSumRecByDate] = useState(0);
  const [sumDesByDate, setSumDesByDate] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const handleInput = (event) => {
    setCurrentInput(event.target.value);
  };

  useEffect(() => {
    setYM(props.yearMonth);
    setInput(currentInput);
  }, [props.yearMonth, currentInput]);

  console.log(yM);
  console.log(currentInput);
  const allTransactionByDate = async () => {
    const result = await (await service.getAllByDate(yM)).data.map(
      (transaction) => {
        return {
          value: transaction.value,
          type: transaction.type,
          description: transaction.description,
        };
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

    const rs = result.filter((el) => {
      return el.description.toLowerCase().includes(input.toLocaleLowerCase());
    });

    const resultDespesas = rs
      .filter((el) => el.type === '-')
      .reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual.value;
      }, 0);

    console.log(rs);
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
      <input type="text" name="" id="" onChange={handleInput} />
      <p>Lançamentos: {resultAllByDate}</p>
      <p>Receitas: {sumRecByDate}</p>
      <p>Despesas: {sumDesByDate}</p>
      <p>Saldo: {saldo}</p>
    </div>
  );
}
