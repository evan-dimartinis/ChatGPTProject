from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
import json

app = Flask(__name__)
api = Api(app)

def to_json(byteobject):
    return json.loads(byteobject.decode(encoding='utf-8', errors='strict'))

class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (bytes, bytearray)):
            return obj.decode("ASCII") # <- or any other encoding of your choice
        # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)

class Users(Resource):
    def get(self):
        print(request.body)
        return {'data': 'Evan'}, 200
    pass

    def post(self):
        x = to_json(request.data)
        print(x)
        print(x['username'])
        return {"Evan": "DiMar"}, 200
    pass
    
class Locations(Resource):
    # methods go here
    pass
    
api.add_resource(Users, '/login')  # '/users' is our entry point for Users
api.add_resource(Locations, '/locations')  # and '/locations' is our entry point for Locations

if __name__ == '__main__':
    app.run()