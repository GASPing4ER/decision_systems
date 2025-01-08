from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from typing import List

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

class WSMRequest(BaseModel):
    companies: List[CompanyProps]
    criteria: List[CriteriaProps]
    scores: List[List[int]]

@router.post("/api/methods/wsm")
async def calculate_wsm(data: WSMRequest):
    try:
        # Extract data from request
        companies = data.companies
        criteria = data.criteria
        scores = data.scores

        # Ensure scores and weights match the dimensions
        if len(scores) != len(companies) or any(len(score) != len(criteria) for score in scores):
            raise HTTPException(status_code=400, detail="Scores dimensions do not match companies and criteria.")

        # Extract weights
        weights = [criterion.weight for criterion in criteria]
       
        results = []
        for company_idx, company_scores in enumerate(scores):
            weighted_sum = sum(score * weights[crit_idx] for crit_idx, score in enumerate(company_scores))
            results.append({
                "id": companies[company_idx].id,
                "name": companies[company_idx].name,
                "weighted_sum": weighted_sum
            })
        # Prepare response
        results.sort(key=lambda x: x["weighted_sum"], reverse=True)

        return {"results": results}

    except Exception as e:
        print("ERROR OCCURRED:", e)
        raise HTTPException(status_code=500, detail=str(e))
        
