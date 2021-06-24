import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

// Components
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

// Context
import { AuthContextProvider } from './contexts/ContextAuth'

// -------------------------------------------------
// Render
// -------------------------------------------------
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;