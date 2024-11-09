import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModuleList from './components/ModuleList';
import ModuleForm from './components/ModuleForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModuleList />} />
        <Route path="/add-module" element={<ModuleForm />} />
        <Route path="/edit-module/:id" element={<ModuleForm />} />
      </Routes>
    </Router>
  );
}

export default App;
