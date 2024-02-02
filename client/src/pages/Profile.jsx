import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const [formData, setFormData] = useState({
		username: currentUser.username || "",
		email: currentUser.email || "",
		avatar: currentUser.avatar || "",
	});

	return (
		<div className='p-3 max-w-lg mx-auto'>
			<h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
			<form className='flex flex-col gap-3'>
				<img
					className='rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2'
					src={currentUser.avatar}
					alt={`Profile User ${currentUser.name}`}
				/>
				<input
					type='text'
					value={formData.username}
					placeholder='username'
					id='username'
					className='border p-3 rounded-lg'
				/>
				<input
					type='email'
					value={formData.email}
					placeholder='email'
					id='email'
					className='border p-3 rounded-lg'
				/>
				<input
					type='password'
					placeholder='password'
					id='password'
					className='border p-3 rounded-lg'
				/>
				<button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-85 disabled:opacity-80'>
					Update
				</button>
				<button className='bg-green-800 text-white rounded-lg p-3 uppercase hover:opacity-85 disabled:opacity-80'>
					Create Listing
				</button>
			</form>
			<div>
				<button className='bg-yellow-700 text-white p-3 hover:opacity-80'>
					<FaSignOutAlt />
					<span>Delete Account</span>
				</button>
				<button className='bg-red-700 text-white p-3 hover:opacity-80'>
					Sign Out
				</button>
			</div>
		</div>
	);
};

export default Profile;
