"use client"
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
    const container = useRef();

    useEffect(() => {

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
        container.current.appendChild(script);
        return () => {
            if (container.current) {
                container.current.innerHTML = ""
            }
        }

    }, []);

    return (
        <div className="tradingview-widget-container " ref={container} style={{ height: "100%", width: "100%", border: "0px" }}>
            <div className="tradingview-widget-container__widge" style={{ height: "100%", width: "100%" }} ></div>
        </div>
    );
}

export default memo(TradingViewWidget);
