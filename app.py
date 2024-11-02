from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql
from config import Config

# Configure PyMySQL
pymysql.install_as_MySQLdb()

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Load configuration
app.config.from_object(Config)

# Initialize database
db = SQLAlchemy(app)

# Import routes after db initialization to avoid circular imports
from routes import auth_bp, users_bp, transactions_bp, wallets_bp

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(users_bp)
app.register_blueprint(transactions_bp)
app.register_blueprint(wallets_bp)

if __name__ == '__main__':
    with app.app_context():
        # Import models here to ensure they're registered with SQLAlchemy
        from models.user import User
        from models.ly_models import LyUser, LyUserBank, LyUserTotal
        
        try:
            # Test database connection
            db.engine.connect()
            print("Successfully connected to database!")
            
            # Create all tables
            db.create_all()
            print("Tables created successfully!")
            
            # Create initial admin user if not exists
            from werkzeug.security import generate_password_hash
            admin_username = 'admin'
            if not User.query.filter_by(username=admin_username).first():
                admin = User(
                    username=admin_username,
                    password=generate_password_hash('admin123'),
                    fullname='Admin User',
                    email='admin@example.com',
                    phone='1234567890',
                    status='active'
                )
                db.session.add(admin)
                db.session.commit()
                print("Admin user created successfully!")
            
            # Start the application
            app.run(debug=True, host='0.0.0.0', port=5000)
            
        except Exception as e:
            print(f"Error starting application: {str(e)}")