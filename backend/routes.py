from flask import Blueprint, request, jsonify
from models import Task_TODO
from extensions import db
from datetime import datetime

main_bp = Blueprint('main', __name__)

@main_bp.route('/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = Task_TODO.query.filter_by(completed=False).order_by(Task_TODO.created_at.desc()).limit(5).all()
        return jsonify([
            {'id': t.id, 'title': t.title, 'description': t.description}
            for t in tasks
        ]), 200
    except Exception as e:
        print("Error fetching tasks:", e)
        return jsonify({'error': str(e)}), 500

@main_bp.route('/tasks', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        if not data or 'title' not in data or 'description' not in data:
            return jsonify({'error': 'Invalid data'}), 400

        task = Task_TODO(
            title=data['title'],
            description=data['description'],
            completed=False,
            created_at=datetime.utcnow()
        )
        db.session.add(task)
        db.session.commit()

        return jsonify({
            'id': task.id,
            'title': task.title,
            'description': task.description
        }), 201

    except Exception as e:
        print("Error creating task:", e)
        return jsonify({'error': str(e)}), 500

@main_bp.route('/tasks/<int:task_id>/complete', methods=['PUT'])
def complete_task(task_id):
    try:
        task = Task_TODO.query.get_or_404(task_id)
        task.completed = True
        db.session.commit()
        return jsonify({'message': 'Task completed'}), 200
    except Exception as e:
        print("Error completing task:", e)
        return jsonify({'error': str(e)}), 500
