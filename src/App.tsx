import { Navigation } from './router/Navigation';
import { AuthProvider } from './context/auth/AuthContext';
import './normalize.css';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

function App() {
  return (
    <AppState>
      <Navigation />
    </AppState>
  );
}

export default App;
