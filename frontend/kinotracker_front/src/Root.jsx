import { useAuth } from './api/Auth.jsx';
import App from './App.jsx';
import Login from './Components/Login.jsx';

export default function Root() {
  const { token, saveToken, logout, loading } = useAuth();

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return token ? (
    <App token={token} onLogout={logout} />
  ) : (
    <Login onLogin={saveToken} />
  );
}