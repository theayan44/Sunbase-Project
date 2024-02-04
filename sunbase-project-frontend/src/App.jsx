import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AddCustomer from "./pages/AddCustomer"
import UpdateCustomer from "./pages/UpdateCustomer"

const App = () => {
  // dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=

  //   {
  //     "access_token": "dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM="
  // }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddCustomer />} />
      <Route path="/update/:email" element={<UpdateCustomer />} />
    </Routes>
  )
}

export default App;
