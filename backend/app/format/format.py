from unidecode import unidecode

class Format(object):
    """
      * Formata uma string tirando espaços indevidos e acentos
      *
      * Retorna a string formatada
    """

    def formatString(string):
        formated = unidecode(string.strip(" ").lower())

        return formated