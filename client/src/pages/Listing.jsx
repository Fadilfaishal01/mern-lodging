import { useEffect, useState } from "react";
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

const Listing = () => {
	SwiperCore.use([Navigation]);
	const dispatch = useDispatch();
	const { dataListingById, error, message, loading } = useSelector(
		(state) => state.listing
	);
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
			{dataListingById && !loading && !error && (
				<Swiper navigation>
					{dataListingById.imageUrls.map((url, index) => (
						<SwiperSlide key={url + index}>
							<div
								className='h-[550px]'
								style={{
									background: `url(${url}) center no-repeat`,
									backgroundSize: "cover",
								}}
							></div>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</main>
	);
};

export default Listing;
