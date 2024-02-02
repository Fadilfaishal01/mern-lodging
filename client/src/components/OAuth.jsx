import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
} from "firebase/auth";
import { app } from "./../firebase/firebase";
import { useDispatch } from "react-redux";
import { authFailure, authSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = ({ typeOAuth }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickOAuth = () => {
		if (typeOAuth == "google") {
			return OAuthGoogle();
		} else if (typeOAuth == "facebook") {
			return OAuthFacebook();
		} else {
			return OAuthGithub();
		}
	};

	const OAuthGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);

			const result = await signInWithPopup(auth, provider);
			const res = await fetch(`/api/v1/auth/google`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}),
			});

			const data = await res.json();
			dispatch(authSuccess(data));
			navigate("/");
		} catch (error) {
			console.log("Could not sign in with Google : ", error.message);
			dispatch(authFailure(error.message));
		}
	};

	const OAuthFacebook = () => {
		console.log("OAuthFacebook");
	};

	const OAuthGithub = async () => {
		try {
			const provider = new GithubAuthProvider();
			const auth = getAuth(app);

			const result = await signInWithPopup(auth, provider);
			const res = await fetch(`/api/v1/auth/github`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}),
			});

			const data = await res.json();
			dispatch(authSuccess(data));
			navigate("/");
		} catch (error) {
			console.log("Could not sign in with Github : ", error.message);
			dispatch(authFailure(error.message));
		}
	};

	return (
		<button
			type='button'
			onClick={() => handleClickOAuth()}
			className={`${
				typeOAuth == "google"
					? "bg-red-700"
					: typeOAuth == "facebook"
					? "bg-blue-700"
					: "bg-black"
			} text-white p-3 rounded-lg hover:opacity-85 mx-1`}
		>
			{typeOAuth == "google" ? (
				<FaGoogle />
			) : typeOAuth == "facebook" ? (
				<FaFacebook />
			) : (
				<FaGithub />
			)}
		</button>
	);
};

export default OAuth;
