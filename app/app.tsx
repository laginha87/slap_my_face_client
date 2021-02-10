import { StartPage } from 'app/Generator/StartPage'
import { Components } from 'app/Common/Components'
import { SlapPage } from 'app/Slap/Page'
import { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SlapSample } from 'app/Slap/Sample'

export const App: FC = () => {
  return (
    <Router>
      <Route path='/slap-sample' component={SlapSample} exact />
      <Route path='/slap/:id' component={SlapPage} exact />
      <Route path='/generator' component={StartPage} exact />
      <Route path='/components' component={Components} exact />
      <Route from="/" component={SlapSample} exact/>
    </Router>
  )
}
