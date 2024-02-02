import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
	const { currentUser } = useSelector((state) => state.auth);
	return (
		<header className='bg-slate-200 shadow-md'>
			<div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
				<Link to={"/"}>
					<h1 className='font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer'>
						<span className='text-slate-500'>Continuar</span>
						<span className='text-slate-700'>Lodging</span>
					</h1>
				</Link>
				<form className='bg-slate-100 p-3 rounded-lg flex items-center'>
					<input
						type='text'
						placeholder='Search...'
						className='bg-transparent text-[16px] focus:outline-none w-24 sm:w-64'
					/>
					<FaSearch className='text-slate-600 cursor-pointer' />
				</form>
				<ul className='flex gap-6'>
					<Link to={"/"}>
						<li className='hidden sm:inline font-bold text-slate-600 hover:text-slate-900'>
							Home
						</li>
					</Link>
					<Link to={"/about"}>
						<li className='hidden sm:inline font-bold text-slate-600 hover:text-slate-900'>
							About
						</li>
					</Link>
					<Link to={"/profile"}>
						{currentUser ? (
							<img
								className='rounded-full w-7 h-7 object-cover'
								src={currentUser.avatar}
								alt={`Image User ${currentUser.name}`}
							/>
						) : (
							<li className='font-bold text-slate-600 hover:text-slate-900'>
								Sign In
							</li>
						)}
					</Link>
				</ul>
			</div>
		</header>
	);
};

export default Header;
