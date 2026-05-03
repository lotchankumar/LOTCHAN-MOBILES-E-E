const happyCustomerImages = [
  "/happy customer/527026930_17848857963531610_438873722987637136_n.jpg",
  "/happy customer/528037491_17849337288531610_4434783760716709182_n.jpg",
  "/happy customer/534313243_17851248291531610_8251355497491386643_n.jpg",
  "/happy customer/549039673_17855026125531610_4267227186007346443_n.jpg",
  "/happy customer/551475391_17855520993531610_529280531970995126_n.jpg",
  "/happy customer/553534331_17856534201531610_9208641448448816508_n.jpg",
  "/happy customer/553766517_17856016770531610_5130625374932360060_n.jpg",
  "/happy customer/556903525_17857050072531610_675726726282403769_n.jpg",
  "/happy customer/558440225_17857182483531610_3407425768867103131_n.jpg",
  "/happy customer/559884854_17857792305531610_1583349649165077460_n.jpg",
  "/happy customer/561142467_17857929975531610_919355113295261756_n.jpg",
  "/happy customer/561877993_17858327025531610_5300395405980458180_n.jpg",
  "/happy customer/562813152_17858449530531610_2586836485548915548_n.jpg",
  "/happy customer/563127812_17858327193531610_2670326811407416409_n.jpg",
  "/happy customer/566636737_17859167166531610_5771160770755079801_n.jpg",
  "/happy customer/570341035_17859963471531610_6693831521538273494_n.jpg",
  "/happy customer/570440156_17859813408531610_6787505615506580843_n.jpg",
];

// Split images across 3 rows, duplicate each for seamless looping
const row1 = [...happyCustomerImages.slice(0, 6), ...happyCustomerImages.slice(0, 6)];
const row2 = [...happyCustomerImages.slice(6, 12), ...happyCustomerImages.slice(6, 12)];
const row3 = [...happyCustomerImages.slice(12), ...happyCustomerImages.slice(12)];

const HappyCustomerBg = () => {
  return (
    <>
      {/* Sliding Carousel Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {/* Row 1 - slides left */}
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden p-1">
          <div
            className="flex gap-2 h-full animate-slide-left"
            style={{ width: `${row1.length * 280}px` }}
          >
            {row1.map((src, i) => (
              <div key={`r1-${i}`} className="flex-shrink-0 h-full rounded-xl overflow-hidden" style={{ width: "260px" }}>
                <img
                  src={src}
                  alt={`Happy Customer ${i + 1}`}
                  className="w-full h-full object-contain bg-black/80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - slides right */}
        <div className="absolute top-1/3 left-0 w-full h-1/3 overflow-hidden p-1">
          <div
            className="flex gap-2 h-full animate-slide-right"
            style={{ width: `${row2.length * 280}px` }}
          >
            {row2.map((src, i) => (
              <div key={`r2-${i}`} className="flex-shrink-0 h-full rounded-xl overflow-hidden" style={{ width: "260px" }}>
                <img
                  src={src}
                  alt={`Happy Customer ${i + 1}`}
                  className="w-full h-full object-contain bg-black/80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - slides left (slower) */}
        <div className="absolute top-2/3 left-0 w-full h-1/3 overflow-hidden p-1">
          <div
            className="flex gap-2 h-full animate-slide-left-slow"
            style={{ width: `${row3.length * 280}px` }}
          >
            {row3.map((src, i) => (
              <div key={`r3-${i}`} className="flex-shrink-0 h-full rounded-xl overflow-hidden" style={{ width: "260px" }}>
                <img
                  src={src}
                  alt={`Happy Customer ${i + 1}`}
                  className="w-full h-full object-contain bg-black/80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark gradient overlay - lighter so faces are more visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-[1]" />

      {/* Inline keyframes */}
      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slideLeft 30s linear infinite;
        }
        .animate-slide-right {
          animation: slideRight 35s linear infinite;
        }
        .animate-slide-left-slow {
          animation: slideLeft 40s linear infinite;
        }
      `}</style>
    </>
  );
};

export default HappyCustomerBg;
