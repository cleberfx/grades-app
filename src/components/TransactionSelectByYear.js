import React, { Component } from 'react';
import Select from 'react-select';
import service from '../services/TransactionService';
import PeriodAndCalculationsByYear from './PeriodAndCalculationsByYear';

export default class TransactionSelectByYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      id: '',
      name: '',
    };
  }

  async getOptions() {
    const result = await service.getAll();
    const yM = result.data.map((transaction) => {
      return transaction.year;
    });
    const uniqueSet = new Set(yM);
    let backToArray = [...uniqueSet];
    console.log(backToArray);
    let opt = backToArray.map((str, index) => {
      return { id: index + 1, name: str };
    });
    console.log(opt);

    const options = opt.map((d) => ({
      value: d.id,
      label: d.name,
    }));

    this.setState({ selectOptions: options });
  }

  handleChange(e) {
    this.setState({ id: e.value, name: e.label });
  }

  componentDidMount() {
    this.getOptions();
  }

  render() {
    console.log(this.state.selectOptions);
    return (
      <div>
        <Select
          options={this.state.selectOptions}
          onChange={this.handleChange.bind(this)}
        />
        <p>
          You have selected <strong>{this.state.name}</strong> whose id is{' '}
          <strong>{this.state.id}</strong>
        </p>
        <PeriodAndCalculationsByYear year={this.state.name} />
      </div>
    );
  }
}
