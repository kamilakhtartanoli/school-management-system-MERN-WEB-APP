import { Route, Routes , Navigate } from "react-router";
import "./App.css";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import Dashboard from './pages/Dashboard.jsx'
import Students from './pages/Students.jsx'
import Teachers from './pages/Teachers.jsx'
import Classes from './pages/Classes.jsx'
import ProtectedRoute from "./pages/ProtectRoute.jsx";
import Findstudents from "./pages/Findstudents.jsx";
import Addclass from "./pages/Addclass.jsx";
import Addteacher from "./pages/Addteacher.jsx";
import Addstudent from "./pages/Addstudent.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute>
          <Admin />
        </ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="students" element={<Students />}/>
        <Route path="teachers" element={<Teachers/>}/>
        <Route path="classes" element={<Classes />}/>
        <Route path="findstudents" element={<Findstudents />} />
        <Route path="addclass" element={<Addclass />}/>
        <Route path="addteacher" element={<Addteacher />}/>
        <Route path="addstudent" element={<Addstudent />}/>
        </Route>

      </Routes>
    </>
  );
}

export default App;
