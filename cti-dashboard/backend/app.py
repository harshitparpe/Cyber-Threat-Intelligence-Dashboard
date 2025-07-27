from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    # Setup JWT
    jwt = JWTManager(app)

    # Connect to MongoDB
    mongo = MongoClient("mongodb://localhost:27017/")
    app.db = mongo.get_database("cti_dashboard")

    # Register Blueprints
    from routes.auth_routes import auth_bp
    from routes.ioc_routes import ioc_bp
    from routes.threat_routes import threat_bp
    from routes.threat_map import map_bp
    from routes.threat_stats import threat_stats_bp
    from routes.ioc_lookup import ioc_lookup_bp
    from routes.ioc_history_routes import ioc_history_bp
    from routes.incident_routes import incident_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(ioc_bp, url_prefix="/api/ioc")
    app.register_blueprint(threat_bp, url_prefix="/api/threats")
    app.register_blueprint(map_bp, url_prefix="/api/map")
    app.register_blueprint(threat_stats_bp, url_prefix="/api/stats")
    app.register_blueprint(ioc_lookup_bp)
    app.register_blueprint(ioc_history_bp)
    app.register_blueprint(incident_bp, url_prefix="/api/incidents")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
