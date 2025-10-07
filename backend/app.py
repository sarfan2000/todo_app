from flask import Flask
from flask_cors import CORS
from extensions import db
from config import Config
from routes import main_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app)
app.register_blueprint(main_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
