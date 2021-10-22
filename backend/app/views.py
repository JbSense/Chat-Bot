"""
Definition of views.
"""

from django.http import HttpRequest, JsonResponse
from app.comand.comand import Comand
from app.message.Message import Message
from app.response.response import Response
from app.state.state import State
from app.validation.validation import Validation
import socket
import platform

def home(request):
    return JsonResponse({"ola": "mundo"})

"""
  * Cadastra uma nova mensagem no banco
  *
  * Retorna um json response
"""
def create_message(req):
    if Validation.method(req, "POST") == False: return Response.badResponse()
    if Validation.noParams(req.POST) == False: return Response.badResponse()
    if Validation.params(req.POST, ["user", "message"]) != True: return Response.badResponse()

    return Message.createMessage(req.POST)


"""
  * Obtém as mensagens já enviadas
  *
  * Retorna um json response
"""
def get_messages(req):
    if Validation.method(req, "GET") == False: return Response.badResponse()
    return Response.goodResponse(Message.getMessages())


"""
  * Cadastra um novo comando no banco
  *
  * Retorna um json response
"""
def create_comand(req):
    if Validation.method(req, "POST") == False: return Response.badResponse()
    if Validation.noParams(req.POST) == False: return Response.badResponse()
    if Validation.params(req.POST, ["request", "response"]) != True: return Response.badResponse()

    return Comand.createComand(req.POST)


"""
  * Obtém os comandos existentes
  *
  * Retorna um json response
"""
def get_comands(req):
  return Response.goodResponse(Comand.getComands())


def get_response(req):
  if Validation.method(req, "POST") == False: return Response.badResponse()
  if Validation.noParams(req.POST) == False: return Response.badResponse()
  if Validation.params(req.POST, ["request"]) != True: return Response.badResponse()

  return Comand.getComandResponse(req.POST)


def get_system(req):
  if Validation.method(req, "GET") == False: return Response.badResponse()

  system = {
          "ip": socket.gethostbyname(socket.gethostname()),
          "platform": platform.platform(),
          "architecture": platform.architecture()
        }

  return Response.goodResponse(system)


def checkState(req):
    if Validation.method(req, "GET") == False: return Response.badResponse()
    return State.checkStatus()


def setState(req):
    if Validation.method(req, "POST") == False: return Response.badResponse()
    if Validation.noParams(req.POST) == False: return Response.badResponse()
    if Validation.params(req, ["new_message"]) != True: return Response.badResponse()
    return State.setState(req.POST)

