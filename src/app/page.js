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


export default function Home() {
  const [cryptoCoin, setCryptoCoin] = useState([]);
  const [INR, setInr] = useState();
  const [marketData, setMarketData] = useState([])
  const [high52W, setHigh52W] = useState();
  const [low52W, setLow52W] = useState();
  const [high7D, setHigh7D] = useState();
  const [low7D, setLow7D] = useState();


  const getCoinDetails = async () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=full&include_24hr_high=true&include_24hr_low=true';
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY }
    };;

    const response = await fetch(url, options);
    const result = await response.json()
    setCryptoCoin(result);
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

  const usdToINR = async () => {
    const response = await fetch(` https://v6.exchangerate-api.com/v6/451329bef870f9d2f3296f30/latest/USD`, {
      method: 'GET',
    })
    const usdRate = await response.json();
    const INR = usdRate.conversion_rates.INR;
    setInr(INR);

  }

  useEffect(() => {
    getCoinDetails();
    getMarketData();
    getMarketDataYear();
    usdToINR()
  }, [])


  return (
    <>
      <Container maxWidth="2xl" className="border-b bg-white shadow">
        <Header />
      </Container>

      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs separator=">>" className="flex lg:text-lg lg:px-2  mt-3">
          <Link href={"/"} className="font-[400] font text-14px active:text-slate-400 leading-[16.94px]" >Cryptocurrencies</Link>
          <Link href={"/"} className="font-[400] text-14px text-slate-700 leading-[16.94px]" >Bitcoin</Link>
        </Breadcrumbs>
        <div className=" grid grid-cols-12 -mt-5 lg:gap-6 ">

          {/* left side section  */}
          <section className=" col-span-full lg:col-span-8 xl:col-span-8  grid grid-cols-12">

            <div className="bg-white rounded-xl lg:my-10 lg:gap-16 col-span-12 p-4 ">

              <div className="flex gap-20 lg:my-2">
                <div className="flex gap-3">
                  <Image width={100} height={100} alt="img" src="/accets/bitcoin-svg.svg" className="my-auto w-[32px] h-[32px]" />
                  <h1 className="my-auto font-[600] text-[21px] text-4xl">Bitcoin</h1>
                  <h1 className="my-auto font-[600]  text-[14px] text-slate-600">BTC</h1>
                </div>
                <div className="my-auto">
                  <button className="lg:h-[40px] h-[32px] w-[80px] bg-[#768396] rounded-lg text-white text-xl">Rank#1</button>
                </div>
              </div>

              <div className="">
                <div className=" flex my-auto gap-12 lg:mt-10">
                  {
                    cryptoCoin ? <h1 className="text-[28px] font-[600]">${numberFormater(cryptoCoin?.bitcoin?.usd)}</h1>
                      :
                      <Skeleton
                        variant="text"
                        className="text-[28px] w-[200px]"
                        animation="wave"
                      />

                  }
                  <div className="flex " >
                    {
                      cryptoCoin ?
                        <label className="my-auto bg-[#EBF9F4] flex w-[84px] h-[28px]">
                          <Image width={100} height={100} alt="img" className=" w-[11px] h-[8px] my-auto mx-auto " src="/accets/Polygon2.svg" />
                          <label className="text-[#14B079] my-auto mx-auto text-[16px]  text font-[500] ">{numberFormater(cryptoCoin?.bitcoin?.usd_24h_change)}%</label>
                        </label>
                        :
                        <Skeleton
                          variant="text"
                          className="text-[28px] w-[100px]"
                          animation="wave"
                        />
                    }
                    {
                      cryptoCoin ? <label className="text-[#768396] text-[14px] my-auto font-[500] mx-8 ">(24H)</label> : <Skeleton
                        variant="text"
                        className="text-[28px] w-[50px]"
                        animation="wave"
                      />
                    }
                  </div>
                </div>
                {
                  cryptoCoin ?
                    <div className="gap-5 ">
                      <h1 className=" text-[16px] font-[500]">₹{numberFormater(cryptoCoin?.bitcoin?.usd * INR)}</h1>
                    </div>
                    :
                    <Skeleton
                      variant="text"
                      className="text-[28px] w-[100px]"
                      animation="wave"
                    />
                }
                <hr className="my-7" />

                <div className="my-10 h-[350px] lg:h-[400px]">
                  <label className="text-[14px] lg:text-[16px] font-[600]">Bitcoin Price Chart (USD)</label>
                  <TradingViewWidget />
                </div>

              </div>

            </div>

            <div className="col-span-full ">
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
            <div className="lg:my-10 grid grid-cols-1 lg:flex lg:flex-col mx-auto w-[100%] h-auto lg:w-[100%]  xl:w-[426px] xl:h-[515px] bg-[#0052FE] rounded-2xl py-14">
              {/* Image Div */}
              <div className=" mx-auto  order-1 lg:col-span-5 lg:my-5 xl:my-10">
                <Image alt="img" src="/accets/mobile_Vector.svg" width={100} height={100} quality={100} className="w-[149px] h-[139px] lg:w-[150px] lg:h-[160px] xl:w-[170px] xl:h-[166px] mx-auto" />
              </div>

              {/* Text Div */}
              <div className=" mx-auto col-span-1 px-16 lg:px-2">
                <h1 className="lg:w-[100%] xl:w-[327px] text-center font-[700] text-[22px] lg:text-[20px] xl:text-[24px] text-wrap text-white">
                  Get Started with KoinX for FREE
                </h1>
                <p className="tracking-wider leading-6 text-center font-[500] text-[14px] lg:text-[12px] text-white my-7 lg:my-3">
                  With our range of features that you can equip for free,
                  KoinX allows you to be more educated and aware of your tax reports.
                </p>
              </div>

              {/* Button Div */}
              <div className=" mx-auto lg:col-start-1 order-3 md:mt-7 lg:-mt-10">
                <button className="lg:my-7 md:my-7 text-center w-[237px] h-[48px] bg-white rounded-lg text-[16px] font-[600] flex mx-auto">
                  <label className="mx-auto flex my-auto">
                    Get Started for FREE
                    <Image width={100} height={100} alt="img" src="/accets/Arrow-Right.svg" className="my-auto" />
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
      </Container >
      <Container maxWidth="2xl" className="bg-white lg:mt-10">
        <Footer />
      </Container>
    </>
  );
}
