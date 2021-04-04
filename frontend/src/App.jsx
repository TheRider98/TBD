// Need to do:
//  - Connect to endpoints
//  - Create basic marketplace for now
//  - Fix landing page and make the buttons needed
//  - Profile page a priority as well
//  - Axios??



import './App.css';
import React, { useEffect } from 'react'
import { Marketplace } from './pages/Marketplace'
import { Landing } from './pages/Landing'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MarketNav } from './components/MarketNav'
import { Auth0Context, useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';

function App() {
  const [posts, setPosts] = React.useState({});
  const { isLoading, error, isAuthenticated, user, getAccessTokenSilently  } = useAuth0()

  // useEffect (() => {
  //   async function exampleApiCallOnLoad() {
  //     const token = await getAccessTokenSilently();
  //     console.log(token)
  //     const options = { headers: { 'Authorization': `Bearer ${token}`}}
  //     const apiResult = await axios.get('http://localhost:5000/get', options);
  //     setPosts(apiResult.data);
  //   }
  //   exampleApiCallOnLoad();
  //   console.log('inside')
  // }, [getAccessTokenSilently])

  // console.log(isLoading, error, isAuthenticated, user)
  return (
    <>
      {/* <Landing /> */}
      {/* <span>{JSON.stringify(posts)}</span>
      <br/> */}
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/marketplace' exact component={Marketplace} />
      </Switch>
    </>
  );
}

export default App;
