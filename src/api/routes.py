#las rutas de la API, donde se reciben las solicitudes del front-end y se gestionan.


from flask import Blueprint, jsonify, request, current_app
from flask_mail import Message
from api.models import db
from flask_cors import CORS
import os

api = Blueprint('api', __name__)

# Permitir solicitudes CORS: Permite que las solicitudes desde el front-end (React) puedan interactuar con el back-end Flask, incluso si están en dominios diferentes.
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200



#Recibe los datos del formulario (nombre, email, contenido) en formato JSON desde el front-end. Luego, utiliza Flask-Mail para enviar el correo electrónico.
@api.route('/api/enviarEmail', methods=['POST'])
def enviarEmail():
    data = request.get_json()

    if not data or 'email' not in data or 'contenido' not in data:
        return jsonify({'error': 'Faltan datos para enviar el correo'}), 400

    msg = Message(
        subject='Nuevo mensaje de contacto',
        recipients=[os.getenv('MAIL_USERNAME')],  # Destinatario (desde el .env)
        body=data['contenido'],  # Contenido del mensaje
        sender=data['email']  # Dirección del remitente
    )

    try:
        mail = current_app.extensions['mail']  # Obtener mail desde el contexto de la app
        mail.send(msg)
        return jsonify({'message': 'Correo enviado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
