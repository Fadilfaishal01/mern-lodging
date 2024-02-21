import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listing from "../../../api/model/listing.model";
import ListingItem from "../components/ListingItem";

const Search = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [dataListing, setDataListing] = useState([]);
	const [showMore, setShowMore] = useState(false);

	const [sidebarData, setSidebarData] = useState({
		searchTerm: "",
		type: "all",
		parking: false,
		furnished: false,
		offer: false,
		sort: "created_at",
		order: "desc",
	});

	const handleEventChangeInput = (e) => {
		if (
			e.target.id === "all" ||
			e.target.id === "rent" ||
			e.target.id === "sale"
		) {
			setSidebarData({ ...sidebarData, type: e.target.id });
		}

		if (e.target.id === "searchTerm") {
			setSidebarData({ ...sidebarData, searchTerm: e.target.value });
		}

		if (
			e.target.id === "parking" ||
			e.target.id === "furnished" ||
			e.target.id === "offer"
		) {
			setSidebarData({
				...sidebarData,
				[e.target.id]:
					e.target.checked || e.target.checked === "true" ? true : false,
			});
		}

		if (e.target.id === "sort_order") {
			const sort = e.target.value.split("_")[0] || "created_at";
			const order = e.target.value.split("_")[1] || "desc";

			setSidebarData({ ...sidebarData, sort, order });
		}
	};

	const handleEventSubmitSearch = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams();
		urlParams.set("searchTerm", sidebarData.searchTerm);
		urlParams.set("type", sidebarData.type);
		urlParams.set("parking", sidebarData.parking);
		urlParams.set("furnished", sidebarData.furnished);
		urlParams.set("offer", sidebarData.offer);
		urlParams.set("sort", sidebarData.sort);
		urlParams.set("order", sidebarData.order);

		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	const onShowMoreClick = async () => {
		const numberOfListings = dataListing.length;
		const startIndex = numberOfListings;
		const urlParams = new URLSearchParams(location.search);
		urlParams.set("startIndex", startIndex);
		const searchQuery = urlParams.toString();

		const res = await fetch(`/api/v1/listing/dataFilter?${searchQuery}`);
		const data = await res.json();

		if (data.data.length < 6) {
			setShowMore(false);
		}

		setDataListing([...dataListing, ...data.data]);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		const typeFromUrl = urlParams.get("type");
		const parkingFromUrl = urlParams.get("parking");
		const furnishedFromUrl = urlParams.get("furnished");
		const offerFromUrl = urlParams.get("offer");
		const sortFromUrl = urlParams.get("sort");
		const orderFromUrl = urlParams.get("order");

		if (
			searchTermFromUrl ||
			typeFromUrl ||
			parkingFromUrl ||
			furnishedFromUrl ||
			offerFromUrl ||
			sortFromUrl ||
			orderFromUrl
		) {
			setSidebarData({
				searchTerm: searchTermFromUrl || "",
				type: typeFromUrl || "all",
				parking: parkingFromUrl === "true" ? true : false,
				furnished: furnishedFromUrl === "true" ? true : false,
				offer: offerFromUrl === "true" ? true : false,
				sort: sortFromUrl || "createdAt",
				order: orderFromUrl || "desc",
			});
		}

		const fetchListings = async () => {
			setLoading(true);

			try {
				const searchQuery = urlParams.toString();
				const res = await fetch(
					`/api/v1/listing/dataFilter?${searchQuery}`
				);
				const data = await res.json();

				if (data.success === false) {
					console.log(data.message);
				}

				if (data.data.length > 5) {
					setShowMore(true);
				}

				setLoading(false);
				setDataListing(data.data);
			} catch (error) {
				setLoading(false);
				console.log("Error : " + error.message);
			}
		};

		fetchListings();
	}, [location.search]);

	return (
		<div className='flex flex-col md:flex-row'>
			<div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
				<form
					className='flex flex-col gap-8'
					onSubmit={handleEventSubmitSearch}
				>
					<div className='flex items-center gap-2'>
						<label className='whitespace-nowrap font-semibold'>
							Search Term:
						</label>
						<input
							type='text'
							id='searchTerm'
							name='searchTerm'
							placeholder='Search Term...'
							className='border rounded-lg p-3 w-full'
							onChange={handleEventChangeInput}
							value={sidebarData.searchTerm}
						/>
					</div>
					<div className='flex gap-2 flex-wrap items-center'>
						<label className='whitespace-nowrap font-semibold'>
							Type:
						</label>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='all'
								className='w-5'
								checked={sidebarData.type === "all"}
								onChange={handleEventChangeInput}
							/>
							<span>Rent & Sale</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='rent'
								className='w-5'
								checked={sidebarData.type === "rent"}
								onChange={handleEventChangeInput}
							/>
							<span>Rent</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='sale'
								className='w-5'
								checked={sidebarData.type === "sale"}
								onChange={handleEventChangeInput}
							/>
							<span>Sale</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='offer'
								className='w-5'
								checked={sidebarData.type === "offer"}
								onChange={handleEventChangeInput}
							/>
							<span>Offer</span>
						</div>
					</div>
					<div className='flex gap-2 flex-wrap items-center'>
						<label className='whitespace-nowrap font-semibold'>
							Amenities:
						</label>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='parking'
								className='w-5'
								checked={sidebarData.parking}
								onChange={handleEventChangeInput}
							/>
							<span>Parking</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='furnished'
								className='w-5'
								checked={sidebarData.furnished}
								onChange={handleEventChangeInput}
							/>
							<span>Furnished</span>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<label className='whitespace-nowrap font-semibold'>
							Sort:
						</label>
						<select
							className='border rounded-lg p-3'
							id='sort_order'
							onChange={handleEventChangeInput}
							defaultValue={"created_at_desc"}
						>
							<option value='regularPrice_desc'>
								Price high to low
							</option>
							<option value='regularPrice_asc'>Price low to high</option>
							<option value='createdAt_desc'>Latest</option>
							<option value='createdAt_asc'>Oldest</option>
						</select>
					</div>
					<button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
						Search
					</button>
				</form>
			</div>
			<div className='flex flex-col'>
				<h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
					Listing Results
				</h1>
				<div className='p-7 flex flex-wrap gap-4'>
					{loading && (
						<p className='text-center italic text-lg text-slate-700'>
							Wait a minute, Loading...
						</p>
					)}

					{!loading && dataListing.length === 0 && (
						<p className='text-center italic text-lg text-slate-700'>
							No listing found!
						</p>
					)}

					{!loading &&
						dataListing.length > 0 &&
						dataListing.map((listing) => (
							<ListingItem key={listing._id} listing={listing} />
						))}

					{showMore && (
						<button
							onClick={() => onShowMoreClick()}
							className='p-3 bg-blue-700 text-center w-full font-semibold text-white rounded-lg'
						>
							Show More
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Search;
