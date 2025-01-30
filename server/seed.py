from app import app, db
from models import User,Review, Tournament

with app.app_context():
    tournament_1 = Tournament(
        title="RDR2 Bounty Tournament",
        game_id=28,
        description="Race against opponents to the bounty. Only melee weapons allowed.",
    )
    db.session.add(tournament_1)
    db.session.commit()