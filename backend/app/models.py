"""
Definition of models.
"""

from django.db import models

# Responsavel pela tabela das mensagens
class Messages(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.CharField(max_length=6)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# Responsavel pela teabela dos comandos
class Comands(models.Model):
    id = models.IntegerField(primary_key=True)
    request = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# Responsavel pela tabela do status do banco
class Status(models.Model):
    new_message = models.CharField(max_length=5)