"use client";

import { useDataContext } from "../hooks";
import PhaseSwitchToButton from "./PhaseSwitchToButton";

const MethodsDisplay = () => {
  const { phase, method, setMethod } = useDataContext();
  if (phase === "methods") {
    return (
      <section className="h-full flex flex-col items-center gap-4">
        <h1 className="text-2xl text-center py-4">CHOOSE METHOD:</h1>
        <ul className="flex gap-10">
          <li
            className={`text-xl py-4 px-10 border rounded-2xl hover:bg-black hover:text-white cursor-pointer ${
              method === "topsis" ? "bg-black text-white" : ""
            }`}
            onClick={() => setMethod("topsis")}
          >
            TOPSIS
          </li>
          <li
            className={`text-xl py-4 px-10 border rounded-2xl hover:bg-black hover:text-white cursor-pointer ${
              method === "ahp" ? "bg-black text-white" : ""
            }`}
            onClick={() => setMethod("ahp")}
          >
            AHP
          </li>
          <li
            className={`text-xl py-4 px-10 border rounded-2xl hover:bg-black hover:text-white cursor-pointer ${
              method === "scoring" ? "bg-black text-white" : ""
            }`}
            onClick={() => setMethod("scoring")}
          >
            SCORING
          </li>
        </ul>
        {method !== "" && <PhaseSwitchToButton nextPhase="companies" />}
      </section>
    );
  }
};

export default MethodsDisplay;
