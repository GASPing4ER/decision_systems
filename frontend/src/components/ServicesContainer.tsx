"use client";

import { useState } from "react";

import ServicesPagination from "./ServicesPagination";
import { servicesData } from "@/lib/data";
import { CompanyProps } from "@/types";
import CompaniesTable from "./CompaniesTable";
import CriteriaTable from "./CriteriaTable";
import HeaderInfo from "./HeaderInfo";
import SidebarTabs from "./SidebarTabs";
import MainInfo from "./MainInfo";
import CriteriaDisplay from "./CriteriaDisplay";
import ResultOverview from "./ResultOverview";

const ServicesContainer = ({ companies }: { companies: CompanyProps[] }) => {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [selectedService, setSelectedService] = useState(0);

  function handleServiceSelect(index: number) {
    setSelectedService(index);
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center gap-6 p-6 pt-24 lg:p-24 bg-slate-50 text-slate-900">
        <div className="mt-[40px] mx-auto w-full lg:w-[976px] flex flex-col gap-2 md:flex-row justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[#AB7952]">PHASE 0{selectedPhase + 1}</span>
            <h2 className={` text-2xl uppercase`}>
              {servicesData[selectedPhase].title}
            </h2>
            <p className="italic">{servicesData[selectedPhase].description}</p>
          </div>
          <ServicesPagination
            selectedPhase={selectedPhase}
            setSelectedPhase={setSelectedPhase}
            setSelectedService={setSelectedService}
          />
        </div>
        <div className="mt-[20px] my-0 mx-auto lg:min-h-[616px] w-full lg:w-[976px] bg-white rounded-[8px] rounded-tr-[9px] flex flex-col lg:flex-row shadow-[0_3px_5px_rgba(0,0,0,0.07)] animate-intro">
          <SidebarTabs
            selectedPhase={selectedPhase}
            selectedService={selectedService}
            handleServiceSelect={handleServiceSelect}
          />
          <section className="flex-1 bg-slate-50 flex flex-col relative rounded-tr-xl rounded-br-lg pb-4">
            <div className="object-cover w-full h-[125px] rounded-tr-lg bg-[#091235] text-white flex items-center justify-center text-4xl flex-shrink-0">
              WISE VENTURE
            </div>
            <HeaderInfo
              selectedPhase={selectedPhase}
              selectedService={selectedService}
            />
            {servicesData[selectedPhase].methods[selectedService].title ===
            "Company Pool Definition" ? (
              <CompaniesTable companies={companies} />
            ) : servicesData[selectedPhase].methods[selectedService].title ===
              "Criteria Pool Definition" ? (
              <CriteriaTable />
            ) : selectedPhase === 3 ? (
              <CriteriaDisplay />
            ) : selectedPhase === 4 ? (
              <ResultOverview />
            ) : (
              <MainInfo
                selectedPhase={selectedPhase}
                selectedService={selectedService}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ServicesContainer;
