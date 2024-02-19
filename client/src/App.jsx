import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Component Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/listing/:id' element={<Listing />} />
				<Route element={<PrivateRoute />}>
					<Route path='/profile' element={<Profile />} />
					<Route path='/create-listing' element={<CreateListing />} />
					<Route path='/update-listing/:id' element={<UpdateListing />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
