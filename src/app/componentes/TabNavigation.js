'use client'
import { List, Skeleton, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { ArrowForward, Label, PlayArrow } from '@mui/icons-material';
import numberFormater from "@/utils/numberFormater";
import dateFormater from "@/utils/dateFormater";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Image from "next/image";

export default function TabNavigation({ total_volume, current, low, high, high52W, low52W, high7D, low7D, tredingVolume, market_cap_rank, market_cap, ath, atl, ath_change_percentage, atl_change_percentage, ath_date, atl_date }) {
    const [value, setValue] = useState(0);
    const [totalMarketCap, setTotalMarketCap] = useState()
    const position = Math.max(0, Math.min(100, ((current - low) / (high - low)) * 100))
    const marketCapDominace = (market_cap / totalMarketCap) * 100
    const volume_market_cap = total_volume / market_cap;


    const overviewRef = useRef(null);
    const fundamentalRef = useRef(null);
    const sentimentsRef = useRef(null);
    const teamRef = useRef(null);
    const tokenomicsRef = useRef(null);
    const newsInsightsRef = useRef(null);
    const technicalsRf = useRef(null);

    const tabs = [
        { index: 0, label: 'Overview', ref: overviewRef },
        { index: 1, label: 'Fundamental', ref: fundamentalRef },
        { index: 2, label: 'News Insights', ref: newsInsightsRef },
        { index: 3, label: 'Sentiments', ref: sentimentsRef },
        { index: 4, label: 'Team', ref: teamRef },
        { index: 5, label: 'Technicals', ref: technicalsRf },
        { index: 6, label: 'Tokenomics', ref: tokenomicsRef },
    ];


    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    const settings = {
        width: 179,
        height: 179,
        value: 80,

    };


    const fundametals = [
        {
            body1: [
                { index: 0, lable: ' Bitcoin Price', Value: `$${numberFormater(current)}` },
                { index: 1, lable: ' 24h Low / 24h High', Value: `$${numberFormater(low)} /$${numberFormater(high)}` },
                { index: 2, lable: ' 7d Low / 7d High', Value: `$${numberFormater(low7D)} / $${numberFormater(high7D)}` },
                { index: 3, lable: ' Trading Volume', Value: `$${numberFormater(tredingVolume)}` },
                { index: 4, lable: ' Market Cap Rank', Value: `#${numberFormater(market_cap_rank)}` }
            ]
        },
        {
            body2: [
                { index: 1, lable: 'Market Cap', Value: `$${numberFormater(market_cap)}` },
                { index: 2, lable: ' Market Cap Dominance', Value: `${numberFormater(marketCapDominace)}%` },
                { index: 3, lable: 'Volume / Market Cap', Value: `${numberFormater(volume_market_cap)}` },
                {
                    index: 4,
                    lable: 'All-Time High',
                    Value: `$${numberFormater(ath)}`,
                    Date: `${dateFormater(ath_date)}(about 1Y)`,
                    Percentage: ` ${numberFormater(ath_change_percentage)}%`
                },
                {
                    index: 5,
                    lable: 'All-Time Low',
                    Value: `$${numberFormater(atl)}`,
                    Date: `${dateFormater(atl_date)}(over 9Y)`,
                    Percentage: `${numberFormater(atl_change_percentage)}%`
                }
            ],
        }
    ]

    const teams = [
        {
            id: "1",
            name: "John Smith",
            imgae: '/accets/sandeep.svg',
            designation: "Designation here",
            details: "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu",
        },
        {
            id: "2",
            name: "Ellina Williams",
            imgae: '/accets/sandeep2.svg',
            designation: "Designation here",
            details: "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu",
        },
        {
            id: "3",
            name: "John lombata",
            imgae: '/accets/sandeep3.svg',
            designation: "Designation here",
            details: "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu",
        },
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const totalMaketCap = async () => {
        const url = 'https://api.coingecko.com/api/v3/global';
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        const data = result.data.total_market_cap.usd
        setTotalMarketCap(data)
    }


    useEffect(() => {
        totalMaketCap()
    }, [])
    return (
        <>
            <div className="h-auto">
                <div className="h-[48px] w-[100%] ">
                    <Tabs value={value} onChange={handleChange} className="border-b-2 overflow-x-auto" variant="scrollable" scrollButtons="auto">
                        {
                            tabs.map((items) => (
                                <Tab style={{ textTransform: "capitalize" }} onClick={() => scrollToSection(items.ref)} key={items.index} className=" capitalize text-[16px] font-[500] text-black" value={items.index} label={items.label} />
                            ))
                        }
                    </Tabs>
                </div>
                {/* Performance section */}
                <div className="px-3 py-3 lg:p-[20px] xl:p-[24px] mt-7 bg-white rounded-lg  lg:h-[632px] xl:h-[632px] border">
                    <div ref={overviewRef} className="">
                        <div>
                            <h1 className="text-[24px] font-[600]">Performance</h1>
                        </div>
                        <div className="flex justify-between w-auto  my-10">
                            <section className="grid gap-y-4">
                                <label className=" text-[13.48px] font-[400] ">Today&apos;s Low</label>
                                {
                                    low ? <label className=" text-[13.48px] font-[400]">{numberFormater(low)}</label> : <Skeleton variant="text" className=" w-[100px]" />
                                }
                            </section>
                            <section className="my-auto">
                                {/* progress bar */}
                                <div className="">
                                    <div className="relative rounded-full">
                                        <div className="w-[160px] lg:w-[430px] xl:w-[582px] h-[4.63px] rounded-lg bg-gradient-to-r from-[#FF4949,#FF4E11,#FC870A] to-[#FFAF11,#C2CBC1,#11EB68] "></div>
                                        <div className="absolute top-0 mt-1 grid" style={{ left: `${position} % ` }}>
                                            <PlayArrow className="-rotate-90" />
                                            {low ? <lable className='flex mx-auto'>$ {numberFormater(current)}</lable> : <Skeleton variant="text" className=" w-[100px]" />}
                                        </div>
                                    </div>
                                </div>
                            </section >
                            <section className="grid gap-y-4">
                                <label className=" text-[13.48px] font-[400]">Today&apos;s High</label>
                                {high ? <label className="text-end text-[13.48px] font-[400]">{numberFormater(high)}</label> : <Skeleton variant="text" className=" w-[100px]" />}
                            </section>
                        </div >
                        <div className="flex justify-between w-auto  my-12">
                            <section className="grid gap-y-4">
                                <label className=" text-[13.48px] font-[400] ">52W Low</label>
                                {low52W ? <label className=" text-[13.48px] font-[400]">{numberFormater(low52W)}</label> : <Skeleton variant="text" className=" w-[100px]" />}
                            </section>
                            <section className="my-auto">
                                {/* progress bar */}
                                <div className="">
                                    <div className="relative rounded-full">
                                        <div className="w-[160px] lg:w-[430px] xl:w-[582px] h-[4.63px] rounded-lg bg-gradient-to-r from-[#FF4949,#FF4E11,#FC870A] to-[#FFAF11,#C2CBC1,#11EB68] "></div>
                                        <div className="absolute top-0 mt-1 grid" style={{ left: `${position} % ` }}>
                                            <PlayArrow className="-rotate-90" />
                                            {current ? <lable className='flex mx-auto'>$ {numberFormater(current)}</lable> : <Skeleton variant="text" className=" w-[100px]" />}
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="grid gap-y-4">
                                <label className=" text-[13.48px] font-[400]">52W High</label>
                                {high52W ? <label className=" text-end text-[13.48px] font-[400]">{numberFormater(high52W)}</label> : <Skeleton variant="text" className=" w-[100px]" />}
                            </section>
                        </div>
                    </div >
                    {/* Fundamentals */}
                    < div ref={fundamentalRef} className="lg:my-20">
                        <div>
                            <div>
                                <h1 className="text-[18.91px] font-[600] flex text-[#44475B]">Fundamentals
                                    <Image width={100} height={100} alt="img" className="my-auto w-[26px] h-[20px]" src="/accets/SVG_margin.svg" />
                                </h1>
                            </div>
                            <div className=" lg:flex lg:justify-between w-[100%] h-auto pb-10 gap-28 lg:gap-10">
                                <section className="lg:w-[100%]">
                                    <div>
                                        {
                                            fundametals.map((items) => (
                                                items.body1 && items.body1.map((data) => (
                                                    <div key={data.index} className="pt-3 pb-3 flex justify-between py-auto w-[100%]  h-[54px] border-b">
                                                        {marketCapDominace ? <div className="my-auto"> <label className="my-auto font-[500] text-[14px] text-[#768396]">{data.lable}</label></div> : <Skeleton variant="text" className=" w-[100px]" />}
                                                        {marketCapDominace ? <label className="my-auto font-[500] text-[13px] lg:text-[14px] ">{data.Value}</label> : <Skeleton variant="text" className=" w-[100px]" />}
                                                    </div>
                                                ))
                                            ))
                                        }
                                    </div>
                                </section>
                                <section className="lg:w-[100%]">
                                    <div>
                                        {
                                            fundametals.map((items) => (
                                                items.body2 && items.body2.map((data) => (
                                                    data.lable === "All-Time High" || data.lable === "All-Time Low" ? (
                                                        <div key={data.index} className="lg:w-[100%]">
                                                            <div className="pt-3 pb-3 flex justify-between py-auto  h-[54px] border-b">
                                                                {marketCapDominace ? <div className="my-auto"> <label className="my-auto font-[500] text-[14px] text-[#768396]">{data.lable}</label></div> : <Skeleton variant="text" className=" w-[100px]" />}

                                                                {
                                                                    marketCapDominace ?
                                                                        <div className="text-end my-auto">
                                                                            <label className="my-auto font-[500] text-[13px] lg:text-[14px] ">{data.Value}</label>
                                                                            {
                                                                                parseFloat(data.Percentage) < 1 ?
                                                                                    <label className="mx-1 my-auto font-[500]  text-[13px] lg:text-[14px] text-[#F7324C]">{data.Percentage}</label>
                                                                                    :
                                                                                    <label className="mx-1 my-auto font-[500] text-[13px] lg:text-[14px] text-[#768396]">{data.Percentage}</label>

                                                                            }
                                                                            <div>
                                                                                <label className="my-auto font-[400] text-[9px] lg:text-[10px] xl:text-[11.2px] ">{data.Date}</label>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <Skeleton variant="text" className=" w-[100px]" />
                                                                }


                                                            </div>
                                                        </div>
                                                    )
                                                        :
                                                        (
                                                            <div key={data.index} className="">
                                                                <div className="pt-3 pb-3 flex justify-between py-auto w-[100%]  h-[54px] border-b">
                                                                    {marketCapDominace ? <label className="my-auto font-[500] text-[14px] text-[#768396]">{data.lable}</label> : <Skeleton variant="text" className=" w-[100px]" />}
                                                                    {marketCapDominace ? <label className="mx-2 my-auto font-[500] text-[13px] lg:text-[14px] ">{data.Value}</label> : <Skeleton variant="text" className=" w-[100px]" />}
                                                                </div>
                                                            </div>
                                                        )
                                                ))
                                            ))
                                        }
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                {/* setiments */}
                <div ref={sentimentsRef} className="px-3 py-3 bg-white rounded-lg my-7 p-5 ">
                    <div className="">

                        <div className=""><h1 className="text-[24px] font-[600]">Sentiments</h1></div>
                        <div className="my-4 flex">
                            <h1 className="text-[18.91px] font-[600] text-[#44475B]">Key Events</h1>
                            <Image width={100} height={100} alt="img" className="my-auto mx-3 w-[26px] h-[20px]" src="/accets/SVG_margin.svg" />
                        </div>

                        <div className=" overflow-x-auto scrollbar-hide flex  justify-between  gap-[10px]">

                            <div className=" flex-shrink-0 flex w-[319.1px] h-[142.46px] lg:w-[456px]    lg:h-[204px] rounded-xl  bg-[#E8F4FD] p-[18px] gap-3">
                                <Image width={100} height={100} alt="img" src="/accets/Frame 1116601921.svg" className="w-[30px] h-[30px] lg:w-[44px] lg:h-[44px]" />
                                <section className="grid ">
                                    <label className=" text-[12px] lg:text-[14px] font-[500] text-[#191C1F]">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</label>
                                    <p className="text-wrap text-[10px]  overflow-y-auto scroll-smooth scrollbar-hide  font-[400] lg:text-[14px] lg:font-[400] text-[#3E5765]">
                                        Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.
                                    </p>
                                </section>
                            </div>

                            <div className=" flex-shrink-0 flex w-[319.1px] h-[142.46px] lg:w-[456px] lg:h-[204px] rounded-xl  bg-[#E8F4FD] p-[18px] gap-3">
                                <Image width={100} height={100} alt="img" src="/accets/Uptend_mark.svg" className="w-[44px] h-[44px]" />
                                <section className="grid">
                                    <label className="  text-[12px] lg:text-[14px] font-[500] text-[#191C1F]">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</label>
                                    <p className="text-wrap text-[10px]  overflow-y-auto scroll-smooth scrollbar-hide font-[400] lg:text-[14px] lg:font-[400] text-[#3E5765]">
                                        Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.
                                    </p>
                                </section>
                            </div>

                        </div >
                        {/* Analytics estimates */}
                        <div className=" justify-between w-[100%] my-12 ">
                            <div className="flex">
                                <h1 className="text-[18.91px] font-[600] text-[#44475B]">Analytics estimates</h1>
                                <Image width={100} height={100} alt="img" className="my-auto mx-3 w-[26px] h-[20px]" src="/accets/SVG_margin.svg" />
                            </div>
                            <div className="flex justify-evenly w-[100%]  lg:w-[830px] lg:gap-[14px] my-7">
                                <div className="bg-[#EBF9F4] w-[50%] lg:w-[116.86px] md:h-[120px] xl:h-[123px] rounded-full flex p-4">
                                    <div className="mx-auto flex">
                                        <h1 className="my-auto text-[36.41px] font-[500] text-[#08af83]">76</h1>
                                        <span className="my-auto text-[16px] font-[500] text-[#08af83] ">%</span>
                                    </div>
                                </div>
                                <div className="my-auto w-[80%] lg:mx-10">
                                    <section className="flex gap-5  p-3">
                                        <label className="my-auto text-[15px] font-[500] text-[#7C7E8C]">Buy</label>
                                        <h1 className="my-auto w-[100%] lg:w-[250px] h-2 rounded-sm bg-[#00B386]"></h1>
                                        <label className="my-auto text-[15px] font-[500] text-[#7C7E8C]">76%</label>
                                    </section>
                                    <section className="flex gap-5 p-3">
                                        <label className="my-auto text-[15px] font-[500] text-[#7C7E8C]">Hold</label>
                                        <h1 className="my-auto w-[8%] h-2 rounded-sm bg-[#C7C8CE]"></h1>
                                        <label className="my-auto text-[15px] font-[500] text-[#7C7E8C]">8%</label>
                                    </section>
                                    <section className="flex gap-5 p-3">
                                        <label className="my-auto text-[15px] font-[500] text-[#7C7E8C]">Buy</label>
                                        <h1 className="my-auto w-[16%] h-2 rounded-sm bg-[#F7324E]"></h1>
                                        <label className="my-auto text-[15px] font-[500] text-[#7C7E8C]">16%</label>
                                    </section>
                                </div>
                            </div >
                        </div>
                    </div >
                </div>

                {/* About Bitcoin */}
                <div ref={newsInsightsRef} className="px-3 py-3 bg-white rounded-lg my-7 p-5">
                    <div>
                        <div>
                            <section>
                                <h1 className="text-[24px] font-[600]">About Bitcon</h1>
                            </section>
                            <section className="my-5 lg:w-[100%]">
                                <label className="text-[18px] font-[700]">What is Bitcoin</label>
                                <p className="text-[16px] font-[400] lg:font-[500] text-[#0F1629] my-2 tracking-normal leading-7">
                                    Bitcoin&apos;s price today is US$16,951.82, with a 24-hour trading volume of $19.14 B. BTC is +0.36% in the last 24 hours. It is currently -7.70% from its 7-day all-time high of $18,366.66, and 3.40% from its 7-day all-time low of $16,394.75. BTC has a circulating supply of 19.24 M BTC and a max supply of 21 M BTC
                                </p>
                            </section>
                            <hr />
                            <section className="my-5 lg:w-[100%]">
                                <label className="text-[18px] font-[700]">Lorem ipsum dolor sit amet</label>
                                <p className="text-[16px] font-[400]  lg:font-[500] text-[#0F1629] my-4 tracking-normal leading-7">
                                    Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus.
                                </p>
                                <p className="text-[16px] font-[400]  lg:font-[500] text-[#0F1629] my-4 tracking-normal leading-7">
                                    Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque auctor amet. Nunc sagittis libero adipiscing cursus felis pellentesque interdum. Odio cursus phasellus velit in senectus enim dui. Turpis tristique placerat interdum sed volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris faucibus diam mi nunc praesent massa turpis a. Integer dignissim augue viverra nulla et quis lobortis phasellus. Integer pellentesque enim convallis ultricies at.
                                </p>
                                <p className="text-[16px] font-[400]  lg:font-[500] text-[#0F1629] my-4 tracking-normal leading-7">
                                    Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui
                                </p>
                            </section>
                            <hr />
                            <section className="my-5">
                                <label className="text-[18px] font-[700]">Already Holding Bitcoin?</label>
                                <div className="grid gap-5 lg:flex   xl:gap-28 my-4">
                                    {/* card 1 */}
                                    <div className="w-[100%] py-3 lg:w-[388px] lg:h-[151px] rounded-[6.65px] bg-gradient-to-r from-[#79F1A4] to-[#0E5CAD] flex gap-3 lg:gap-5 md:gap-5 xl:gap-5">
                                        <Image alt="img" width={100} height={100} src="/accets/Rectangle 11947.svg" className="w-[119.43px] h-[119.43px] lg:w-[128px] lg:h-[128px] my-auto mx-4" />
                                        <div className="my-auto lg:w-[195px] lg:h-[104px]">
                                            <h1 className="text-[18.66px] lg:text-[18px] xl:text-[20px] font-[700] text-white">Calculate your Profits</h1>
                                            <button className=" flex text-[13.6px] lg:text-[14px] font-[600] bg-blue-50 p-2 rounded-lg my-4">
                                                <label className="text-[13.6px] font-[600]">Check Now </label>
                                                <ArrowForward />
                                            </button>
                                        </div>
                                    </div>
                                    {/* card 2 */}
                                    <div className="w-[100%] py-3 lg:w-[388px] lg:h-[151px] rounded-[6.65px] bg-gradient-to-r from-[#FF9865] to-[#EF3031] flex gap-3 lg:gap-5 md:gap-5 xl:gap-5">
                                        <Image width={100} alt="img" height={100} src="/accets/Rectangle 11948.svg" className="w-[119.43px] h-[119.43px] lg:w-[128px] lg:h-[128px] my-auto mx-4" />
                                        <div className="my-auto w-[195px] h-[104px]">
                                            <h1 className="text-[18.66px] lg:text-[18px] xl:text-[20px] font-[700] text-white">Calculate your tax liability</h1>
                                            <button className="flex text-[14px] font-[600] bg-blue-50 p-2 rounded-lg my-4 ">
                                                <label>Check Now </label>
                                                <ArrowForward />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-5" />
                                <div className="w-[100%]">
                                    <p className="text-[16] font-[400]  lg:font-[500] text-[#0F1629] my-4 tracking-normal leading-7">Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui</p>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>

                {/* Tokenomics */}

                <div ref={tokenomicsRef} className="px-3 py-3 bg-white rounded-lg my-7 p-5 h-auto">
                    <div className="mt-5">
                        <section className="">
                            <h1 className="text-[24px] font-[600]">Tokenomics</h1>
                            <h1 className="text-[18px] lg:text-[20px] font-[600] my-6">Initial Distribution</h1>
                        </section>
                        <section className="flex lg:gap-16 md:gap-16">
                            <div className="my-auto">
                                <Gauge
                                    {...settings}
                                    cornerRadius="50%"
                                    innerRadius="70%"
                                    sx={(theme) => ({
                                        [`& .${gaugeClasses.valueText}`]: {
                                            display: 'none'
                                        },
                                        [`& .${gaugeClasses.valueArc}`]: {
                                            fill: '#0082ff',
                                            borderRadius: '0px'
                                        },
                                        [`& .${gaugeClasses.referenceArc}`]: {
                                            fill: theme.palette.text.disabled,
                                        },
                                    })}
                                />
                            </div>
                            <div className="my-auto">
                                <div className="flex my-auto gap-3">
                                    <div className="my-auto rounded-full h-3 w-3 lg:h-[15px] lg:w-[15px] bg-[#0082ff]"></div>
                                    <lable className=' my-auto lg:text-[16px] font-[400]'>Crowdsale investors: 80%</lable>
                                </div>
                                <div className="flex my-auto mt-4   gap-3">
                                    <div className="my-auto rounded-full h-3 w-3 lg:h-[15px] lg:w-[15px] bg-slate-500"></div>
                                    <lable className=' my-auto lg:text-[16px] font-[400]'>Foundation: 20%</lable>
                                </div>
                            </div>
                        </section>
                        <hr />
                        <section className="lg:w-[100%]">
                            <p className="text-[16px] font-[400]  lg:font-[500] text-[#0F1629] my-4 tracking-normal leading-7">Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.</p>
                        </section>
                    </div>
                </div>

                {/* Teams */}
                <div ref={teamRef} className="px-3 py-3 bg-white rounded-lg my-7 p-5">
                    <div>
                        <section className="lg:w-[100%]">
                            <label className="text-[24px] font-[600]">Team</label>
                            <p className="text-[16] font-[400]  lg:font-[500] text-[#0F1629] my-4 tracking-normal leading-7" >Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu nibh. Eget mattis in mi integer sit egestas. Proin tempor id pretium quam. Facilisis purus convallis quam augue.</p>
                        </section>
                        {
                            teams.map((data) => (
                                <section key={data.id} className="lg:w-[100%] my-7 lg:flex bg-[#E8F4FD] rounded-lg p-3">
                                    <div className="grid lg:w-[128.61px]">
                                        <Image width={100} height={100} alt="img" src={data.imgae} className="mx-auto" />
                                        <label className="text-center text-[15px] font-[600]">{data.name}</label>
                                        <small className="text-center text-[12px] font-[400]">{data.designation}</small>
                                    </div>
                                    <div className="font-[400] text-[14px] lg:w-[100%] my-auto">
                                        <p className="text-[14px] font-[400] lg:text-[14px] lg:font-[400] text-[#0F1629] my-4 tracking-normal leading-7">{data.details}</p>
                                    </div>
                                </section>
                            ))

                        }
                    </div>
                </div>


            </div >
        </>
    )
}
