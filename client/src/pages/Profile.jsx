import {
	FaSignOutAlt,
	FaTrashAlt,
	FaPlusCircle,
	FaPencilAlt,
	FaEye,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	signOutStart,
	signOutFailure,
	signOutSuccess,
} from "./../redux/user/userSlice.js";
import {
	getListingStart,
	getListingSuccess,
	getListingFailure,
} from "./../redux/listing/listingSlice.js";
import { useDispatch } from "react-redux";
import { app } from "../firebase/firebase";
import DataListingUser from "../components/DataListingUser.jsx";

const Profile = () => {
	// Firebase storage
	// Allow read;
	// Allow write: if request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches('image/.*')
	const dispatch = useDispatch();
	const fileRef = useRef(null);
	const { currentUser, loading, error } = useSelector((state) => state.auth);
	const { AllDataListing } = useSelector((state) => state.listing);
	const [file, setFile] = useState(undefined);
	const [formData, setFormData] = useState({
		username: currentUser.username || "",
		email: currentUser.email || "",
		avatar: currentUser.avatar || "",
		password: "",
	});
	const [messageUpload, setMessageUpload] = useState("");
	const [messageUpdated, setMessageUpdated] = useState("");

	const handleChangeInput = (e) => {
		setFormData({
			...formData,
			[e.target.name]:
				e.target.type == "file" ? e.target.files[0] : e.target.value,
		});
	};

	const handleEventSubmitProfile = async (e) => {
		e.preventDefault();

		try {
			dispatch(updateUserStart());

			const res = await fetch(`/api/v1/user/update/${currentUser._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.success === false) {
				dispatch(updateUserFailure(data.message));
				return;
			}

			dispatch(
				updateUserSuccess({
					currentUser: data.data,
				})
			);
			setMessageUpdated(data.message);
		} catch (error) {
			dispatch(updateUserFailure(error.message));
		}
	};

	const handleEventDeleteUser = async () => {
		if (window.confirm("You wan't delete this account ?")) {
			try {
				dispatch(deleteUserStart());

				const res = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const data = await res.json();
				if (data.success === false) {
					dispatch(deleteUserFailure(data.message));
					return;
				}

				dispatch(deleteUserSuccess(data.message));
			} catch (error) {
				dispatch(deleteUserFailure(error.message));
			}
		}
	};

	const handleEventSignOut = async () => {
		try {
			dispatch(signOutStart());
			const res = await fetch(`api/v1/auth/signOut`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.success === false) {
				dispatch(signOutFailure(data.message));
				return;
			}

			dispatch(signOutSuccess(data));
		} catch (error) {
			dispatch(signOutFailure(error.message));
		}
	};

	const handleFileUpload = (file) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name; // generate unique filename
		const storageRef = ref(storage, "imgUser/" + fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setMessageUpload(`Upload is ${Math.round(progress)} % done`);
			},
			(error) => {
				setMessageUpload(error.message);
			},
			() => {
				setMessageUpload("Uploaded Image Profile Successfully");
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFormData({ ...formData, avatar: downloadURL });
					setMessageUpload("");
				});
			}
		);
	};

	const handleEventShowListing = async () => {
		try {
			dispatch(getListingStart());

			const res = await fetch(`/api/v1/listing`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(getListingFailure(data.message));
			}

			dispatch(
				getListingSuccess({
					message: data.message,
					data: data.data,
				})
			);
		} catch (error) {
			dispatch(getListingFailure(error.message));
		}
	};

	useEffect(() => {
		if (file) {
			handleFileUpload(file);
		}
		handleEventShowListing();
	}, [file]);

	return (
		<div className='p-3 max-w-lg mx-auto'>
			{error && (
				<div
					className='bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md'
					role='alert'
				>
					<div className='flex items-center'>
						<div className='py-1'>
							<svg
								className='fill-current h-6 w-6 text-red-500 mr-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
							</svg>
						</div>
						<div>
							<p className='font-bold'>Warning</p>
							<p className='text-sm'>{error}</p>
						</div>
					</div>
				</div>
			)}

			{messageUpdated && (
				<div
					className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md'
					role='alert'
				>
					<div className='flex items-center'>
						<div className='py-1'>
							<svg
								className='fill-current h-6 w-6 text-teal-500 mr-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
							</svg>
						</div>
						<div>
							<p className='font-bold'>Success</p>
							<p className='text-sm'>{messageUpdated}</p>
						</div>
					</div>
				</div>
			)}

			<h1 className='text-3xl font-semibold text-center my-4'>Profile</h1>
			<form
				className='flex flex-col gap-3'
				onSubmit={handleEventSubmitProfile}
			>
				<input
					onChange={(e) => setFile(e.target.files[0])}
					type='file'
					name='file'
					ref={fileRef}
					hidden
					accept='image/*'
				/>
				<img
					onClick={() => fileRef.current.click()}
					className='rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2'
					src={formData.avatar || currentUser.avatar}
					alt={`Profile User ${formData.username}`}
				/>
				{messageUpload && (
					<p className='text-center text-green-600 italic'>
						{messageUpload}
					</p>
				)}
				<input
					type='text'
					value={formData.username}
					placeholder='username'
					id='username'
					name='username'
					className='border p-3 rounded-lg'
					onChange={(e) => handleChangeInput(e)}
				/>
				<input
					type='email'
					value={formData.email}
					placeholder='email'
					id='email'
					name='email'
					className='border p-3 rounded-lg'
					onChange={(e) => handleChangeInput(e)}
				/>
				<input
					autoComplete='false'
					type='password'
					placeholder='password'
					id='password'
					name='password'
					className='border p-3 rounded-lg'
					onChange={(e) => handleChangeInput(e)}
				/>
				<button
					disabled={loading}
					className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-85 disabled:opacity-80 flex items-center justify-center gap-2'
				>
					<FaPencilAlt />
					<span className='font-semibold'>
						{loading ? "Loading..." : "Update"}
					</span>
				</button>
				<Link
					to={"/create-listing"}
					className='bg-green-800 text-white rounded-lg p-3 hover:opacity-85 disabled:opacity-80 flex items-center justify-center gap-2'
				>
					<FaPlusCircle />
					<span className='font-semibold'>Create Listing</span>
				</Link>
			</form>
			<div className='flex justify-between mt-3'>
				<button
					onClick={handleEventDeleteUser}
					className='bg-yellow-500 rounded-lg text-white p-2 hover:opacity-80 flex items-center justify-center gap-2'
				>
					<FaTrashAlt />
					<span className='font-semibold'>Delete Account</span>
				</button>
				<button
					onClick={handleEventSignOut}
					className='bg-red-700 rounded-lg text-white p-3 hover:opacity-80 flex items-center justify-center gap-2'
				>
					<FaSignOutAlt />
					<span className='font-semibold'>Sign Out</span>
				</button>
			</div>
			<hr className='my-6' />
			<div className='flex justify-center my-6'>
				<p className='text-2xl font-semibold'>
					Data Listing {currentUser.username}
				</p>
			</div>
			<DataListingUser dataListing={AllDataListing} />
		</div>
	);
};

export default Profile;
