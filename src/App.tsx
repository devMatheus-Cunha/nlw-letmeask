import {
  BrowserRouter,
  Route,
} from "react-router-dom";

// Components
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

// Context
import { AuthContextProvider } from './contexts/ContextAuth'

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;