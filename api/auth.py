import json

from flask import Blueprint, request
from flask_login import login_user, login_required, logout_user, current_user
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from .models import User

auth = Blueprint('auth', __name__)

def validate_username(username):
    username_already_exists = User.query.filter_by(username=username).first()

    if username_already_exists:
        return False
    return True

@auth.route('/register', methods=['POST'])
@cross_origin()
def register():
    auth_values = json.loads(request.data)
    username = auth_values['username']
    password = auth_values['password']
    validated = validate_username(username)

    if not validated:
        return {
            'auth': False,
            'error': 'Username already exists'
        }

    hashed_password = generate_password_hash(password, method='scrypt')
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return {'auth': True}

@auth.route('/login', methods=['POST'])
@cross_origin()
def login():
    auth_values = json.loads(request.data)
    username = auth_values['username']
    password = auth_values['password']
    user = User.query.filter_by(username=username).first()

    if user:
        if check_password_hash(user.password, password):
            login_user(user, remember=True)
            return {'auth': True}
        else:
            return {
                'auth': False,
                'error': 'Invalid password'
            }
    return {
        'auth': False,
        'error': 'Invalid username'
    }

@auth.route('/is_logged')
@cross_origin()
def is_logged():
    return {'is_logged': current_user.is_authenticated}

@auth.route('/logout')
@cross_origin()
@login_required
def logout():
    logout_user()
    return {'logged_out': True}