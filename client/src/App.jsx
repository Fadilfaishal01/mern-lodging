import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Component Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/about' element={<About />} />
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/sign-up' element={<SignUp />} />
			</Routes>
		</Router>
	);
}

export default App;
