import os
from flask import Flask, send_from_directory, jsonify
from flask_migrate import Migrate
from flask_mail import Mail  # Clase Mail para inicialización
from dotenv import load_dotenv
from api.utils import APIException, generate_sitemap
from api.models import db
from api.admin import setup_admin
from api.commands import setup_commands

load_dotenv()

# Crear la aplicación Flask
app = Flask(__name__)

# Configuración del entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://") if db_url else "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
Migrate(app, db)

# Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)  # Instancia configurada de Flask-Mail

# Configurar administrador y comandos
setup_admin(app)
setup_commands(app)

# Registrar los blueprints después de la inicialización
from api.routes import api  # Importar después de inicializar mail
app.register_blueprint(api, url_prefix='/api')

# Manejo de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Ruta principal
@app.route('/')
def sitemap():
    return generate_sitemap(app) if ENV == "development" else send_from_directory(static_file_dir, 'index.html')

# Ruta para archivos estáticos
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    return send_from_directory(static_file_dir, path)

# Iniciar el servidor
if __name__ == '__main__':
    PORT = int(os.getenv('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
