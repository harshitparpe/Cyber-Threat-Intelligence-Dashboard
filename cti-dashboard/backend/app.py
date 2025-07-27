from flask import Flask
from flask_cors import CORS                      # Handles Cross-Origin Resource Sharing
from flask_jwt_extended import JWTManager        # JWT auth support
from pymongo import MongoClient                  # MongoDB client
from config import Config                        # App config class

def create_app():
    app = Flask(__name__)                        # Create Flask app instance
    app.config.from_object(Config)               # Load config from Config class

    CORS(app)                                    # Enable CORS for frontend-backend communication

    app.config["JWT_SECRET_KEY"] = "WVZjZ1cTFRfXQIg+MwGoHY44RZSwnQCelJN5FtVkFOFDZAUP09YKK+YUOR0/rMFX"
    jwt = JWTManager(app)                        # Initialize JWT for auth

    # mongo = MongoClient("mongodb://localhost:27017/cti_dashboard")  # Connect to MongoDB
    # app.db = mongo.get_database()                # Attach DB instance to app

    mongo = MongoClient("mongodb://localhost:27017/")
    app.db = mongo["cti_dashboard"]


    # Import and register route blueprints
    from routes.threat_routes import threat_bp
    from routes.ioc_routes import ioc_bp as ioc_main_bp
    from routes.incidents import incident_bp
    from routes.auth_routes import auth_bp
    from routes.threat_stats import threat_stats_bp
    from routes.threat_map import map_bp
    from routes.ioc_lookup import ioc_bp as ioc_lookup_bp
    from routes.ioc_history_routes import ioc_bp as ioc_history_bp

    app.register_blueprint(threat_bp, url_prefix="/api/threats")       # Threat feed routes
    app.register_blueprint(ioc_main_bp, url_prefix="/api/ioc")         # IOC routes (basic)
    app.register_blueprint(incident_bp, url_prefix="/api/incidents")   # Incident reporting
    app.register_blueprint(auth_bp, url_prefix="/api/auth")            # Auth (login/register)
    app.register_blueprint(threat_stats_bp, url_prefix="/api/stats")   # Stats for dashboard
    app.register_blueprint(map_bp, url_prefix="/api/map")              # Threat map routes
    app.register_blueprint(ioc_lookup_bp)                              # AbuseIPDB IOC lookup
    app.register_blueprint(ioc_history_bp)                             # Save/fetch IOC history

    return app

if __name__ == "__main__":
    app = create_app()                         # Create app instance
    app.run(debug=True)                        # Run dev server with debug on
