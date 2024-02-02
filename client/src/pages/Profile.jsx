import {
	FaSignOutAlt,
	FaTrashAlt,
	FaPlusCircle,
	FaPencilAlt,
} from "react-icons/fa";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
	const fileRef = useRef(null);
	const { currentUser } = useSelector((state) => state.auth);
	const [formData, setFormData] = useState({
		username: currentUser.username || "",
		email: currentUser.email || "",
		avatar: currentUser.avatar || "",
	});

	return (
		<div className='p-3 max-w-lg mx-auto'>
			<h1 className='text-3xl font-semibold text-center my-4'>Profile</h1>
			<form className='flex flex-col gap-3'>
				<input type='file' ref={fileRef} hidden accept='image/*' />
				<img
					onClick={() => fileRef.current.click()}
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
				<button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-85 disabled:opacity-80 flex items-center justify-center gap-2'>
					<FaPencilAlt />
					<span className='font-semibold'>Update</span>
				</button>
				<button className='bg-green-800 text-white rounded-lg p-3 hover:opacity-85 disabled:opacity-80 flex items-center justify-center gap-2'>
					<FaPlusCircle />
					<span className='font-semibold'>Create Listing</span>
				</button>
			</form>
			<div className='flex justify-between mt-3'>
				<button className='bg-yellow-500 rounded-lg text-white p-2 hover:opacity-80 flex items-center justify-center gap-2'>
					<FaTrashAlt />
					<span className='font-semibold'>Delete Account</span>
				</button>
				<button className='bg-red-700 rounded-lg text-white p-3 hover:opacity-80 flex items-center justify-center gap-2'>
					<FaSignOutAlt />
					<span className='font-semibold'>Sign Out</span>
				</button>
			</div>
		</div>
	);
};

export default Profile;
