import Navbar2 from './Components/Navbar'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import Counter from './Components/Counter';
import Todolist from './Components/Todolist';
import JsonParsing from './Components/JsonParsing';
import Main from './Components/Form';
import FetchApi from './Components/FetchApi';
import ModalPopUp from './Components/ModalPopUp';
import DataTable from './Components/Sort';
import Charts from './Components/Charts';
function App() {
  return (
    <>
    <Router>
    <Navbar2/>
     <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/Counter" element={<Counter/>}  />
             <Route path="/ToDoList" element={<Todolist />} />
             <Route path="/JsonParsing" element={<JsonParsing/>} />
             <Route path="/Form" element={<Main/>} />
             <Route path="/FetchApi" element={<FetchApi/>} />
             <Route path="/ModalPopUp" element={<ModalPopUp/>} />
             <Route path="/Sort" element={<DataTable/>} />
             <Route path="/Charts" element={<Charts/>} />
     </Routes>
    </Router>
    </>
  );
}

export default App;
