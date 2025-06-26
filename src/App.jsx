import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import LoginForm from "./components/admin/LoginForm";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <div className="min-h-screen flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-bold mb-6">Public Website</h1>
                  <a
                    href="/login"
                    className="text-blue-500 hover:underline text-lg"
                  >
                    Go to Admin Login
                  </a>
                </div>
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
