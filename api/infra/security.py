import jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

TOKEN_SECRET_KEY = os.getenv("SECRET_KEY", "v32B!A=ruBS9MQzKoBYrkQdSPQ4rgoVxRAtmvgrahTDOWQPWDOKDQPOKSdawodkawDWOAKPD10293nd10dj0219Ed9023")
ALGORITMO = "HS256"
TOKEN_DE_ACESSO_EXPIRACAO_MINUTOS = 60 * 24 # 24 horas

security = HTTPBearer()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=TOKEN_DE_ACESSO_EXPIRACAO_MINUTOS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, TOKEN_SECRET_KEY, algorithm=ALGORITMO)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, TOKEN_SECRET_KEY, algorithms=[ALGORITMO])
        id_usuario: int = payload.get("idUsuario")
        perfil: str = payload.get("perfil")
        if id_usuario is None or perfil is None:
            raise credentials_exception
        return {"idUsuario": id_usuario, "perfil": perfil}
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError:
        raise credentials_exception
