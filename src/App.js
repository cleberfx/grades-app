import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddTransaction from './components/AddTransaction';
import Transaction from './components/Transaction';
import TransactionList from './components/TransactionList';
// import PeriodAndCalculations from './components/PeriodAndCalculations';
import TransactionSelect from './components/TransactionSelect';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/transaction" className="navbar-brand">
            Aplicativo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/transaction'} className="nav-link">
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/add'} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        {/* <PeriodAndCalculations /> */}
        <TransactionSelect />

        <div className="container mt-3">
          <Switch>
            {/* <Route
              exact
              path={['/', '/transaction']}
              component={TransactionList}
            /> */}
            <Route exact path="/add" component={AddTransaction} />
            <Route path="/transaction/:id" component={Transaction} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
