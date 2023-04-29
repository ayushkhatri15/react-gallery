import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const searchItems = [
	{ name: "Nature", id: 1 },
	{ name: "Temple", id: 2 },
	{ name: "India", id: 3 },
	{ name: "Sky", id: 4 },
	{ name: "Galaxy", id: 5 },
];

const Images = () => {
	const [photos, setphotos] = useState([]);
	const [loader, setLoader] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [query, setQuery] = useState("airplane");
	const [noPhotos, setnoPhotos] = useState(false);

	const url = `https://api.pexels.com/v1/search?query=${query}&page=${currentPage}&per_page=25`;

	const fetchPhotos = async () => {
		await fetch(url, {
			headers: {
				Authorization: import.meta.env.VITE_PEXELS_API_KEY,
			},
		})
			.then((resp) => {
				return resp.json();
			})
			.then((res) => {
				if (res.photos.length === 0) {
					setnoPhotos(true);
				} else {
					setphotos(res.photos);
					setnoPhotos(false);
				}
				setLoader(false);
			});
	};

	useEffect(() => {
		fetchPhotos();
	}, [currentPage]);

	const enterKey = (e) => {
		if (e.keyCode === 13) {
			fetchPhotos();
			setLoader(true);
		}
	};

	const handleSearch = () => {
		fetchPhotos();
		setLoader(true);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
		setLoader(true);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
		setLoader(true);
	};

	const handleExamples = (name) => {
		setQuery(name);
		fetchPhotos();
		setLoader(true);
		setCurrentPage(1);
	};

	return (
		<div className='flex flex-col  justify-center items-center mt-10'>
			<div className='flex flex-col  justify-center items-center'>
				<h1 className='text-2xl  font-bold'>React Gallery</h1>
				<p className='text-base font-medium'>
					Made by
					<a
						href={"https://ayushkhatri.netlify.app"}
						className='ml-1 text-green-600'
					>
						Ayush Khatri
					</a>
				</p>
			</div>
			<div id='searchBar' className=''>
				<input
					className='px-4 my-5 p-6 py-3 rounded-full bg-[#00000000] outline-none  border-gray-900 border w-full max-w-md'
					autoComplete='off'
					id='input'
					type='text'
					onChange={(e) => setQuery(e.target.value)}
					placeholder='Seacrh photos...'
					onKeyDown={enterKey}
				/>

				<img
					className='w-8 p-1 relative right-10 sm:mr-12 cursor-pointer'
					onClick={handleSearch}
				/>
			</div>
			<div className='btns flex justify-center left-[50rem] z-10'>
				<button
					className={`px-8 py-3 border border-gray-500 text-gray-900 font-normal m-3 ${
						currentPage === 1 ? "border border-gray-200  text-gray-300" : ""
					}`}
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				>
					Prev
				</button>

				<button
					className='px-8  py-3 border border-gray-500  text-gray-900 font-normal m-3  '
					onClick={handleNextPage}
				>
					Next
				</button>
			</div>

			<div className='mt-10 flex items-center justify-center gap-5  flex-wrap mx-5'>
				{searchItems.map((item) => (
					<div key={item.id}>
					
						<button
							onClick={() => handleExamples(item.name)}
							className='border px-5 py-1 border-slate-400 rounded-full'
						>
							{item.name}
						</button>
					</div>
				))}
			</div>

			<div className='photos flex flex-wrap justify-center items-center gap-5 mt-10 px-10 mb-10'>
				{loader ? (
					<p className='text-black'>Loading....</p>
				) : noPhotos ? (
					<p className='text-black'>No photos found</p>
				) : (
					photos.map((item, id) => {
						return (
							<div className='img' key={id}>
								<img src={item.src.tiny} alt={item.photographer} />

								<div>
									<a
										target='_blank`'
										className='flex justify-center items-center text-center mt-2 py-2 px-6 bg-[#00846b] text-white w-full '
										href={item.src.original}
										download={`${item.photographer}-${id}`}
									>
										Preview
									</a>
								</div>
							</div>
						);
					})
				)}
			</div>

			<a className='mb-10' href='https://www.pexels.com' target='_blank'>
				Photos provided by <span className='text-green-600'>Pexels</span>
			</a>
		</div>
	);
};

export default Images;
