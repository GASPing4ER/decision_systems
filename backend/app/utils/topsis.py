from numpy import *

def parse_numeric(value: str) -> float:
    # Remove dollar signs, commas, and other non-numeric characters, then convert to float
    if (value == "-"):
        return 0
    else:
        return float(value.replace('$', '').replace(',', '').replace('%', '').strip())


def build_matrix_and_weights(companies, criteria):
    # Match criteria names to company attributes and build matrix
    matrix = []
    for company in companies:
        row = []
        for criterion in criteria:
            attribute_value = getattr(company, criterion.name, None)
            if attribute_value is None:
                raise ValueError(f"Missing attribute {criterion.name} for company {company.name}")
            row.append(float(attribute_value))
        matrix.append(row)
    
    # Extract weights
    weights = [criterion.weight for criterion in criteria]
    return array(matrix), array(weights)


def norm(x, y):
    """ normalization function; x is the array with the
    performances and y is the normalization method.
    For vector input 'v' and for linear 'l'
	"""
    if y == 'v':
        k = array(cumsum(x**2, 0))
        print("k", k)
        z = array([[round(x[i, j] / sqrt(k[x.shape[0] - 1,
            j]), 3) for j in range(x.shape[1])]
            for i in range(x.shape[0])])
        print("The normalized matrix is", z)
        return z
    else:
        yy = []
        for i in range(x.shape[1]):
            yy.append(amax(x[:, i:i + 1]))
            k = array(yy)
        z = array([[round(x[i, j] / k[j], 3)
            for j in range(x.shape[1])]
            for i in range(x.shape[0])])
       # print("The normalized matrix is", z)
        return z

def mul_w(r, t):
    """ multiplication of each evaluation by the associate
    weight; r stands for the weights matrix and t for
    the normalized matrix resulting from norm()
	"""
    z = array([[round(t[i, j] * r[j], 3)
        for j in range(t.shape[1])]
        for i in range(t.shape[0])])
    return z

def zenith_nadir(x, y):
    """ zenith and nadir virtual action function; x is the
    weighted normalized decision matrix and y is the
    action used. For min/max input 'm' and for absolute
    input enter 'a'
	"""
    if y == 'm':
        bb = []
        cc = []
        for i in range(x.shape[1]):
            bb.append(amax(x[:, i:i + 1]))
            b = array(bb)
            cc.append(amin(x[:, i:i + 1]))
            c = array(cc)
        return (b, c)
    else:
        b = ones(x.shape[1])
        c = zeros(x.shape[1])
        return (b, c)

def distance(x, y, z):
    """ calculate the distances to the ideal solution (di+)
    and the anti-ideal solution (di-); x is the result
    of mul_w() and y, z the results of zenith_nadir()
	"""
    a = array([[(x[i, j] - y[j])**2 
		for j in range(x.shape[1])] 
		for i in range(x.shape[0])])
    b = array([[(x[i, j] - z[j])**2 
		for j in range(x.shape[1])]
        for i in range(x.shape[0])])
    return (sqrt(sum(a, 1)), sqrt(sum(b, 1)))

def topsis(matrix, weight, norm_m, id_sol):
    """ matrix is the initial decision matrix, 
        weight is the weights matrix, 
        norm_m is the normalization method, 
        id_sol is the action used, and 
        pl is 'y' for plotting the results or any other string for not 
    """
    #p = norm(matrix, norm_m)
    #print("The normalized matrix is", p)
    z = mul_w(weight, norm(matrix, norm_m))
    #print("The weighthed normalized matrix is", z)
    s, f = zenith_nadir(z, id_sol)
    #print("The s and f are:", s,f)
    p, n = distance(z, s, f)
    final_s = array([n[i] / (p[i] + n[i]) 
		for i in range(p.shape[0])])
    return final_s