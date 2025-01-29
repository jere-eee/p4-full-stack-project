from app import app, db
from models import User,Review

with app.app_context():
    review_1 = Review(
        content="One of the very best games ever made.",
        rating=5,
        user_id=4,
        game_id=28
    )
    db.session.add(review_1)
    db.session.commit()