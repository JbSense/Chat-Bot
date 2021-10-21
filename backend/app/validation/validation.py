class Validation(object):
    """description of class"""

    # Valida o method da requisição
    def method(req, m):
        if req.method != m: return False
        return True

    # Valida se existe parâmetros na requisição
    def noParams(req):
        if req == {}: return False
        return True

    # Valida os parâmetros que foram passados
    def params(req, keys):
        for x in req:
            if x not in keys: return False

        return True