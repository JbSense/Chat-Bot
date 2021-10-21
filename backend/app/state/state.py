from app.models import Status
from app.response.response import Response
from app.validation.validation import Validation

class State(object): 
    """
      * Obtém o status do banco 
    """
    def checkStatus():
        obj = {}
        counter = 0

        for x in Status.objects.all():
            obj[counter] = {"new_message": x.new_message}
            counter += 1

        return Response.goodResponse(obj)

    """
      * Seta o status new_message do banco  
    """
    def setState(req):
        if req["new_message"] == "true" or req["new_message"] == "false":    
            Status.objects.filter(id=1).update(new_message=req["new_message"])

        else:
            return Response.badResponse()

        return Response.goodResponse()