import { MdLocationOn, MdOutlineDescription } from "react-icons/md";
import {
	FaDollarSign,
	FaBath,
	FaBed,
	FaParking,
	FaBoxes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
	return (
		<div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
			<Link to={`/listing/${listing._id}`}>
				<img
					src={
						listing.imageUrls[0] ||
						"https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Foffice-building&psig=AOvVaw30qxcp1GfjtjB7IzqiGFXr&ust=1708585932256000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLimu97wu4QDFQAAAAAdAAAAABAE"
					}
					alt='Listing Cover'
					className='h-[270px] sm:h-[270px] w-full object-cover hover:scale-105 transition-scale-duration-2000'
				/>
				<div className='p-3 flex flex-col gap-2 w-full'>
					<p className='truncate text-lg font-semibold text-slate-700'>
						{listing.name}
					</p>
					<div className='flex items-center gap-2'>
						<MdLocationOn className='h-4 w-4 text-green-700' />
						<p className='text-sm text-gray-600 truncate w-full'>
							{listing.address}
						</p>
					</div>
					<div className='flex items-center gap-2 border-b pb-2'>
						<MdOutlineDescription className='h-4 w-4 text-blue-600' />
						<p className='text-sm text-gray-600 truncate w-full'>
							{listing.description}
						</p>
					</div>
					<div className='flex items-center gap-2 mt-2'>
						<FaDollarSign className='h-4 w-4 text-yellow-600' />
						<p className='text-sm font-semibold text-slate-700'>
							$
							{listing.offer
								? listing.discountPrice.toLocaleString("en-US")
								: listing.regularPrice.toLocaleString("en-US")}
							{listing.type === "rent" && " / Month"}
						</p>
					</div>
					<div className='flex gap-4'>
						<div className='flex items-center gap-2'>
							<FaBed className='h-4 w-4 text-gray-600' />
							<p className='text-sm font-semibold text-slate-700'>
								{listing.bedrooms > 1
									? `${listing.bedrooms} beds`
									: `${listing.bedrooms} bed`}
							</p>
						</div>
						<div className='flex items-center gap-2'>
							<FaBath className='h-4 w-4 text-slate-700' />
							<p className='text-sm font-semibold text-slate-700'>
								{listing.bathrooms > 1
									? `${listing.bathrooms} baths`
									: `${listing.bathrooms} bath`}
							</p>
						</div>
					</div>
					<div className='flex gap-4'>
						<div className='flex items-center gap-2'>
							<FaParking className='h-4 w-4 text-yellow-600' />
							<p className='text-sm font-semibold text-slate-700'>
								{listing.parking ? "Parking Area" : "Not Parking Area"}
							</p>
						</div>
						<div className='flex items-center gap-2'>
							<FaBoxes className='h-4 w-4 text-[brown]' />
							<p className='text-sm font-semibold text-slate-700'>
								{listing.furnished ? "Furnished" : "No Furnished"}
							</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ListingItem;
