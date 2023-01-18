from flask import Blueprint
from flask_login import current_user

profile = Blueprint('profile', __name__)

@profile.route('/get-username')
def get_username():
    return {'username': current_user.username}