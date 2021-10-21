"""
Definition of urls for backend.
"""

from datetime import datetime
from django.urls import path
from app import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/create-message', views.create_message), # Redireciona para a view que cadastra uma nova mensagem
    path('api/get-messages', views.get_messages), # Redireciona para a view que obtém as mensagens enviadas
    path('api/create-comand', views.create_comand), # Redireciona para a view que cadastra um novo comando
    path('api/get-comands', views.get_comands), # Redireciona para a view que obtém os comandos já cadastrados
    path('api/check-status', views.checkState), # Redireciona para a view que faz a checagem do status do banco
    path('api/set-status', views.setState) # Redireciona para a view que seta o status do banco
]
