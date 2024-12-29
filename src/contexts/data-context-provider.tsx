"use client";

import {
  CompanyProps,
  CriteriaProps,
  MethodProps,
  PhaseProps,
  ResultProps,
} from "@/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type DataContextProviderProps = {
  children: React.ReactNode;
};

type TDataContext = {
  companies: CompanyProps[];
  setCompanies: Dispatch<SetStateAction<CompanyProps[]>>;
  handleAddCompany: (newCompany: CompanyProps) => void;
  handleEditCompany: (editedCompany: CompanyProps) => void;
  handleRemoveCompany: (id: CompanyProps["id"]) => void;
  criteria: CriteriaProps[];
  setCriteria: Dispatch<SetStateAction<CriteriaProps[]>>;
  results: ResultProps[];
  setResults: Dispatch<SetStateAction<ResultProps[]>>;
  phase: PhaseProps;
  setPhase: Dispatch<SetStateAction<PhaseProps>>;
  method: MethodProps;
  setMethod: Dispatch<SetStateAction<MethodProps>>;
};

export const DataContext = createContext<TDataContext | null>(null);

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [criteria, setCriteria] = useState<CriteriaProps[]>([
    { name: "", weight: 0 },
  ]);
  const [results, setResults] = useState<ResultProps[]>([]);
  const [phase, setPhase] = useState<PhaseProps>("companies");
  const [method, setMethod] = useState<MethodProps>("");

  // handlers
  const handleAddCompany = (newCompany: CompanyProps) => {
    setCompanies((prev) =>
      prev.includes(newCompany)
        ? prev.filter((c) => c.id !== newCompany.id)
        : [...prev, newCompany]
    );
  };

  const handleEditCompany = (editedCompany: CompanyProps) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === editedCompany.id ? editedCompany : company
      )
    );
  };

  const handleRemoveCompany = (id: CompanyProps["id"]) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== id)
    );
  };

  return (
    <DataContext.Provider
      value={{
        companies,
        setCompanies,
        handleAddCompany,
        handleEditCompany,
        handleRemoveCompany,
        criteria,
        setCriteria,
        results,
        setResults,
        phase,
        setPhase,
        method,
        setMethod,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
