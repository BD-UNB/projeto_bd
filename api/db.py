import mysql.connector

def connect():
    return mysql.connector.connect(
        host="localhost",
        user="projeto_bd",
        password="<=6V%3p/6c]9K]2",
        database="projeto_bd"
    )

def close():
    connect().close()
