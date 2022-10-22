import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import MainPage from '../container/mainPage.jsx';
import Signup from './Signup.jsx';
import MonthlyBarChart from './Chart.jsx';
import DoughnutChart from './Doughnut.jsx';

const mapStateToProps = (state) => ({
  user: state.budget.user,
  transactions: state.budget.transactions,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(actions.login(user)),
});

const App = (props) => {
  const navigate = useNavigate();
  const [authenticated, changeAuthenticated] = useState(false);
  if (props.user && authenticated === false) {
    changeAuthenticated(true);
    navigate('/main');
  }
  return (
    <Routes>
      <Route path='/' element={<Login login={props.login} />} />
      <Route
        path='/main'
        element={<MainPage transactions={props.transactions} />}
      />
      <Route path='/chart' element={<MonthlyBarChart />} />
      <Route path='/doughnut' element={<DoughnutChart />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
