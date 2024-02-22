import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ListingItem from "../components/ListingItem";
import "swiper/css/bundle";

const Home = () => {
	const [offerListings, setOfferListings] = useState([]);
	const [saleListings, setSaleListings] = useState([]);
	const [rentListings, setRentListings] = useState([]);
	SwiperCore.use([Navigation]);

	useEffect(() => {
		const fetchSaleListings = async () => {
			try {
				const res = await fetch(
					"/api/v1/listing/dataFilter?type=sale&limit=4",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await res.json();
				setSaleListings(data.data);
			} catch (err) {
				console.log(err);
			}
		};

		const fetchRentListings = async () => {
			try {
				const res = await fetch(
					"/api/v1/listing/dataFilter?type=rent&limit=4",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await res.json();
				setRentListings(data.data);
				fetchSaleListings();
			} catch (err) {
				console.log(err);
			}
		};

		const fetchOfferListings = async () => {
			try {
				const res = await fetch(
					"/api/v1/listing/dataFilter?offer=true&limit=4",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await res.json();
				setOfferListings(data.data);
				fetchRentListings();
			} catch (err) {
				console.log(err);
			}
		};

		fetchOfferListings();
	}, []);

	return (
		<div>
			{/* Header */}
			<div className='flex flex-col gap-6 p-28 px-3 max-w-6xl'>
				<h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
					Find your next <span className='text-slate-500'>perfect</span>{" "}
					<br /> place with ease
				</h1>
				<div className='text-gray-400 text-xs sm:text-sm'>
					Faishal Estate is the best place to find your next perfect place
					to live.
					<br />
					We have a wide range of properties for you to choose from.
				</div>
				<Link
					to={"/search"}
					className='text-xs sm:text-sm text-blue-800 font-bold'
				>{`Let's get started...`}</Link>
			</div>

			{/* Swiper */}
			<Swiper navigation>
				{offerListings &&
					offerListings.length > 0 &&
					offerListings.map((listing) => (
						<SwiperSlide key={listing._id}>
							<div
								style={{
									background: `url(${listing.imageUrls[0]}) center no-repeat`,
									backgroundSize: "cover",
								}}
								className='h-[300px]'
							></div>
						</SwiperSlide>
					))}
			</Swiper>

			{/* listing result for offer, sale and rent */}
			<div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-5'>
				{/* Offer */}
				{offerListings && offerListings.length > 0 && (
					<div>
						<div className='my-3'>
							<h2 className='text-2xl font-semibold text-slate-700'>
								Recent Offer
							</h2>
							<Link
								className='text-sm text-blue-600'
								to={"/search?offer=true"}
							>
								Show more offers
							</Link>
						</div>

						<div className='flex flex-wrap gap-4'>
							{offerListings.map((listing) => (
								<ListingItem key={listing._id} listing={listing} />
							))}
						</div>
					</div>
				)}

				{/* Sale */}
				{saleListings && saleListings.length > 0 && (
					<div>
						<div className='my-3'>
							<h2 className='text-2xl font-semibold text-slate-700'>
								Recent place for sale
							</h2>
							<Link
								className='text-sm text-blue-600'
								to={"/search?type=sale"}
							>
								Show more places for sale
							</Link>
						</div>

						<div className='flex flex-wrap gap-4'>
							{saleListings.map((listing) => (
								<ListingItem key={listing._id} listing={listing} />
							))}
						</div>
					</div>
				)}

				{/* Rent */}
				{rentListings && rentListings.length > 0 && (
					<div>
						<div className='my-3'>
							<h2 className='text-2xl font-semibold text-slate-700'>
								Recent place for rent
							</h2>
							<Link
								className='text-sm text-blue-600'
								to={"/search?type=rent"}
							>
								Show more places for rent
							</Link>
						</div>

						<div className='flex flex-wrap gap-4'>
							{rentListings.map((listing) => (
								<ListingItem key={listing._id} listing={listing} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
