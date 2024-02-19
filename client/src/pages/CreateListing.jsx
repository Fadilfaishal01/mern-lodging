import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { FaUpload, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { app } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.auth);
	const [files, setFiles] = useState([]);
	const [formData, setFormData] = useState({
		imageUrls: [],
		name: "",
		description: "",
		address: "",
		type: "rent",
		bedrooms: 1,
		bathrooms: 1,
		regularPrice: 300,
		discountPrice: 0,
		offer: false,
		parking: false,
		furnished: false,
		userRef: currentUser._id,
	});

	const [imageUploadError, setImageUploadError] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleUploadImages = () => {
		if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
			setUploading(true);
			setImageUploadError(false);
			const promises = [];

			for (let i = 0; i < files.length; i++) {
				promises.push(storeImage(files[i]));
			}

			Promise.all(promises)
				.then((urls) => {
					setFormData({
						...formData,
						imageUrls: formData.imageUrls.concat(urls),
					});
					setImageUploadError(false);
					setUploading(false);
				})
				.catch((err) => {
					console.log(err.message);
					setImageUploadError(err.message);
					setUploading(false);
				});
		} else {
			setImageUploadError("You can only upload 6 image per listing");
			setUploading(false);
		}
	};

	const handleRemoveImage = (indexImage) => {
		setFormData({
			...formData,
			imageUrls: formData.imageUrls.filter((_, i) => i !== indexImage),
		});
	};

	const storeImage = async (file) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app);
			const fileName = new Date().getTime() + file.name;
			const storageRef = ref(storage, "listing/" + fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Upload is ${progress} % done`);
				},
				(error) => {
					reject(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						resolve(downloadURL);
					});
				}
			);
		});
	};

	const handleEventChangeInput = (e) => {
		if (e.target.id === "sale" || e.target.id === "rent") {
			setFormData({
				...formData,
				type: e.target.id,
			});
		}

		if (
			e.target.id === "parking" ||
			e.target.id === "furnished" ||
			e.target.id === "offer"
		) {
			setFormData({
				...formData,
				[e.target.id]: e.target.checked,
			});
		}

		if (
			e.target.type === "number" ||
			e.target.type === "text" ||
			e.target.type === "textarea"
		) {
			setFormData({
				...formData,
				[e.target.id]: e.target.value,
			});
		}
	};

	const handleEventSubmitListing = async (e) => {
		e.preventDefault();
		try {
			if (formData.imageUrls.length < 1)
				return setError("You must upload at least one image");
			if (+formData.regularPrice < +formData.discountPrice)
				return setError("Discount price must be lower than regular price");

			setLoading(true);
			setError(false);

			const res = await fetch(`/api/v1/listing/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			setLoading(false);
			if (data.success === false) {
				setError(data.message);
			}
			navigate(`/listing/${data.data._id}`);
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	return (
		<main className='p-3 max-w-5xl mx-auto'>
			<h1 className='text-3xl font-semibold text-center my-7'>
				Create a Listing
			</h1>
			<form
				onSubmit={handleEventSubmitListing}
				className='flex flex-col gap-6 sm:flex-row'
			>
				<div className='flex flex-col gap-4 flex-1'>
					<input
						type='text'
						placeholder='Input Name'
						className='border p-3 rounded-lg'
						value={formData.name}
						onChange={handleEventChangeInput}
						id='name'
						maxLength='62'
						minLength='10'
						required
					/>
					<textarea
						placeholder='Input Description'
						className='border p-3 rounded-lg'
						id='description'
						required
						value={formData.description}
						onChange={handleEventChangeInput}
					/>
					<input
						type='text'
						placeholder='Input Address'
						className='border p-3 rounded-lg'
						id='address'
						required
						value={formData.address}
						onChange={handleEventChangeInput}
					/>
					<div className='flex gap-4 flex-wrap'>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='sale'
								className='w-5'
								onChange={handleEventChangeInput}
								checked={formData.type === "sale"}
							/>
							<span>Sale</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='rent'
								className='w-5'
								onChange={handleEventChangeInput}
								checked={formData.type === "rent"}
							/>
							<span>Rent</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='parking'
								className='w-5'
								onChange={handleEventChangeInput}
								checked={formData.parking}
							/>
							<span>Parking Spot</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='furnished'
								className='w-5'
								onChange={handleEventChangeInput}
								checked={formData.furnished}
							/>
							<span>Furnished</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='offer'
								className='w-5'
								onChange={handleEventChangeInput}
								checked={formData.offer}
							/>
							<span>Offer</span>
						</div>
					</div>
					<div className='flex flex-wrap gap-4'>
						<div className='flex items-center gap-2'>
							<input
								type='number'
								id='bedrooms'
								min='1'
								max='10'
								required
								className='p-3 border border-gray-300 rounded-lg'
								onChange={handleEventChangeInput}
								value={formData.bedrooms}
							/>
							<p>Beds</p>
						</div>
						<div className='flex items-center gap-2'>
							<input
								type='number'
								id='bathrooms'
								min='1'
								max='10'
								required
								className='p-3 border border-gray-300 rounded-lg'
								onChange={handleEventChangeInput}
								value={formData.bathrooms}
							/>
							<p>Baths</p>
						</div>
						<div className='flex items-center gap-2'>
							<input
								type='number'
								id='regularPrice'
								required
								className='p-3 border border-gray-300 rounded-lg'
								onChange={handleEventChangeInput}
								value={formData.regularPrice}
							/>
							<div className='flex flex-col items-center'>
								<p>Regular Price</p>
								<span className='text-xs'>($ / Month)</span>
							</div>
						</div>
						{formData.offer && (
							<div className='flex items-center gap-2'>
								<input
									type='number'
									id='discountPrice'
									required
									className='p-3 border border-gray-300 rounded-lg'
									onChange={handleEventChangeInput}
									value={formData.discountPrice}
								/>
								<div className='flex flex-col items-center'>
									<p>Discounted Price</p>
									<span className='text-xs'>($ / Month)</span>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className='flex flex-col gap-4 flex-1'>
					<p className='font-semibold'>
						Images:{" "}
						<span className='font-normal text-gray-600 ml-2'>
							The first image will be the cover (max 6)
						</span>
					</p>
					<div className='flex gap-4'>
						<input
							onChange={(e) => setFiles(e.target.files)}
							className='p-3 border border-gray-300 rounded w-full'
							type='file'
							id='images'
							accept='image/*'
							multiple
						/>
						<button
							type='button'
							disabled={uploading}
							onClick={handleUploadImages}
							className='flex items-center justify-center p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
						>
							{uploading ? (
								<FiLoader className='mr-2' />
							) : (
								<FaUpload className='mr-2' />
							)}
							<span>{uploading ? "Uploading..." : "Upload"}</span>
						</button>
					</div>
					{imageUploadError && (
						<p className='text-red-600 text-center italic text-sm'>
							{imageUploadError}
						</p>
					)}

					{formData.imageUrls.length > 0 &&
						formData.imageUrls.map((vData, kData) => (
							<div
								className='flex justify-between p-3 border items-center'
								key={vData + kData}
							>
								<img
									src={vData}
									alt={`Listing Image ${vData}`}
									className='w-40 h-40 object-cover rounded-lg '
								/>
								<button
									type='button'
									onClick={() => handleRemoveImage(kData)}
									className='flex items-center justify-center p-3 bg-red-600 text-white rounded-lg hover:opacity-80'
								>
									<FaTrashAlt />
								</button>
							</div>
						))}
					<button
						disabled={loading || uploading}
						className='flex items-center justify-center p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
					>
						{loading ? (
							<>
								<FiLoader className='mr-2' />
								<span>Creating...</span>
							</>
						) : (
							<>
								<FaPlusCircle className='mr-2' />
								<span>Create Listing</span>
							</>
						)}
					</button>
					{error && (
						<p className='text-red-600 italic text-center text-sm'>
							{error}
						</p>
					)}
				</div>
			</form>
		</main>
	);
};

export default CreateListing;
