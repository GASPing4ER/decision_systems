import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ServicesPaginationProps = {
  selectedPhase: number;
  setSelectedPhase: Dispatch<SetStateAction<number>>;
  setSelectedService: Dispatch<SetStateAction<number>>;
};

const ServicesPagination = ({
  selectedPhase,
  setSelectedPhase,
  setSelectedService,
}: ServicesPaginationProps) => {
  function handleNext() {
    setSelectedPhase((prevCount) => {
      if (prevCount === 5 - 1) {
        return 4;
      } else {
        return prevCount + 1;
      }
    });
    setSelectedService(0);
  }

  function handlePrev() {
    setSelectedPhase((prevCount) => {
      if (prevCount === 0) {
        return 0;
      } else {
        return prevCount - 1;
      }
    });
    setSelectedService(0);
  }

  return (
    <div className="flex items-center gap-4">
      <button
        className="py-2 px-4 rounded-2xl text-sm"
        onClick={() => handlePrev()}
        aria-label="Previous"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <span className="text-lg">{selectedPhase + 1}/5</span>
      <button
        className="py-2 px-4 rounded-2xl text-sm"
        onClick={() => handleNext()}
        aria-label="Next"
      >
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ServicesPagination;
