import { Components } from 'app/Slap/Common/Components'
import { StartPage } from 'app/Slap/Generator/StartPage'
import { SlapPage } from 'app/Slap/Slap/Page'
import { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export const App: FC = () => {
  return (
    <Router>
      <Route path='/slap/:id' component={SlapPage} exact />
      <Route path='/generator' component={StartPage} exact />
      <Route path='/components' component={Components} exact />
      {/* <Redirect from="/" to="/generator" exact /> */}
    </Router>
  )
}
