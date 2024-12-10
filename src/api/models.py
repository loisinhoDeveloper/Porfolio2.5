

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    

class MensajeCorreo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)  # Nombre del remitente
    email = db.Column(db.String(120), nullable=False)  # Email del remitente
    contenido = db.Column(db.Text, nullable=False)  # Contenido del mensaje db.Text para mensajes largos en lugar de db.String(500)
    
    def __repr__(self):
        return f'<MensajeCorreo {self.nombre} - {self.email}>'
    
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre":self.nombre,
            "email": self.email,
            "contenido": self.contenido
        }
# Esta clase MensajeCorreo tiene campos como nombre, email, y contenido que corresponden con los campos del formulario.