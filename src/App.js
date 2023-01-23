import './App.css';
import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"
import QuestForm from './components/QuestForm';
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import config from "./aws-exports"
import { Calend } from './components/Calend';

Amplify.addPluggable(new AmazonAIPredictionsProvider())
Amplify.configure(config)
Amplify.configure({config,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
});

 function  App({ signOut, user }) {


const ident = ()=>{
  try {
    if (user.signInUserSession.accessToken.payload["cognito:groups"][0]==="Admin") 
      return "Professor"
    else 
      return "Student"
  } catch (error) {
    return  "Student" 
  }
}       

  
  
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      // flexDirection: 'column',
      backgroundColor: '#023047',
      color: 'white',
      marginTop: 10,
      padding: 10,
    },
  };
 return (
   <div className="App">   
     <h1>Hello {ident()}  : {user.attributes.email}</h1>
     <button onClick={signOut}>Sign out</button>
     <QuestForm  currentUser={user.attributes}  userStatus={ident()}/>
     <Calend />
   </div>
 )}
export default withAuthenticator(App);