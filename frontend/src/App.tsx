import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokeSearchPage from './pages/PokeSearch'
import ReverseSearchPage from './pages/RevSearch'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokesearch" element={<PokeSearchPage />} />
        <Route path="/revsearch" element={<ReverseSearchPage />} />
      </Routes>
    </Router>
  )
}