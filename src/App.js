import "./App.css";
import AddAgenda from "./components/AddAgenda";
import ReadAgenda from "./components/ReadAgenda";
import EditAgenda from "./components/EditAgenda";
import DeleteAgenda from "./components/DeleteAgenda";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ReadAgenda />}></Route>
        <Route path="/add" element={<AddAgenda />}></Route>
        <Route path="/edit/:id" element={<EditAgenda />}></Route>
        <Route path="/delete/:id" element={<DeleteAgenda />}></Route>
      </Routes>
    </div>
  );
}

export default App;
