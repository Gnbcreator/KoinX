'use client'
import Image from "next/image";
import Container from "@mui/material/Container";
import Header from "./componentes/Header";
import { Breadcrumbs, TabPanel, AppBar, Tabs, Box, Tab, Skeleton } from "@mui/material";
import Link from "next/link";
import TradingViewWidget from "./componentes/TradingViewWidget";
import React, { useEffect, useState } from "react";
import TabNavigation from "./componentes/TabNavigation";
import TrendingCoins from "./componentes/Trendingcoins";
import numberFormater from "@/utils/numberFormater";
import Footer from "./componentes/Footer";
import { ArrowForward } from "@mui/icons-material";


export default function Home() {
  const [cryptoCoin, setCryptoCoin] = useState([]);
  const [marketData, setMarketData] = useState([])
  const [inrPrice, setInr] = useState()
  const [high52W, setHigh52W] = useState();
  const [low52W, setLow52W] = useState();
  const [high7D, setHigh7D] = useState();
  const [low7D, setLow7D] = useState();


  const getCoinDetails = async () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&vs_currencies=inr&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=full&include_24hr_high=true&include_24hr_low=true';
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY }
    };

    const response = await fetch(url, options);
    const result = await response.json()
    setCryptoCoin(result);
  }

  const getIndianPrice = async () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=full'
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY }
    };
    const response = await fetch(url, options);
    const result = await response.json()
    setInr(result);

  }



  const getMarketData = async () => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1d';
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY }
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.filter((items) => {
      if (items.id === "bitcoin") {
        return items
      }
    })

    setMarketData(data)
  }


  const getMarketDataYear = async () => {
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365';
    const url2 = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7';
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY }
    };

    const response = await fetch(url, options);
    const response2 = await fetch(url2, options);

    const result = await response.json();
    const result2 = await response2.json();

    const data = result.prices.map((items) => { return items[1] })
    const data2 = result2.prices.map((items) => { return items[1] })

    setHigh52W(Math.max(...data))
    setLow52W(Math.min(...data))

    setHigh7D(Math.max(...data2))
    setLow7D(Math.max(...data2))


  }

  useEffect(() => {
    getCoinDetails();
    getMarketData();
    getMarketDataYear();
    getIndianPrice()

  }, []);



  return (
    <>
      <Container maxWidth="2xl" disableGutters className="border-b bg-white shadow">
        <Header />
      </Container>

      <Container maxWidth="xl" disableGutters className="px-2">
        {/* Breadcrumbs */}
        <div className="my-4 flex lg:text-lg lg:px-2">
          <Breadcrumbs separator=">>">
            <Link href={"/"} className="font-[400] font text-14px active:text-slate-400 leading-[16.94px]" >Cryptocurrencies</Link>
            <Link href={"/"} className="font-[400] text-14px text-slate-700 leading-[16.94px]" >Bitcoin</Link>
          </Breadcrumbs>
        </div>
        <div className="my-4  grid grid-cols-12  lg:gap-6 ">
          {/* left side section  */}
          <section className=" col-span-full lg:col-span-8 xl:col-span-8  grid grid-cols-12">
            <div className="bg-white rounded-lg lg:my-5 lg:gap-16 col-span-12 p-4 border">

              <div className="my-4 flex justify-between md:justify-normal lg:justify-normal xl:justify-normal gap-10 md:gap-20 lg:gap-20 xl:gap-20 lg:my-2">
                <div className="flex gap-3">
                  <Image width={100} height={100} alt="img" src="/accets/bitcoin-svg.svg" className="my-auto w-[32px] h-[32px]" />
                  <h1 className="my-auto font-[600] text-[21px] text-4xl">Bitcoin</h1>
                  <h1 className="my-auto font-[600]  text-[14px] text-slate-600">BTC</h1>
                </div>
                <div className="my-auto">
                  <button className=" lg:h-[40px] h-[32px] w-[80px] bg-[#768396] rounded-lg text-white text-xl">Rank#1</button>
                </div>
              </div>

              <div className="">
                <div className=" flex justify-between md:justify-normal lg:justify-normal xl:justify-normal my-auto gap-7 lg:mt-10">
                  {
                    cryptoCoin ? <h1 className="text-[24px] md:text-[28px] lg:text-[28px] xl:text-[28px] font-[600]">${numberFormater(cryptoCoin?.bitcoin?.usd)}</h1>
                      :
                      <Skeleton
                        variant="text"
                        className="text-[28px] w-[200px]"
                        animation="wave"
                      />

                  }
                  <div className="flex" >
                    {
                      cryptoCoin ?
                        <label className="rounded-[4px] my-auto bg-[#EBF9F4] flex w-[70px] h-[24px] md:w-[84px] md:h-[28px lg:w-[84px] lg:h-[28px] xl:w-[84px] xl:h-[28px] px-2">
                          <Image width={100} height={100} alt="img" className=" w-[10px] h-[7px]   xl:w-[11px] xl:h-[8px] my-auto lg:mx-auto xl:mx-auto" src="/accets/Polygon2.svg" />
                          <label className="text-[#14B079] my-auto mx-2 text-[14px] lg:text-[16px] xl:lg:text-[16px]  font-[500] ">{numberFormater(cryptoCoin?.bitcoin?.usd_24h_change)}%</label>
                        </label>
                        :
                        <Skeleton
                          variant="text"
                          className="text-[28px] w-[100px]"
                          animation="wave"
                        />
                    }
                    {
                      cryptoCoin ? <label className="text-[#768396] text-[12px] md:text-[14px] lg:text-[14px] xl:text-[14px] my-auto font-[500] mx-2 ">(24H)</label> : <Skeleton
                        variant="text"
                        className="text-[28px] w-[50px]"
                        animation="wave"
                      />
                    }
                  </div>
                </div>
                {
                  cryptoCoin.bitcoin ?
                    <div className="gap-5 ">
                      <h1 className=" text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-[500]">₹{numberFormater(inrPrice?.bitcoin?.inr)}</h1>
                    </div>
                    :
                    <Skeleton
                      variant="text"
                      className="text-[28px] w-[100px]"
                      animation="wave"
                    />
                }
                <hr className="my-7" />
                <div className=""><label className=" text-[14px] lg:text-[16px] font-[600]">Bitcoin Price Chart (USD)</label></div>
                <div className="my-5 h-[350px] md:h-[400px] lg:h-[400px] xl:h-[450px] ">
                  <TradingViewWidget />
                </div>

              </div>

            </div>

            <div className="col-span-full my-4">
              <TabNavigation
                current={cryptoCoin?.bitcoin?.usd}
                low={marketData[0]?.low_24h}
                high={marketData[0]?.high_24h}
                low52W={low52W}
                high52W={high52W}
                low7D={low7D}
                high7D={high7D}
                tredingVolume={marketData[0]?.total_volume}
                market_cap_rank={marketData[0]?.market_cap_rank}
                market_cap={marketData[0]?.market_cap}
                marketCapDominace={marketData[0]?.market_cap_change_percentage_24h}
                ath={marketData[0]?.ath}
                atl={marketData[0]?.atl}
                ath_change_percentage={marketData[0]?.ath_change_percentage}
                atl_change_percentage={marketData[0]?.atl_change_percentage}
                ath_date={marketData[0]?.ath_date}
                atl_date={marketData[0]?.atl_date}
                total_volume={marketData[0]?.total_volume}
              />
            </div>
          </section>

          {/*Right  section  */}
          <section className=" col-span-full  lg:col-span-4 ">
            <div className="lg:my-5 grid flex-col grid-cols-1 lg:flex lg:flex-col mx-auto w-[100%] h-auto lg:w-[100%]  xl:w-[426px] xl:h-[515px] bg-[#0052FE] rounded-2xl py-14">
              {/* Image Div */}
              <div className=" mx-auto  order-1 lg:col-span-5 lg:my-5 xl:my-10">
                <Image alt="img" src="/accets/mobile_Vector.svg" width={100} height={100} quality={100} className="w-[149px] h-[139px] lg:w-[150px] lg:h-[160px] xl:w-[170px] xl:h-[166px] mx-auto" />
              </div>

              {/* Text Div */}
              <div className=" lg:w-[100%]  xl:w-[80%] mx-auto col-span-1 px-16 lg:px-2">
                <h1 className="mx-auto lg:w-[100%] xl:w-[270px] text-center font-[700] text-[22px] lg:text-[20px] xl:text-[24px] text-wrap text-white">
                  Get Started with KoinX for FREE
                </h1>
                <p className="mx-auto  tracking-wider leading-7 text-center font-[500] text-[14px] lg:text-[12px] text-white my-7 lg:my-3">
                  With our range of features that you can equip for free,
                  KoinX allows you to be more educated and aware of your tax reports.
                </p>
              </div>

              {/* Button Div */}
              <div className=" mx-auto lg:col-start-1 order-3 md:mt-7 lg:-mt-10">
                <button className="lg:my-7 md:my-7 text-center w-[237px] h-[48px] bg-white rounded-lg text-[16px] font-[600] flex mx-auto">
                  <label className="mx-auto flex my-auto">
                    Get Started for FREE
                    <ArrowForward className="my-auto w-8 h-8" />
                  </label>
                </button>
              </div>
            </div>



            {/* trending coins */}
            <div >
              <TrendingCoins />
            </div>
          </section>
        </div >
        <Container maxWidth="xl" className="bg-white my-7 rounded-lg px-3" disableGutters>
          <Footer />
        </Container>
      </Container >

    </>
  );
}
