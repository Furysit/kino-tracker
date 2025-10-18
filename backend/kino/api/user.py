from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import timedelta, datetime, timezone
from kino import db
from functools import wraps
from kino.config.config import SECRET_KEY, ACCESS_TOKEN_EXPIRES_MIN, ALGORITHM

user_bp = Blueprint("user", __name__, url_prefix="/api")
users_collection = db.users
pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def create_admin():
    login = "ivanzolo"
    password = "sosi"
    mongo_user = users_collection.find_one({"login" : login})
    if not mongo_user:
        hashed_password = generate_password_hash(password)
        users_collection.insert_one({"login": login, "password": hashed_password})


def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (timedelta(minutes=ACCESS_TOKEN_EXPIRES_MIN))
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_forgot_password_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (timedelta(minutes=ACCESS_TOKEN_EXPIRES_MIN))
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode, SECRET_KEY,algorithm=ALGORITHM)


def hash_password(password: str) -> str:
    return generate_password_hash(password)

def verify_password(plain_password: str, hashed:str) -> str:
    return check_password_hash(plain_password, hashed)


@user_bp.route('/authorization', methods=['GET','POST'])
def authorization():
    login = request.form.get('login')
    password = request.form.get('password')
    if not login or not password:
        return {"Error": "Login and password required"}, 400
    
    print(f"Ищем пользователя с логином: {login}")
    mongo_user = users_collection.find_one({"login" : login})
    if not mongo_user:
        return {"Error": "User not found"}, 404
    
    print(f"Пользователь найден: {mongo_user}")
    if not check_password_hash(mongo_user.get("password"), password):
        return {"error": "Incorrect password"}, 401
    
    token_data = {"sub": str(mongo_user["_id"]), "login": mongo_user["login"]}

    access_token = create_access_token(token_data)
    return {"access_token": access_token, "token-type": "bearer", "ttl": ACCESS_TOKEN_EXPIRES_MIN}


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"error": "Missing Authorization header"}), 401

        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            request.user = payload  
        except IndexError:
            return jsonify({"error": "Invalid token format"}), 401
        except JWTError:
            return jsonify({"error": "Invalid or expired token"}), 401

        return f(*args, **kwargs)
    return decorated
