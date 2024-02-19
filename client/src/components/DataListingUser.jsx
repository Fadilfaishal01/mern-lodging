import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	deleteListingFailure,
	deleteListingStart,
	deleteListingSuccess,
} from "../redux/listing/listingSlice";

const DataListingUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { dataListing, loading } = useSelector((state) => state.listing);

	const handleEventDeleteListing = async (id) => {
		try {
			dispatch(deleteListingStart());

			const res = await fetch(`/api/v1/listing/delete/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(deleteListingFailure(data.message));
			}

			dispatch(
				deleteListingSuccess({
					message: data.message,
					data: data.data,
				})
			);
		} catch (error) {
			dispatch(deleteListingFailure(error.message));
		}
	};

	const handleEventUpdateListing = (id) => {
		return navigate(`/update-listing/${id}`);
	};

	return dataListing.map((listing, kData) => (
		<div
			key={listing._id + kData}
			className='border rounded-lg gap-4 p-3 flex justify-between items-center'
		>
			<Link to={`/listing/${listing._id}`} className='flex items-center'>
				<img
					src={listing.imageUrls[0]}
					alt={`Image Listing ${listing.name}`}
					className='h-16 w-16 object-contain rounded-lg mr-4'
				/>
				<div className='hover:text-slate-600'>
					<h6 className='font-semibold truncate'>{listing.name}</h6>
					<p className='text-xs'>{listing.description}</p>
				</div>
			</Link>
			<div className='flex flex-row items-center'>
				<button
					onClick={() => handleEventUpdateListing(listing._id)}
					disabled={loading}
					className='p-3 bg-blue-600 text-white rounded-lg mr-1'
				>
					<FaPencilAlt />
				</button>
				<button
					disabled={loading}
					onClick={() => handleEventDeleteListing(listing._id)}
					className='p-3 bg-red-600 text-white rounded-lg'
				>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	));
};

export default DataListingUser;
