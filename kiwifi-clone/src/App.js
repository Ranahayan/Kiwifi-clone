import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Login />
    </div>
  );
}

export default App;
