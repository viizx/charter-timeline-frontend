import React, { useState, useEffect } from 'react'
import Timeline from './components/Timeline'
import Dashboard from './components/Dashboard'
import Reservation from './components/Reservation'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginForm from './components/auth/LoginForm'
// import pattern from './images/pattern.jpg'

function App () {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    const localToken = localStorage.getItem('auth-token')

    // Validate user and token
    if (localUser && localToken) {
      setUser(JSON.parse(localUser))
      setToken(localToken)
    }
  }, [])

  const checkAuth = (component) => {
    return token && user.isAdmin ? component : <LoginForm />
  }

  return (
    <Router>
      <div className="App">
        <div className="w-full bg-[url('images/pattern.png')] bg-contain bg-fixed bg-center bg-repeat-round">
          {user && user.isAdmin && <Navbar />}
          <Switch>
            <Route exact path="/" component={Timeline} />
            <Route exact path="/dashboard">
              {checkAuth(<Dashboard user={token} />)}
            </Route>
            <Route path="/reservations/:id">
              {checkAuth(<Reservation user={token} />)}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
