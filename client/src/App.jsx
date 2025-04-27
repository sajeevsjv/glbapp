import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Home from "./pages/Home";
function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/contact" element={<h1 className="text-yellow-600">Contact</h1>} />
        </Routes>
    </Router>


    </>
  )
}
export default App;