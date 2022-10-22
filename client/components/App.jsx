const React = require('react');
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import MainPage from '../container/mainPage.jsx';
import Signup from './Signup.jsx';

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
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
  // if (props.user) {
  //   //   if user has active session, render this
  //   return (
  //     <div id='main'>
  //       Logged in! <MainPage />
  //     </div>
  //   );
  // } else {
  //   //   else this
  //   return <Login login={props.login} />;
  // }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
