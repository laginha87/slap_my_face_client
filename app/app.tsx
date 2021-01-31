import { Components } from 'app/Slap/Common/Components'
import { SlapPage } from 'app/Slap/Slap/Page'
import { FC, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
const StartPage = lazy(() => import('./Slap/Generator/StartPage'))

export const App: FC = () => {
  throw new Error("Something went wrong");
  return (
    <Suspense fallback={<div>LOADING</div>}>
      <Router>
        <Route path='/slap/:id' component={SlapPage} exact />
        <Route path='/generator' component={StartPage} exact />
        <Route path='/components' component={Components} exact />
        {/* <Redirect from="/" to="/generator" exact /> */}
      </Router>
    </Suspense>
  )
}