from django.http import HttpRequest, JsonResponse

class Response(object):
    """
      * Constrói um json para enviar como resposta de uma requisição
    """
    def constructResponse(status, resp, data = None):
        result = {
                "alive": 1,
                "status": status,
                "response": resp,
                "data": data
            }

        return JsonResponse(result)

    def goodResponse(obj = None):
        resp = "Requisição realizada com sucesso!"
        return Response.constructResponse(200, resp, obj)

    def badResponse():
        resp = "Erro ao tentar a requisição!"
        return Response.constructResponse(400, resp)

    def test():
        return JsonResponse({ "result": "error" })