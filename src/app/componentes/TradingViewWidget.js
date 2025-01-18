"use client"
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
    const container = useRef();

    useEffect(() => {
        const containerNode = container.current;

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BITSTAMP:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "3",
          "locale": "en",
          "backgroundColor": "rgba(255, 255, 255, 1)",
          "gridColor": "rgba(0, 0, 0, 0.06)",
          "hide_top_toolbar": true,
          "hide_legend": true,
          "withdateranges": true,
          "allow_symbol_change": true,
          "save_image": false,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
        }`;

        containerNode.appendChild(script);

        return () => {
            if (containerNode) {
                containerNode.innerHTML = "";
            }
        };
    }, []);

    return (
<<<<<<< HEAD
        <div className="h-[100%] w-[100%] relative" ref={container} >
            <div className="absolute"></div>
=======
        <div className="tradingview-widget-container relative" ref={container} style={{ height: "100%", width: "100%", border: "0px" }}>
            <div className="tradingview-widget-container__widge absolute" style={{ height: "100%", width: "100%" }} ></div>
>>>>>>> 8f1258debfa5b74e6ebdaa46af325bf3f3f46037
        </div>
    );
}

export default memo(TradingViewWidget);
