import {Route, Switch, Redirect} from 'react-router-dom'

// import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import Home from './components/Home'
import jobItemDetails from './components/JobItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={jobItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
