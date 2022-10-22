const React = require('react');
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import MainPage from '../container/mainPage.jsx';
import Signup from './Signup.jsx';
import BarChart from './Chart.jsx';


const mapStateToProps = (state) => ({
  user: state.budget.user,
  transactions: state.budget.transactions,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(actions.login(user)),
});

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login login={props.login} />} />
        <Route
          path='/main'
          element={<MainPage transactions={props.transactions} />}
        />
        <Route path='/chart' element={<BarChart />}/>
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
