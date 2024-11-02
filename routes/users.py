from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User
from utils.auth import token_required
from app import db

users_bp = Blueprint('users', __name__)

@users_bp.route('/api/users', methods=['GET'])
@token_required
def get_users(current_user):
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'fullname': user.fullname,
        'email': user.email,
        'phone': user.phone,
        'status': user.status
    } for user in users])