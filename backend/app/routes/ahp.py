from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from typing import List
from app.utils.ahp import ahp_main
from numpy import *

# Define the router
router = APIRouter()

# Define input models
class CompanyProps(BaseModel):
    id: str
    rank: int
    name: str
    revenue: float
    revenue_percent_change: float
    profits: float
    profits_percent_change: float
    assets: float
    employees: int
    change_in_rank: int
    years_on_global_500_list: int

class CriteriaProps(BaseModel):
    name: str
    weight: float

class AhpRequest(BaseModel):
    companies: List[CompanyProps]
    criteria: List[CriteriaProps]
    matrixes: List[List[List[float]]]

@router.post("/api/methods/ahp")
async def calculate_ahp(data: AhpRequest):
    print(data)
    try:
        # Extract data from request
        companies = data.companies
        criteria = data.criteria
        matrixes = data.matrixes

        # Run TOPSIS
        results = ahp_main(criteria, companies, matrixes)

        return {"results": results}

    except ValueError as ve:
        print("ValueError:", ve)
        raise HTTPException(status_code=400, detail=str(ve))  # Specific error code for validation errors
    except TypeError as te:
        print("TypeError:", te)
        raise HTTPException(status_code=400, detail=str(te))  # Specific error code for type-related issues
    except Exception as e:
        print("ERROR OCCURRED:", e)
        raise HTTPException(status_code=500, detail=str(e))  # General error handling
