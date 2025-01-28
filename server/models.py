from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    profile_picture = db.Column(db.String, default="")
    
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password)
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    background_img = db.Column(db.String)
    platforms = db.Column(db.String)
    genre = db.Column(db.String)
    release_date = db.Column(db.String)
    rating = db.Column(db.Integer)