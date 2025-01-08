import { servicesData } from "@/lib/data";

const HeaderInfo = ({
  selectedPhase,
  selectedService,
}: {
  selectedPhase: number;
  selectedService: number;
}) => {
  return (
    <div className="relative z-[1] mb-6 flex gap-4 py-4">
      <div className="pl-4 lg:pl-10">
        <div className="w-14 h-16 bg-[#AB7952] rounded-md flex items-center justify-center text-2xl font-semibold mb-3">
          {selectedService + 1}
        </div>
      </div>
      <div className="pr-4 lg:pr-10">
        <h2 className="text-xl sm:text-2xl text-slate-900 font-medium">
          {servicesData[selectedPhase].methods &&
            servicesData[selectedPhase].methods[selectedService].title}
        </h2>
        <p className="text-xs sm:text-sm italic">
          {servicesData[selectedPhase].methods &&
            servicesData[selectedPhase].methods[selectedService].description}
        </p>
      </div>
    </div>
  );
};

export default HeaderInfo;
