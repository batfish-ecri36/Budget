const React = require('react');
import { render } from 'react-dom';
import { useState } from 'react';
import Login from './Login.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  user: state.budget.user,
  transactions: state.budget.transactions,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(actions.login(user)),
});

const App = (props) => {
  if (props.user) {
    //   if user has active session, render this
    return (
      <div id='main'>
        Logged in! <MainPage />
      </div>
    );
  } else {
    //   else this
    return <Login login={props.login} />;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
