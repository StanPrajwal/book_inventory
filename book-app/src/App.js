import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBook from "./Components/AddBook/AddBook";
import Inventory from "./Components/BookInventory/Inventory";
import Layout from "./Components/Layouts/Layouts";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

function App() {
  return (
    <div className="App">
      {/*  */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/addbook" element={<AddBook />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
