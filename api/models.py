from . import db

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String, nullable=False)
    subject = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)