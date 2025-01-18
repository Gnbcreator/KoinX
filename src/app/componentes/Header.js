import Container from '@mui/material/Container'
import Image from 'next/image'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@mui/icons-material'
import { useState } from 'react'

export default function Header(params) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    return (
        <>
            <Container maxWidth="xl" className=' '>
                <div className='flex justify-between h-[60.75px] lg:h-[80px]  '>
                    <div className='my-auto'>
                        <Image src={'/logo.svg'} className='w-[80.14px] h-[20.25px]' width={100} height={100} alt='img' />
                    </div>
                    <button className='lg:hidden xl:hidden mt-3  my-auto' onClick={handleMenu}>
                        <Menu className='mt-[10px] w-[27.42px] h-[27.42px] lg:hidden xl:hidden' />
                    </button>

                    <div className='font-semibold text-xl lg:flex gap-5 my-auto hidden'>
                        <nav className=' lg:flex my-auto gap-12'>
                            <div className='flex gap-7 my-auto'>
                                <Link href={''}>
                                    <h4>Crypto Taxes</h4>
                                </Link>
                                <Link href={''}>
                                    <h4>Free Tool</h4>
                                </Link>
                                <Link href={''}>
                                    <h4>Resource Center</h4>
                                </Link>
                            </div>
                            <div className='my-auto'>
                                <button className='my-auto bg-gradient-to-r  from-[#2870EA] to-[#1B4AEF] rounded-lg w-[136px] h-[40px] text-white'>
                                    Get Started
                                </button>
                            </div>
                        </nav>

                    </div>
                </div >

            </Container >
            <Container maxWidth='sm'>
                {/* nav for small devices */}
                {
                    menuOpen ?
                        <div className=' lg:hidden xl:hidden bg-white animate-slideDown rounded-lg inset-2 p-4  h-fit absolute top-[64px]  shadow-md transition-all delay-75'>
                            <div className='font-semibold text-xl   lg:hidden grid'>
                                <nav className=''>
                                    <Link href={''} className='hover:bg-violet-200'>
                                        <h4 className='p-3'>Crypto Taxes</h4>
                                    </Link>
                                    <Link href={''} className='hover:bg-violet-200'>
                                        <h4 className='p-3'>Free Tool</h4>
                                    </Link>
                                    <Link href={''} className='hover:bg-violet-200'>
                                        <h4 className='p-3'>Resource Center</h4>
                                    </Link>
                                </nav>
                                <div className='p-3'>
                                    <button className=' w-full bg-gradient-to-r  from-[#2870EA] to-[#1B4AEF] rounded-lg  h-[40px] text-white'>
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        ''
                }
            </Container>
        </>
    )
}