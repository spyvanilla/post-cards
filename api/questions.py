import json
from random import sample

from flask import Blueprint, request, jsonify
from flask_login import current_user
from flask_cors import cross_origin

from . import db
from .models import Question

questions = Blueprint('questions', __name__)

def serialize_subjects(subject):
    return {'subject': subject}

def serialize_questions(question):
    return {
        'id': question.id,
        'question': question.question,
        'answer': question.answer
    }

@questions.route('/submit-question', methods=['POST'], endpoint='submit_question')
@cross_origin()
def submit_question():
    data = json.loads(request.data)
    question = data['question']
    subject = data['subject']
    answer = data['answer']

    new_question = Question(user_id=current_user.id, question=question, subject=subject, answer=answer)
    db.session.add(new_question)
    db.session.commit()
    return {'submit': True}

@questions.route('/get-subjects', endpoint='get_subjects')
@cross_origin()
def get_subjects():
    questions = Question.query.filter_by(user_id=current_user.id).all()

    if questions:
        subjects = set([question.subject for question in questions])
        return jsonify([*map(serialize_subjects, subjects)])
    return jsonify([])

@questions.route('/get-questions-from-subject/<subject>', endpoint='get_questions_from_subject')
@cross_origin()
def get_questions_from_subject(subject: str):
    questions = Question.query.filter_by(user_id=current_user.id, subject=subject).all()

    if questions:
        return jsonify([*map(serialize_questions, sample(questions, len(questions)))])
    return jsonify([])

@questions.route('/get-question-by-id/<int:id>', endpoint='get_question_by_id')
@cross_origin()
def get_question_by_id(id: int):
    question = Question.query.filter_by(id=id, user_id=current_user.id).first()

    if question:
        return {
            'question': question.question,
            'answer': question.answer
        }
    return {'question': None}

@questions.route('/edit-question/<int:id>', methods=['POST'], endpoint='edit_question')
@cross_origin()
def edit_question(id: int):
    data = json.loads(request.data)
    subject = data['subject']
    question = data['question']
    answer = data['answer']

    edited_question = Question.query.filter_by(id=id).first()

    if edited_question:
        if edited_question.user_id != current_user.id:
            return {'edit': False}

        edited_question.subject = subject
        edited_question.question = question
        edited_question.answer = answer
        
        db.session.commit()
        return {'edit': True}

@questions.route('/delete-question/<int:id>', methods=['DELETE'], endpoint='delete_question')
def delete_question(id: int):
    question = Question.query.filter_by(id=id).first()

    if question:
        if question.user_id != current_user.id:
            return {'delete': False}

        db.session.delete(question)
        db.session.commit()
        return {'delete': True}