from flask import Flask
from flask_login import LoginManager
from flask_pymongo import PyMongo
import os
from flask_cors import CORS
from dotenv import load_dotenv

env = os.getenv("FLASK_ENV", "production")
load_dotenv(f".env.{env}")

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['MONGO_URI'] = os.getenv("MONGO_URI")
db = PyMongo(app).db


from kino.api.user import user_bp, create_admin
from kino.api.movies import movies_bp

create_admin()
app.register_blueprint(user_bp)
app.register_blueprint(movies_bp)
