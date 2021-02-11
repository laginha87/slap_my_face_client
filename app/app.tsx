import { StartPage } from 'app/Generator/StartPage'
import { Components } from 'app/Common/Components'
import { SlapPage } from 'app/Slap/Page'
import { FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SlapSample } from 'app/Slap/Sample'

export const App: FC = () => {
  return (
    <div className='container mx-auto min-h-screen'>
      <h1 className='text-4xl text-center'>Slap My Face</h1>
      <Router>
        <Switch>
          <Route path='/slap-sample' component={SlapSample} exact />
          <Route path='/slap/:id' component={SlapPage} exact />
          <Route path='/generator' component={StartPage} exact />
          <Route path='/components' component={Components} exact />
          <Route from='/' component={SlapSample} exact />
        </Switch>
      </Router>
      <footer className='text-xs text-gray-500 text-center pt-40 pb-5 w-full'>
        Built by{' '}
        <a href='https://filipe-correia.me?rel=slap' target='_blank' rel='noopener noreferrer' className='underline'>
          Filipe Correia
        </a>
      </footer>
    </div>
  )
}
