import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import { Route, Switch , withRouter, Redirect} from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login/Login'
import SignUp from './pages/Auth/Signup/SignUp'
import SignUpdate from './pages/Auth/Signup/SignUpdate.jsx'
import Dashboard from './pages/Account/Dashboard/Dashboard'
import {Loading, RouteGuard} from './router'
import {connect} from 'react-redux';
import * as actions from "./store/actions";
import VerifyPayments from './pages/Account/Dashboard/VerifyPayments';
import EscortDetails from './pages/Account/Escort/EscortDetails';


const routes = [
  {
    path: "/",
    exact: true,
    component: Landing,
    guarded: false,
  },
  {
    path: "/login",
    component: Login,
    guarded: false,
  },
  {
    path: "/sign-up",
    component: SignUpdate,
    guarded: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    guarded: true,
  },

  {
    path: "/make-payment",
    component: VerifyPayments,
    guarded: true,
  },

  {
    path: "/view-escorts/:id",
    component: EscortDetails,
    guarded: true,
  }
];

class App extends Component {
  state = {
    loading: true,
    userData: null,
  };
  componentDidMount() {
    this.props.checkAuth();
    this.setState({ 
      loading: this.props.loading, 
      userData: this.props.userData 
    });
  }

  render() {
    if (this.state.loading || this.props.loading) {
      console.log("loading");
      return <Loading />;
    } else {
      
      return (
        <Layout>
          <Switch>
            {routes.map((route, i) =>
              route.guarded ? (
                <RouteGuard key={i} {...route} {...this.props} />
              ) : (
                <Route key={i} {...route} />
              )
            )}
            <Redirect
              to={{
                pathname: "/dashboard",
                state: {
                  from: "/",
                },
              }}
            ></Redirect>
          </Switch>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => {
  
  return {
    loading: state.auth.initialising,
    userData: state.auth.userData,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(actions.checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
