import json

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

with open('credentials.json', 'r') as f:
    data = json.load(f)
    SECRET_KEY = data['SECRET_KEY']
    DATABASE_URL = data['DATABASE_URL']

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY']
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    CORS(app)

    from .models import Question

    with app.app_context():
        db.create_all()

    from .questions import questions

    app.register_blueprint(questions, url_prefix='/api')

    return app