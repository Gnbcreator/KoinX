import numberFormater from '@/utils/numberFormater';
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Skeleton } from '@mui/material';
import Image from "next/image";

export default function Footer() {
    const [trendingCoins, setTrendingCoins] = useState([])

    const scrollLeft1 = (e) => {

        const slider = document.getElementById('slider1');
        slider.scrollLeft = slider.scrollLeft - 260;
    }
    const scrollRight1 = (e) => {
        const slider = document.getElementById('slider1');
        slider.scrollLeft = slider.scrollLeft + 260;
    }
    const scrollLeft2 = (e) => {
        const slider = document.getElementById('slider2');
        slider.scrollLeft = slider.scrollLeft - 260;
    }
    const scrollRight2 = (e) => {
        const slider = document.getElementById('slider2');
        slider.scrollLeft = slider.scrollLeft + 260;
    }

    const getTrendingCoin = async () => {
        const url = 'https://api.coingecko.com/api/v3/search/trending';
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        setTrendingCoins(result.coins);
    }
    console.log(trendingCoins)

    useEffect(() => {
        getTrendingCoin()
    }, [])

    return (
        <>
            <Container maxWidth="xl" disableGutters>
                {
                    trendingCoins ?
                        <div className=''>
                            {/* first row */}
                            <div className='lg:p-7 py-3'>
                                <label className='text-[18px] font-[700] lg:text-[24px]'>You May Also Like</label>
                                <div className='relative my-3'>
                                    <section id='slider1' className='flex overflow-hidden gap-4 transition-all scroll-smooth'>
                                        <div className='borderborder-opacity-10  flex rounded-full bg-white shadow-sm absolute top-[40%] -left-5 lg:top-[60px] lg:-left-5'>
                                            <IconButton onClick={(e) => scrollLeft1(e)} className=' flex  p-1'>
                                                <ArrowForwardIosIcon className='mx-auto rotate-180 w-5 h-5 lg:w-7 lg:h-7' />
                                            </IconButton>
                                        </div>
                                        {

                                            trendingCoins.map((data) => (
                                                <div key={data.item.coin_id} className='flex-shrink-0 w-[55%] h-[110px] md:w-[252px] md:h-[160px] lg:w-[252px] lg:h-[160px] rounded-[10px] border-2 p-3'>
                                                    <div className='flex'>
                                                        <Image width={100} height={100} alt='img' className='my-auto w-5 h-5  lg:w-[26px] lg:h-[26px] rounded-full' src={data.item.small} />
                                                        <div className='flex justify-between w-[100%]'>
                                                            <h1 className=' line-clamp-3 my-auto text-[10.09px] font-[400] lg:text-[16px]'>{data.item.name}</h1>
                                                            <label className='bg-slate-200 rounded-md p-[1px] my-auto font-[400] text-[7px] lg:text-[12px] text-[#32BE88]'>+0.52%</label>
                                                        </div>
                                                    </div>
                                                    <div className='lg:p-2'>
                                                        <label className='font-[500] text-[12.62px] lg:text-[20px] '>${numberFormater(data.item.data.price)}</label>
                                                    </div>
                                                    <div className='py-1'>
                                                        <Image width={100} height={100} alt='' className='h-[40px] w-[100%] md:w-[200px] md:h-[60px] lg:w-[200px] lg:h-[60px]' src={data.item.data.sparkline} />
                                                    </div>
                                                </div >
                                            ))

                                        }
                                        <div className=' border border-opacity-10 flex rounded-full bg-white shadow-sm absolute top-[40%] -right-6 lg:top-[60px] lg:-right-5'>
                                            <IconButton onClick={(e) => scrollRight1(e)} className=' flex h-7 w-7 '>
                                                <ArrowForwardIosIcon className='mx-auto w-5 h-5 lg:w-7 lg:h-7' />
                                            </IconButton>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            {/* second row */}
                            <div className='lg:p-7 py-3'>
                                <label className='text-[18px] lg:text-[24px] font-[700]'>Trending Coins</label>
                                <div className='relative my-3'>
                                    <section id='slider1' className='flex overflow-hidden gap-4 transition-all scroll-smooth'>
                                        <div className='borderborder-opacity-10  flex rounded-full bg-white shadow-sm absolute top-[40%] -left-5 lg:top-[60px] lg:-left-5'>
                                            <IconButton onClick={(e) => scrollLeft1(e)} className=' flex  p-1'>
                                                <ArrowForwardIosIcon className='mx-auto rotate-180 w-5 h-5 lg:w-7 lg:h-7' />
                                            </IconButton>
                                        </div>
                                        {

                                            trendingCoins.map((data) => (
                                                <div key={data.item.coin_id} className='flex-shrink-0 w-[55%] h-[110px] md:w-[252px] md:h-[160px] lg:w-[252px] lg:h-[160px] rounded-[10px] border-2 p-3'>
                                                    <div className='flex'>
                                                        <Image width={100} height={100} alt='img' className='my-auto w-5 h-5  lg:w-[26px] lg:h-[26px] rounded-full' src={data.item.small} />
                                                        <div className='flex justify-between w-[100%]'>
                                                            <h1 className=' line-clamp-3 my-auto text-[10.09px] font-[400] lg:text-[16px]'>{data.item.name}</h1>
                                                            <label className='bg-slate-200 rounded-md p-[1px] my-auto font-[400] text-[7px] lg:text-[12px] text-[#32BE88]'>+0.52%</label>
                                                        </div>
                                                    </div>
                                                    <div className='lg:p-2'>
                                                        <label className='font-[500] text-[12.62px] lg:text-[20px] '>${numberFormater(data.item.data.price)}</label>
                                                    </div>
                                                    <div className='py-1'>
                                                        <Image width={100} height={100} alt='' className='h-[40px] w-[100%] md:w-[200px] md:h-[60px] lg:w-[200px] lg:h-[60px]' src={data.item.data.sparkline} />
                                                    </div>
                                                </div >
                                            ))

                                        }
                                        <div className=' border border-opacity-10 flex rounded-full bg-white shadow-sm absolute top-[40%] -right-6 lg:top-[60px] lg:-right-5'>
                                            <IconButton onClick={(e) => scrollRight1(e)} className=' flex h-7 w-7 '>
                                                <ArrowForwardIosIcon className='mx-auto w-5 h-5 lg:w-7 lg:h-7' />
                                            </IconButton>
                                        </div>
                                    </section>
                                </div>

                            </div>

                        </div>

                        :
                        <Skeleton variant="rectangular" style={{ height: '200px' }} />
                }
            </Container >
        </>
    )
}