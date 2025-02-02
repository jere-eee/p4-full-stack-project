from sqlalchemy.exc import IntegrityError
from config import app, db, api
from flask import make_response, request, session
from flask_restful import Resource
import requests

from models import User, Game, Review, Tournament, TournamentParticipant

RAWG_API_KEY = "fabf6239dad644d3b7e03cf15c39ac78"

class Signup(Resource):
    def post(self):
        data = request.get_json()
        
        print("Received data:", data)
        
        user = User(
            name=data.get('name'), 
            email=data.get('email'),
            profile_picture=data.get('profile_picture')
        )
        
        user.password_hash = data.get('password')
        
        try:
            db.session.add(user)
            db.session.commit()
            
            session['user_id'] = user.id
            print(session)
            return make_response(user.to_dict(), 201)
        except Exception:
            return make_response({"Error": "Error signing up. Check credentials."}, 422)
        
class CheckSession(Resource):
    def get(self):
        print(session)
        if session.get('user_id'):
            return User.query.filter_by(id=session['user_id']).first().to_dict(), 200
        return {"Error message": "401 Unauthorized"}, 401
    
class Logout(Resource):
    def delete(self):
        if session['user_id']:
            session.pop('user_id', None)
            return {}, 204
        return {"Error": "401 Unauthorized"}, 401
    
class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.email==data.get('email')).first()
        if user and user.authenticate(data.get('password')):
            session['user_id'] = user.id
            return user.to_dict(), 200    
        return {"Error": "401 Unauthorized"}, 401
    
class Games(Resource):
    def get(self):
        games_present = Game.query.all()
        if not games_present:
            response = requests.get(f"https://api.rawg.io/api/games?key={RAWG_API_KEY}&page_size=50")
            print(response)
            if response.ok:
                games_data = response.json()["results"]
                for game in games_data:
                    existing_game = Game.query.filter_by(id=game["id"]).first()
                    if not existing_game:
                        new_game = Game(
                            id=game["id"],
                            title=game["name"],
                            background_img=game['background_image'],
                            platforms=", ".join([p["platform"]["name"] for p in game["platforms"]]),
                            genre=", ".join([g["name"] for g in game["genres"]]),
                            release_date=game.get("released", "N/A"),
                            rating=game['rating']
                        )  
                        db.session.add(new_game)
                db.session.commit()
                all_games = Game.query.all()
                return make_response([g.to_dict() for g in all_games], 200)
            return {"error": "Failed to fetch games from RAWG"}, 500
        return make_response([g.to_dict() for g in games_present], 200)

class GameById(Resource):
    def get(self, id):
        game = Game.query.filter_by(id=id).first()
        if game:
            return make_response(game.to_dict(), 200)
        return {"Error": "Game not found"}, 404
    
class GameReviews(Resource):
    def get(self, id):
        reviews = Review.query.filter(Review.game_id==id).all()
        if reviews:
            return make_response([r.to_dict() for r in reviews], 200)
        return {"Error": "Game reviews not found"}, 404
    
    def post(self, id):
        data = request.get_json()
        
        review = Review(
            content = data.get('content'),
            rating = data.get('rating'),
            user_id = data.get('user_id'),
            game_id = id
        )
        
        try:
            db.session.add(review)
            db.session.commit()
            
            return make_response(review.to_dict(), 201)
        except Exception:
            return make_response({"Error": "Error making review."}, 422)
        
class ReviewById(Resource):
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(review, attr, request.json[attr])
            
        db.session.add(review)
        db.session.commit()
        
        return make_response(
            review.to_dict(),
            200
        )
        
    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        db.session.delete(review)
        db.session.commit()
        return make_response({"Message": "Successfully deleted review."}, 204)
    
class Tournaments(Resource):
    def get(self):
        tournaments = Tournament.query.all()
        if tournaments:
            return make_response([t.to_dict() for t in tournaments], 200)
        return make_response({"Error": "No tournaments found."}, 404)
    
class TournamentParticipants(Resource):
    def post(self):
        data = request.get_json()
        tournament_participant = TournamentParticipant(
            user_id = data.get('user_id'),
            tournament_id = data.get('tournament_id'),
            rank = data.get('rank'),
            points = data.get('points')
        )
        try:
            db.session.add(tournament_participant)
            db.session.commit()
            
            return make_response(tournament_participant.to_dict(), 201)
        except Exception:
            return make_response({"Error": "Error adding participant."}, 422)
        
class TournamentParticipantById(Resource):
    def delete(self, id):
        participant = TournamentParticipant.query.filter_by(user_id=id).first()
        db.session.delete(participant)
        db.session.commit()
        return make_response({"Message": "Successful delete"}, 204) 

class UserById(Resource):
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response({"Message": "User deleted."}, 204)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(user, attr, request.json[attr])
            
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)
    
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Games, '/games', endpoint='games')
api.add_resource(GameById, '/game/<int:id>', endpoint='game/[id]')
api.add_resource(GameReviews, '/game/<int:id>/reviews', endpoint='game/[id]/reviews')
api.add_resource(ReviewById, '/reviews/<int:id>', endpoint='reviews/[id]')
api.add_resource(Tournaments, '/tournaments', endpoint='tournaments')
api.add_resource(TournamentParticipants, '/tournament_participants', endpoint='tournament_participants')
api.add_resource(TournamentParticipantById, '/tournament_participants/<int:id>', endpoint='tournament_participant/[id]')
api.add_resource(UserById, '/users/<int:id>', endpoint='users/[id]')

if __name__ == '__main__':
    app.run(port=5000, debug=True)