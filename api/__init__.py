from os import getenv
from dotenv import load_dotenv

from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

load_dotenv()
SECRET_KEY = getenv('SECRET_KEY')
DATABASE_URL = getenv('DATABASE_URL')

def create_app():
    app = Flask(__name__, static_folder='./../client/build', static_url_path='')

    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['UPLOAD_FOLDER'] = 'api/images'

    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    CORS(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    from .models import User
    from .models import Question

    with app.app_context():
        db.create_all()

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from .auth import auth
    from .profile import profile
    from .questions import questions

    app.register_blueprint(auth, url_prefix='/api')
    app.register_blueprint(profile, url_prefix='/api')
    app.register_blueprint(questions, url_prefix='/api')

    return app