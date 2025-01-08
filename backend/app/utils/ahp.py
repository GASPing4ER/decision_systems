from numpy import *

# normalized column sum method
def ahp_norm(x):
    """ x is the pairwise comparison matrix for the 
    criteria or the alternatives
    """
    k = array(sum(x, 0))
    z = array([[round(x[i, j] / k[j], 3) 
        for j in range(x.shape[1])]
        for i in range(x.shape[0])])
    return z

# geometric mean method
def ahp_geomean(x):
    """ x is the pairwise comparison matrix for the
    criteria or the alternatives
    """
    z = [1] * x.shape[0]
    for i in range(x.shape[0]):
        for j in range(x.shape[1]):
            z[i] = z[i] * x[i][j]
        z[i] = pow(z[i], (1 / x.shape[0]))
    return z

# AHP method: it calls the other functions
def ahp(PCM, PCcriteria, m, n):
    print(f"PCcriteria shape: {PCcriteria.shape}")
    print(PCcriteria)
    GMcriteria = ahp_geomean(PCcriteria)
    w = GMcriteria / sum(GMcriteria)
    # calculate the local priority vectors for the 
    # alternatives
    S = []
    for i in range(n):
        GMalternatives = ahp_geomean(PCM[i*m:i*m+m,0:m])
        s = GMalternatives / sum(GMalternatives)
        S.append(s)
    S = transpose(S)

    # calculate the global priority vector for the
    # alternatives
    print("S:", S)
    print("S.shape:", S.shape)
    print("w.T:", w.T)
    v = S.dot(w.T)

    return v

# main function
def ahp_main(criteria, companies, converted_tables):
    # the number of the alternatives
    m = len(companies)
    print("The number of the alternatives: ", m)
    # the number of the criteria
    n = len(criteria)
    print("The number of the criteria: ", n)
    
    # random indices for consistency checking
    RI = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41,
        1.45, 1.49]
    
    # pairwise comparison matrix of the criteria
    PCcriteria = array(converted_tables.pop(0))
    print("Criteria matrix:", PCcriteria)
    # consistency check for pairwise comparison matrix of
    # the criteria
    lambdamax = amax(linalg.eigvals(PCcriteria).real)
    CI = (lambdamax - n) / (n - 1)
    CR = CI / RI[n - 1]
    
    print("Companies matrixes before stacking:", converted_tables)
    allPCM = vstack((converted_tables))
    print("allPCM after vstack:", allPCM)
    
    # consistency check for pairwise comparison matrix of
    # the alternatives
    for i in range(n):
        lambdamax = max(linalg.eigvals(allPCM[i * m:i 
            * m + m, 0:m]).real)
        CI = (lambdamax - m) / (m - 1)
        CR = CI / RI[m - 1]
        print(f"Consistency Ratio for alternatives matrix {i + 1}: {CR}")

    # call ahp method
    scores = ahp(allPCM, PCcriteria, m, n)
    print("scores", scores)
    scores = [float(score) for score in scores]

    # print results
    #print("Global priorities = ", scores)

    results = []
    for i in range(len(companies)):
        results.append({
            'name': companies[i].name,
            'global_priorities':  scores[i],
        })
    print(results)
    return results