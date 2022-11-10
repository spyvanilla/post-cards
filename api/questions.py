import json

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from . import db
from .models import Question

questions = Blueprint('questions', __name__)

def serialize_subjects(subject):
    return {'subject': subject}

@questions.route('/submit-question', methods=['POST'])
@cross_origin
def submit_question():
    data = json.loads(request.data)
    question = data['question']
    subject = data['subject']
    answer = data['answer']

    new_question = Question(question=question, subject=subject, answer=answer)
    db.session.add(new_question)
    db.session.commit()
    return {'submit': True}

@questions.route('/get-subjects')
@cross_origin
def get_subjects():
    questions = Question.query.all()

    if questions:
        subjects = set([question.subject for question in questions])
        return jsonify([*map(serialize_subjects, subjects)])
    return jsonify([])