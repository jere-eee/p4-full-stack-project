from sqlalchemy.exc import IntegrityError
from config import app, db, api
from flask import make_response, request, session
from flask_restful import Resource

from models import User


class Signup(Resource):
    def post(self):
        data = request.get_json()
        
        user = User(
            name=data.get('name'), 
            email=data.get('email'),
            profile_picture=data.get('profile_picture')
        ),
        
        user.password_hash = data.get('password')
        
        try:
            db.session.add(user)
            db.session.commit()
            
            session['user_id'] = user.id
            
            return make_response(user.to_dict(), 201)
        except IntegrityError:
            return make_response({"Error": "Error signing up. Check credentials."}, 422)

api.add_resource(Signup, '/signup', endpoint='signup')
if __name__ == '__main__':
    app.run(port=5000, debug=True)