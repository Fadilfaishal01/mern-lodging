import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);
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
		try {
			e.preventDefault();
			setLoading(true);
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
				setError(data.message);
				setLoading(false);
				return;
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

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
		</div>
	);
};

export default SignUp;
