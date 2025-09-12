import React, { useEffect } from "react";
import { baseUrl } from "@/config";
import { truncate } from "fs";
import { text } from "stream/consumers";

const OfferComp = () => {
  const [isOfferVisible, setOfferVisible] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [offerData, setOfferData] = React.useState({
    no_offers: false,
    image_url: null,
    text: "",
  });

  async function fetchOffers() {
    try {
      let res = await fetch(
        `${baseUrl}/get_offer/${window.location.pathname.split("/")[2]}`
      );
      const data = await res.json();

      setOfferData(data);
      if (data?.no_offers == false) {
        setOfferVisible(true);
      } else {
        setOfferVisible(false);
      }
    } catch (error) {
      // Optionally handle error here
      setOfferVisible(false);
    }
  }

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <>
      {isOfferVisible && (
        <>
          <h3
            className="text-3xl font-extrabold text-white offer-glow cursor-pointer"
            onClick={() => {
              setShowModal(true);
            }}
            style={{
              textShadow: "0 0 12px #3b82f6, 0 0 24px #3b82f6",
              letterSpacing: "2px",
              fontFamily: "'Segoe UI', 'Arial Black', sans-serif",
              textTransform: "uppercase",
            }}
          >
            ♠ OFFER ♣
          </h3>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
              <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full border-2 border-indigo-400 relative">
                <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">
                  ✨ Special Offer ✨
                </h2>

                {offerData.image_url && (
                  <img
                    src={`${baseUrl}${offerData.image_url}`}
                    alt="Offer"
                    className="w-full h-auto rounded-xl mb-4 shadow-md hover:scale-105 transition-transform duration-300"
                  />
                )}

                <p className="text-gray-800 mb-4 text-center text-lg font-bold">
                  {offerData.no_offers
                    ? "😕 No cool deals right now."
                    : offerData.text || "🔥 Don’t miss our limited-time offer!"}
                </p>

                <div className="flex justify-center">
                  <button
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-indigo-500 transition-all duration-300"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>

                <div className="absolute -top-3 -right-3 bg-yellow-300 text-black px-2 py-1 rounded-full text-xs font-bold shadow-md">
                  NEW
                </div>
              </div>
            </div>
          )}

          <style>
            {`
              .offer-glow {
                animation: glow-dim 2s infinite alternate;
              }
              @keyframes glow-dim {
                from {
                  text-shadow: 0 0 16px #3b82f6, 0 0 32px #3b82f6, 0 0 48px #3b82f6;
                  opacity: 1;
                }
                to {
                  text-shadow: 0 0 4px #3b82f6, 0 0 8px #3b82f6;
                  opacity: 0.8;
                }
              }
            `}
          </style>
        </>
      )}
    </>
  );
};

export default OfferComp;
