import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./pages/AdminDashboard";
// import HomePage from "./pages/HomePage";
import ConcertsPage from "./pages/ConcertsPage";
import ConcertSection from "./components/ConcertSection";

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
                {/* <HomePage /> */}
                <ConcertSection />
              </PublicRoute>
            }
          />
          <Route
            path="/ConcertsPage"
            element={
              <PublicRoute>
                <ConcertsPage />
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
