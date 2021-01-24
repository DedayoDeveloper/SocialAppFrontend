import React, { Component } from 'react';
import classes from './Layout.module.css';
import Header from '../Navigation/Header/Header';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Footer from '../Navigation/Footer/Footer'
import { connect } from 'react-redux';
import * as actions from "../../store/actions";

class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    openSideDrawerHandler = () => {
        this.setState({showSideDrawer: true})
    }

render(){
   return(
    <React.Fragment>
        <div className="header">
        <Header logout={this.props.logOut} username={this.props.userData.fullname ? this.props.userData.fullname: ''}  isVerify={this.props.isVerify} isAuth={this.props.isAuth} openDrawer={this.openSideDrawerHandler} />
        </div>

        <div className="content">
            <SideDrawer logout={this.props.logOut} username={this.props.userData.fullname} isVerify={this.props.isVerify}  isAuth={this.props.isAuth} open={this.state.showSideDrawer} closeDrawer={this.closeSideDrawerHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </div>

        <div className="footer">
        <Footer />
        </div>
     
        
        
    </React.Fragment>

   )
}
  
}

const mapStateToProps = (state) => {
    return {
      loading: state.auth.loading,
      isAuth: state.auth.token !== null,
      isVerify: state.auth.setOTP,
      userData: state.auth.userData !== {},
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {

        logOut: () => dispatch(actions.logout())

    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Layout);
