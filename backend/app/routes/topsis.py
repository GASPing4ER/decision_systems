from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from typing import List
from app.utils.topsis import build_matrix_and_weights, topsis, parse_numeric

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

class TopsisRequest(BaseModel):
    companies: List[CompanyProps]
    criteria: List[CriteriaProps]

@router.post("/api/methods/topsis")
async def calculate_topsis(data: TopsisRequest):
    try:
        # Extract data from request
        companies = data.companies
        criteria = data.criteria

        # Convert data to a decision matrix and weights
        decision_matrix, weights = build_matrix_and_weights(companies, criteria)
        # Run TOPSIS
        coefficients = topsis(decision_matrix, weights, 'v', 'm')
        # Prepare response
        result = [
            {"id": companies[i].id, "name": companies[i].name, 
             "closeness_coefficient": coefficients[i]}
            for i in range(len(companies))
        ]
        return {"results": result}

    except Exception as e:
        print("ERROR OCCURRED:", e)
        raise HTTPException(status_code=500, detail=str(e))
        
