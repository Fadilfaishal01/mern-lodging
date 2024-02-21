import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [offerListings, setOfferListings] = useState([]);
	const [saleListings, setSaleListings] = useState([]);
	const [rentListings, setRentListings] = useState([]);

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
		</div>
	);
};

export default Home;
