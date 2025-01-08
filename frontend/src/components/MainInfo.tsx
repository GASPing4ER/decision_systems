import { servicesData } from "@/lib/data";

const MainInfo = ({
  selectedPhase,
  selectedService,
}: {
  selectedPhase: number;
  selectedService: number;
}) => {
  return (
    <>
      <div className="flex flex-col px-4 lg:px-10 gap-4 mb-4">
        <h3 className="font-medium text-xl uppercase">What we offer</h3>
        <div className="flex gap-2">
          {servicesData[selectedPhase].methods &&
            servicesData[selectedPhase].methods[
              selectedService
            ].details.keywords.map((keyword, index) => (
              <span
                key={index}
                className="text-xs bg-slate-900 text-slate-50 px-2 py-1 rounded-md"
              >
                {keyword}
              </span>
            ))}
        </div>
        <p className="text-xs sm:text-sm italic">
          {servicesData[selectedPhase].methods &&
            servicesData[selectedPhase].methods[selectedService].details.offer}
        </p>
      </div>
      <div className="flex flex-col px-4 lg:px-10 gap-2 mt-6">
        <h3 className="font-medium text-xl uppercase">Reviews</h3>
        <div className="flex flex-col gap-2">
          {servicesData[selectedPhase].methods &&
            servicesData[selectedPhase].methods[
              selectedService
            ].details.reviews.map((review, index) => (
              <p
                key={index}
                className="text-xs text-slate-900 italic px-2 py-1 rounded-md"
              >
                {review}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default MainInfo;
