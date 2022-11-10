from . import db

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)