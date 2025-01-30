from app import app, db
from models import User,Review, Tournament, TournamentParticipant

with app.app_context():
    TournamentParticipant.query.delete()
    
    tournament_2 = Tournament(
        title="Little Nightmares marathon",
        game_id=41,
        description="First to complete as many checkpoints within the timeframe wins.",
    )
    db.session.add(tournament_2)
    db.session.commit()