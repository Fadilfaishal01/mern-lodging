import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authStart, authFailure, authSuccess } from "../redux/user/userSlice";

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentUser, loading, error } = useSelector((state) => state.auth); // state.user ini penamaan dari reducernya
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChangeInput = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmitSignUp = async (e) => {
		e.preventDefault();
		dispatch(authStart());

		try {
			// /api ini di definisikan di vite.config.js
			const res = await fetch(`/api/v1/auth/signUp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			if (data.success === false) {
				dispatch(authFailure(data.message));
				return;
			}

			dispatch(authSuccess(data));
			navigate("/sign-in");
		} catch (error) {
			dispatch(authFailure(error.message));
		}
	};

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, []);

	return (
		<div className='p-3 max-w-lg mx-auto'>
			<h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSubmitSignUp}>
				<input
					required
					type='text'
					placeholder='Input your username'
					className='border p-3 rounded-lg'
					id='username'
					name='username'
					onChange={handleChangeInput}
					value={formData.username}
				/>
				<input
					required
					type='email'
					placeholder='Input your email'
					className='border p-3 rounded-lg'
					id='email'
					name='email'
					onChange={handleChangeInput}
					value={formData.email}
				/>
				<input
					required
					type='password'
					placeholder='Input your password'
					className='border p-3 rounded-lg'
					id='password'
					name='password'
					onChange={handleChangeInput}
					value={formData.password}
					minLength={8}
				/>
				<button
					disabled={loading}
					className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'
				>
					{loading ? "Loading..." : "Sign Up"}
				</button>
			</form>
			<div className='flex gap-2 mt-5'>
				<p>Have an account?</p>
				<Link to={"/sign-in"}>
					<span className='text-blue-700'>Sign In</span>
				</Link>
			</div>
			{error && <p className='text-red-500 mt-5 italic'>{error}</p>}
		</div>
	);
};

export default SignUp;
