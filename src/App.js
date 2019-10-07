import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import firebase from 'firebase'
import {firebaseconfig} from './firebase'

class App extends Component {

 componentDidMount() {
  const configs = firebaseconfig()
  firebase.initializeApp(configs);
  this.loadAllProviders()
  this.checkuser()
}

checkuser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user)
    } else {
      // No user is signed in.
      console.log("No User is logged in")
    }
  });
}

addNewProvider() {
  
}
loadAllProviders() {
  var db = firebase.firestore();
  var docRef = db.collection("providers").doc("mazen");

  docRef.get().then(function(response) {
    let myprovider = response.data();
      if (myprovider) {
        let projectsmanaging = myprovider.projectsmanaging;
   
        console.log(`View Provider ${myprovider.firstname} ${myprovider.lastname}  You have ${projectsmanaging.myproject.length} projects `)      
      } else {
          // doc.data() will be undefined in this case
       console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}
  
  
  render() {
    const styles = {
      fontNormal:{fontSize:'16px'},
      inputField: { width: '90%', fontSize: '16px',maxWidth:'400px' },
      buttonType: { width: '200px', margin: 'auto'  },
      alignCenter:{fontSize: '16px',textAlign:'center'}
    }
    return (
      <div>
       <div style={styles.alignCenter}>FireBase Login</div>
        <div style={styles.fontNormal}>Email<br/><input type="email" style={styles.inputField} /></div>
        <div style={styles.fontNormal}>Password<br/><input type="password" style={styles.inputField} /></div>
        <div><input type="button" style={styles.buttonType} value="Login Email" /></div>
        <div><input type="button" style={styles.buttonType} value="Google Sign In" /></div>
      </div>
  );
  }
}
function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel
  };
}

export default connect(mapStateToProps, actions)(App);
