from datetime import datetime, timezone
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    profile_picture = db.Column(db.String, default="")
    
    serialize_rules = ('-reviews.user', '-_password_hash', '-tournament_participants.user',)
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password)
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    tournament_participants = db.relationship("TournamentParticipant", back_populates="user", cascade="all, delete-orphan")
    tournaments = association_proxy("tournament_participants", "tournament", creator=lambda tournament_obj: TournamentParticipant(tournament=tournament_obj))
    
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    background_img = db.Column(db.String)
    platforms = db.Column(db.String)
    genre = db.Column(db.String)
    release_date = db.Column(db.String)
    rating = db.Column(db.Integer)
    
    serialize_rules = ('-reviews.game',)
    
    reviews = db.relationship('Review', back_populates='game', cascade='all, delete-orphan')
    tournaments = db.relationship('Tournament', back_populates='game', cascade='all, delete-orphan')
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    
    serialize_rules = ('-user.reviews', '-game.reviews')
    
    user = db.relationship('User', back_populates='reviews')
    game = db.relationship('Game', back_populates='reviews')
    
class Tournament(db.Model, SerializerMixin):
    __tablename__ = 'tournaments'
    
    serialize_rules = ('-game.tournaments', '-users.tournaments', '-tournament_participants.tournament',)
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    title = db.Column(db.String)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    
    game = db.relationship('Game', back_populates='tournaments')
    tournament_participants = db.relationship("TournamentParticipant", back_populates="tournament", cascade="all, delete-orphan")
    users = association_proxy("tournament_participants", "user", creator=lambda user_obj: TournamentParticipant(user=user_obj))

    
class TournamentParticipant(db.Model, SerializerMixin):
    __tablename__ = 'tournament_participants'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournaments.id'), nullable=False)
    rank = db.Column(db.Integer)
    points = db.Column(db.Integer)
    
    user = db.relationship('User', back_populates='tournament_participants')
    tournament = db.relationship('Tournament', back_populates='tournament_participants')