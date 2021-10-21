from app.comand.comand import Comand
from app.models import Messages
from app.response.response import Response
from app.state.state import State
from app.validation.validation import Validation

class Message(object):
    """
      * Salva no banco uma nova mensagem e seta o status de new_message como true
      *
      * Retorna uma chamada a função goodResponse da class Response com um dicionáio de parâmetro
    """
    def createMessage(req):
        if req["user"] == "client" or req["user"] == "bot":
            query = Messages(user=req["user"], message=req["message"])
            query.save()

            State.setState({"new_message": "true"})

        else:
            return Response.badResponse()

        if req["user"] == "client":
            Message.createMessage({"user": "bot", "message": Comand.getComandResponse(req["message"])})

            return Response.goodResponse(Message.getMessages())

        else:
            return



    """ 
      * Obtém o histórico de mensagens
      *
      * Retorna um dicionário
    """
    def getMessages():
        obj = {}
        c = 0

        for x in Messages.objects.all():
            obj[c] = {"user": x.user, "message": x.message}
            c += 1

        return obj
