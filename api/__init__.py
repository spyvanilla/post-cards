import uuid
from os import getenv, environ
from dotenv import load_dotenv

from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from google.cloud import storage

environ['GCLOUD_PROJECT'] = 'my-project-1234'

db = SQLAlchemy()

load_dotenv()
SECRET_KEY = getenv('SECRET_KEY')
DATABASE_URL = getenv('DATABASE_URL')
STORAGE_BUCKET_NAME = getenv('STORAGE_BUCKET_NAME')

# Setup for google cloud storage
storage_client = storage.Client()
bucket = storage_client.bucket(STORAGE_BUCKET_NAME)

def storage_write_file(image):
    # Responsible for uploading images in google cloud storage
    blob = bucket.blob(uuid.uuid4().hex)
    blob.upload_from_string(image.read(), content_type=image.content_type)
    blob.make_public()
    return blob.name

def storage_find_file(blob_name):
    # Responsible for finding a specific image in google cloud storage
    for blob in storage_client.list_blobs(STORAGE_BUCKET_NAME):
        if blob.name == blob_name:
            return blob.public_url

def storage_delete_file(blob_name):
    blob = bucket.blob(blob_name)
    blob.delete()

def create_app():
    # This app uses factories pattern, more info here: https://flask.palletsprojects.com/en/2.2.x/patterns/appfactories/
    app = Flask(__name__, static_folder='../client/dist', static_url_path='')

    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['UPLOAD_FOLDER'] = 'api'

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