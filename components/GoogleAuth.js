import React from 'react';
import  { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  // componentDidMount() {
  //   window.gapi.load('client:auth2', () => {
  //     window.gapi.client.init({
  //       clientId: '138271932287-gko10lrfcioagu4muq6bjv41uk9sjh1m.apps.googleusercontent.com',
  //       scope: 'email'
  //     }).then(() => {
  //       this.auth = window.gapi.auth2.getAuthInstance();
  //       this.setState = ({ isSignedIn: this.auth.isSignedIn.get() });
  //       this.auth.isSignedIn.listen(this.onAuthChange);
  //     });
  //   });
  // }


  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '138271932287-gko10lrfcioagu4muq6bjv41uk9sjh1m.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }


  // // onAuthChange = () => {
  // //   this.setState({ isSignedIn: this.auth.isSignedIn.get()})
  // }
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };



  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  }

    renderAuthButton() {
      if (this.state.isSignedIn === null ) {
        return <div>NO AUTH </div>;
      }  else if (this.state.isSignedIn) {
        return (
          <button  onClick = {this.onSignOutClick} className = 'ui red google button'>
            <i className = 'google icon' />
            Sign Out
          </button>
        )
      } else {
        return (
          <button  className = 'ui red google button' onClick = {this.onSignInClick}>
            <i className = 'google icon' />
            Sign In With Google
          </button>
        )
        
      }
    }
  

  render () {
    return <div>{this.renderAuthButton()}</div>;
  }

}

export default connect (
  null, 
  { signIn, signOut }
  ) (GoogleAuth);






// client ID - 138271932287-gko10lrfcioagu4muq6bjv41uk9sjh1m.apps.googleusercontent.com




