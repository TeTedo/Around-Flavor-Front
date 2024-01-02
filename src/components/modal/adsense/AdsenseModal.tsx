import React, { useEffect } from "react";
import { AdContent, AdsenseModalWrapper } from "./AdsenseModal.style";
import { useRecoilValue } from "recoil";
import { adModalState } from "recoil/modalState";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const AdsenseModal = () => {
  const adsenseModal = useRecoilValue(adModalState);

  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle;
        // console.log({ adsbygoogle })
        adsbygoogle.push({});
      } catch (e) {
        console.error(e);
      }
    };

    let interval = setInterval(() => {
      // Check if Adsense script is loaded every 300ms
      if (window.adsbygoogle) {
        pushAd();
        // clear the interval once the ad is pushed so that function isn't called indefinitely
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      {adsenseModal && (
        <AdsenseModalWrapper>
          <AdContent>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-4655641732619143"
              data-ad-slot="6084325917"
              data-ad-format="auto"
              data-full-width-responsive="true"
              data-adtest="on"
            ></ins>
          </AdContent>
        </AdsenseModalWrapper>
      )}
    </>
  );
};
