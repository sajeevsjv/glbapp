import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Home from "./pages/Home";
function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/addfile" element={<Form/>} />
        </Routes>
    </Router>


    </>
  )
}
export default App;