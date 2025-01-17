'use client'
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TrendingCoins(params) {
    const [trendingCoins, setTrendingCoins] = useState([])


    const url = 'https://api.coingecko.com/api/v3/search/trending';
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-HN492BkfvBUKA4NgoxKJ57Te' }
    };

    const getTrendingCoin = async () => {
        const response = await fetch(url, options);
        const result = await response.json();
        setTrendingCoins(result.coins);
    }

    const numberFormater = (value) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, style: "decimal" }).format(value)
    }

    console.log(trendingCoins)
    useEffect(() => {
        getTrendingCoin()
    }, [])

    return (
        <>
            <div className=" lg:w-[100%]  xl:w-[426px] bg-white rounded-lg mx-auto my-7 p-9">
                <section className="">
                    <h1 className=" text-[24px] font-[600] ">Trending Coins (24h)</h1>
                </section>
                <section className="my-10">
                    {
                        trendingCoins.slice(0, 3).map((coins) => (
                            <div key={coins.item.coin_id} className="flex justify-between my-5">
                                <div className="flex gap-3">
                                    {trendingCoins ? <Image alt="img" width={100} height={100} src={coins.item.small} className="my-auto w-7 h-7 rounded-full" /> : <Skeleton variant="circular" className="w-7 h-7" />}
                                    {trendingCoins ? <label className=" text-[16px] font-[500] lg:text-[14px]">{coins.item.name}({coins.item.symbol})</label> : <Skeleton variant="text" className="w-100px h-3" />}
                                </div>
                                {
                                    trendingCoins ?
                                        <div className="bg-[#EBF9F4] flex gap-3 rounded-lg w-[84px] h-[28px] px-3">
                                            <Image width={100} height={100} alt="img" src="/accets/Polygon2.svg" className="w-[11px] h-2 my-auto" />
                                            <label className="font-[500] text-[16px] my-auto lg:text-[14px] ">{numberFormater(coins.item.data.price_change_percentage_24h.usd)}</label>
                                        </div>
                                        :
                                        <Skeleton variant="text" className="w-100px " />
                                }
                            </div>
                        ))
                    }

                </section>
            </div>
        </>
    )
}