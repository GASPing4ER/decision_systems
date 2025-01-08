from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from typing import List
from app.utils.promethee import promethee_main
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
    indifferenceThreshold: float;
    preferenceThreshold: float;
    optimization: int;
    preferenceFunction: str;

class PrometheeRequest(BaseModel):
    companies: List[CompanyProps]
    criteria: List[CriteriaProps]
    scores: List[List[int]]

@router.post("/api/methods/promethee")
def calculate_promethee(data: PrometheeRequest):
    try:
        companies = data.companies
        criteria = data.criteria
        scores = data.scores
        
        # Extract data from criteria
        weights = [criterion.weight for criterion in criteria]
        prefParams = [
            [criterion.indifferenceThreshold for criterion in criteria],
            [criterion.preferenceThreshold for criterion in criteria]
        ]
        optimization = [criterion.optimization for criterion in criteria]
        prefFunc = [criterion.preferenceFunction for criterion in criteria]

        # Normalize weights if required
        total_weight = sum(weights)
        if total_weight > 0:
            weights = [weight / total_weight for weight in weights]
            
        print("Scores being passed to PROMETHEE:", scores)
        print("Weights:", weights)
        print("Preference Parameters:", prefParams)
        # Call the PROMETHEE calculation
        result_data = promethee_main(scores, prefParams, optimization, prefFunc, weights)
        
        results = []
        for i in range(len(companies)):
            results.append({
                "id": companies[i].id,
                'name': companies[i].name,
                'score': result_data[i]
            })
        
          # Ensure that results contains dictionaries with 'score' as a key
        if all('score' in result for result in results):
            # Sort the results based on the 'score' key in descending order
            sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)
        else:
            raise ValueError("One or more results are missing the 'score' field")

        return {'results': sorted_results}  # Return the sorted results

    except ValueError as ve:
        print("ValueError:", ve)
        raise HTTPException(status_code=400, detail=str(ve))  # Specific error code for validation errors
    except TypeError as te:
        print("TypeError:", te)
        raise HTTPException(status_code=400, detail=str(te))  # Specific error code for type-related issues
    except Exception as e:
        print("ERROR OCCURRED:", e)
        raise HTTPException(status_code=500, detail=str(e))  # General error handling