import { useDataContext } from "@/hooks";
import { servicesData } from "@/lib/data";
import { useEffect } from "react";

const SidebarTabs = ({
  selectedPhase,
  selectedService,
  handleServiceSelect,
}: {
  selectedPhase: number;
  selectedService: number;
  handleServiceSelect: (index: number) => void;
}) => {
  const { method, setMethod } = useDataContext();

  useEffect(() => {
    if (selectedPhase === 0) {
      setMethod(
        selectedService === 0
          ? "ahp"
          : selectedService === 1
          ? "topsis"
          : selectedService === 2
          ? "promethee"
          : "WSM"
      );
    }
  }, [selectedService, selectedPhase, setMethod]);
  console.log("METHOD:", method);

  return (
    <div className={`w-full lg:w-[340px]`}>
      <ul className="bg-white relative min-h-[140px] flex flex-1 flex-col">
        {servicesData[selectedPhase].methods &&
          servicesData[selectedPhase].methods.map((method, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                selectedService === index ? "bg-slate-50" : "bg-white"
              } h-[76px] hover:bg-slate-50 border-b border-[#ebeff1]`}
              onClick={() => handleServiceSelect(index)}
            >
              <div className="h-full w-full py-4 px-5 flex">
                <div className="text-[13px] h-[46px] w-[38px] bg-slate-900 text-slate-50 rounded-[5px] flex justify-center items-center font-semibold mr-[13px]">
                  {index + 1}
                </div>
                <div className="self-center">
                  <h3 className="font-medium">{method.title}</h3>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SidebarTabs;
