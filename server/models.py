from datetime import datetime, timezone
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    profile_picture = db.Column(db.String, default="")

    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan', lazy='joined')
    tournament_participants = db.relationship("TournamentParticipant", back_populates="user", cascade="all, delete-orphan", lazy='joined')

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "profile_picture": self.profile_picture
        }

class Game(db.Model):
    __tablename__ = 'games'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    background_img = db.Column(db.String)
    platforms = db.Column(db.String)
    genre = db.Column(db.String)
    release_date = db.Column(db.String)
    rating = db.Column(db.Integer)

    reviews = db.relationship('Review', back_populates='game', cascade='all, delete-orphan', lazy='joined')
    tournaments = db.relationship('Tournament', back_populates='game', cascade='all, delete-orphan', lazy='joined')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "background_img": self.background_img,
            "platforms": self.platforms,
            "genre": self.genre,
            "release_date": self.release_date,
            "rating": self.rating
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)

    user = db.relationship('User', back_populates='reviews', lazy='joined')
    game = db.relationship('Game', back_populates='reviews', lazy='joined')

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "rating": self.rating,
            "user": {
                "id": self.user.id,
                "name": self.user.name,
                "profile_picture": self.user.profile_picture
            } if self.user else None
        }

class Tournament(db.Model):
    __tablename__ = 'tournaments'
    
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    title = db.Column(db.String)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    game = db.relationship('Game', back_populates='tournaments', lazy='joined')
    tournament_participants = db.relationship("TournamentParticipant", back_populates="tournament", cascade="all, delete-orphan", lazy='joined')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at.isoformat(),
            "game": self.game.to_dict() if self.game else None,
            "participants": [{"id": participant.user.id, "name": participant.user.name} for participant in self.tournament_participants]
        }

class TournamentParticipant(db.Model):
    __tablename__ = 'tournament_participants'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournaments.id'), nullable=False)
    rank = db.Column(db.Integer)
    points = db.Column(db.Integer)

    user = db.relationship('User', back_populates='tournament_participants', lazy='joined')
    tournament = db.relationship('Tournament', back_populates='tournament_participants', lazy='joined')

    def to_dict(self):
        return {
            "id": self.id,
            "rank": self.rank,
            "points": self.points
        }
