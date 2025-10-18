from flask import Flask
from flask_login import LoginManager
from flask_pymongo import PyMongo
import os
from flask_cors import CORS



app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'secret_key'
app.config['MONGO_URI'] = os.getenv(
    "MONGO_URI",
    'mongodb://127.0.0.1:27017/dev_db'
)
db = PyMongo(app).db


from kino.api.user import user_bp, create_admin
from kino.api.movies import movies_bp

create_admin()
app.register_blueprint(user_bp)
app.register_blueprint(movies_bp)
