import logo from "./logo.svg";
import "./App.css";
import AddAgenda from "./components/AddAgenda";
import { Routes, Route } from "react-router-dom";

function App() {
 return (
  <div className="App">
   <Routes>
    <Route path="/add" element={<AddAgenda />}></Route>
    {/* <Route path="/edit" element={<RegisterCompany />}></Route>
    <Route path="/delete" element={<EditUser />}></Route> */}
   </Routes>

   {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
  </div>
 );
}

export default App;
