from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)
    
    # JWT setup
    jwt = JWTManager(app)

    # MongoDB setup
    mongo = MongoClient(app.config["MONGO_URI"])
    app.db = mongo.get_database()

    # Register routes
    from routes.threat_routes import threat_bp
    app.register_blueprint(threat_bp, url_prefix="/api/threats")

    from routes.ioc_routes import ioc_bp
    app.register_blueprint(ioc_bp, url_prefix="/api/ioc")

    from routes.incidents import incident_bp
    app.register_blueprint(incident_bp, url_prefix="/api/incidents")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
