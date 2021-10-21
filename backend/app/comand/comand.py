from app.models import Comands
from app.format.format import Format
from app.response.response import Response

class Comand(object):
    """
      * Salva no banco um novo comando
      *
      * Retorna uma chamada a função goodResponse da class Response com um dicionáio de parâmetro
    """
    def createComand(req):
        cmds = []
        for x in Comands.objects.all():
            cmds.append(x.request)

        if req["request"] in cmds: return Response.badResponse()

        query = Comands(request=Format.formatString(req["request"]), response=req["response"])
        query.save()

        return Response.goodResponse(Comand.getComands())


    """ 
      * Obtém os comandos existentes
      *
      * Retorna um dicionário
    """
    def getComands():
        obj = {}
        c = 0

        for x in Comands.objects.all():
            obj[c] = {"request": x.request, "response": x.response}
            c += 1

        return obj

    """
      * Busca a resposta para o comando
    """
    def getComandResponse(req):
        for x in Comands.objects.all():
            if Format.formatString(req) == x.request: return x.response

        return "Desculpe mas não sou capaz de lhe responder isso"
