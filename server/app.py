from config import app, db, api
from flask import make_response, request, session
from flask_restful import Resource


if __name__ == '__main__':
    app.run(port=5000, debug=True)