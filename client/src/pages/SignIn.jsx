import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authFailure, authSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth); // state.user ini penamaan dari reducernya
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmitSignIn = async (e) => {
		e.preventDefault();
		dispatch(authStart());
		try {
			// /api ini di definisikan di vite.config.js
			const res = await fetch(`/api/v1/auth/signIn`, {
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

			dispatch(
				authSuccess({
					currentUser: data.data,
					message: data.message,
				})
			);
			navigate("/");
		} catch (error) {
			dispatch(authFailure(error.message));
		}
	};

	const handleChangeInput = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='p-3 max-w-lg mx-auto'>
			{error && (
				<div
					className='bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4'
					role='alert'
				>
					<p className='font-bold'>Warning</p>
					<p>{error}</p>
				</div>
			)}
			<h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSubmitSignIn}>
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
					{loading ? "Loading..." : "Sign In"}
				</button>
				<div className='w-full flex justify-center items-center'>
					<OAuth typeOAuth='google' />
					<OAuth typeOAuth='facebook' />
					<OAuth typeOAuth='github' />
				</div>
			</form>
			<div className='flex gap-2 mt-5'>
				<p>{`Don't have an account?`}</p>
				<Link to={"/sign-up"}>
					<span className='text-blue-700'>Sign Up</span>
				</Link>
			</div>
		</div>
	);
};

export default SignIn;
