import { shellImg } from '@/assets'

const Navbar = () => {
  return (
    <nav className='bg-primary/90'>
      <div className='container mx-auto flex justify-between items-center py-2'>
        <div className='flex justify-center items-center space-x-2'>
          <img src={shellImg} className='w-[50px] h-[50px]' alt="Company logo" />
          <span className='italic text-white'>Name</span>
        </div>

        <ul className='hidden  md:flex text-white space-x-6'>
          <li><a href="#forSale">For Sale</a></li>
          <li><a href="#forRent">For Rent</a></li>
          <li><a href="#agents">Agents</a></li>
          <li><a href="#developers">Developers</a></li>
          <li><a href="#advice">Advice</a></li>
          <li><a href="#blog">Blog</a></li>
        </ul>

        <button className='text-white bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-md'>Sign In</button>
      </div>
    </nav>
  )
}

export default Navbar