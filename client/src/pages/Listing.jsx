import { useEffect, useState } from "react";
import {
	FaBath,
	FaBed,
	FaChair,
	FaMapMarkerAlt,
	FaParking,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	getListingFirstFailure,
	getListingFirstStart,
	getListingFirstSuccess,
} from "../redux/listing/listingSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Contact from "../components/Contact";

const Listing = () => {
	SwiperCore.use([Navigation]);
	const dispatch = useDispatch();
	const { FirstDataListing, error, message, loading } = useSelector(
		(state) => state.listing
	);
	const { currentUser } = useSelector((state) => state.auth);
	const [contact, setContact] = useState(false);
	const params = useParams();

	useEffect(() => {
		const fetchListing = async () => {
			try {
				dispatch(getListingFirstStart());
				const res = await fetch(`/api/v1/listing/${params.id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const data = await res.json();
				if (data.success === false) {
					dispatch(getListingFirstFailure(data.message));
				}

				dispatch(
					getListingFirstSuccess({
						message: data.message,
						data: data.data,
					})
				);
			} catch (error) {
				dispatch(getListingFirstFailure(error.message));
			}
		};

		fetchListing();
	}, [params.id]);

	return (
		<main>
			{loading && (
				<p className='text-center italic font-semibold my-3'>
					Wait a minute, data is loading...
				</p>
			)}
			{error && (
				<p className='text-center text-red-600 italic font-semibold my-3'>
					{error}
				</p>
			)}
			{FirstDataListing && !loading && !error && (
				<div>
					<Swiper navigation>
						{FirstDataListing.imageUrls.map((url, index) => (
							<SwiperSlide key={url + index}>
								<div
									className='h-[450px]'
									style={{
										background: `url(${url}) center no-repeat`,
										backgroundSize: "cover",
									}}
								></div>
							</SwiperSlide>
						))}
					</Swiper>

					<div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
						<p className='text-2xl font-semibold'>
							{FirstDataListing.name} - ${" "}
							{FirstDataListing.offer
								? FirstDataListing.discountPrice.toLocaleString("en-US")
								: FirstDataListing.regularPrice.toLocaleString("en-US")}
							{FirstDataListing.type === "rent" && " / month"}
						</p>
						<p className='flex items-center mt-6 text-slate-600  text-sm'>
							<FaMapMarkerAlt className='text-green-700' />
							{FirstDataListing.address}
						</p>
						<div className='flex gap-4'>
							<p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
								{FirstDataListing.type === "rent"
									? "For Rent"
									: "For Sale"}
							</p>
							{FirstDataListing.offer && (
								<p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
									$
									{+FirstDataListing.regularPrice -
										+FirstDataListing.discountPrice}{" "}
									OFF
								</p>
							)}
						</div>
						<p className='text-slate-800'>
							<span className='font-semibold text-black'>
								Description -{" "}
							</span>
							{FirstDataListing.description}
						</p>
						<ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
							<li className='flex items-center gap-1 whitespace-nowrap '>
								<FaBed className='text-lg' />
								{FirstDataListing.bedrooms > 1
									? `${FirstDataListing.bedrooms} beds `
									: `${FirstDataListing.bedrooms} bed `}
							</li>
							<li className='flex items-center gap-1 whitespace-nowrap '>
								<FaBath className='text-lg' />
								{FirstDataListing.bathrooms > 1
									? `${FirstDataListing.bathrooms} baths `
									: `${FirstDataListing.bathrooms} bath `}
							</li>
							<li className='flex items-center gap-1 whitespace-nowrap '>
								<FaParking className='text-lg' />
								{FirstDataListing.parking
									? "Parking Spot"
									: "No Parking"}
							</li>
							<li className='flex items-center gap-1 whitespace-nowrap '>
								<FaChair className='text-lg' />
								{FirstDataListing.furnished
									? "Furnished"
									: "Unfurnished"}
							</li>
						</ul>
						{currentUser &&
							FirstDataListing.userRef !== currentUser._id &&
							!contact && (
								<button
									onClick={() => setContact(true)}
									className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
								>
									Contact Landlord
								</button>
							)}
						{contact && <Contact listing={FirstDataListing} />}
					</div>
				</div>
			)}
		</main>
	);
};

export default Listing;
