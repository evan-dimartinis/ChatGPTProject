from flask import Flask, request
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

class Users(Resource):
    def get(self):
        print(request.body)
        return {'data': 'Evan'}, 200
    pass

    def post(self):
        print('uh what')
        print(request.args)
    pass
    
class Locations(Resource):
    # methods go here
    pass
    
api.add_resource(Users, '/login')  # '/users' is our entry point for Users
api.add_resource(Locations, '/locations')  # and '/locations' is our entry point for Locations

if __name__ == '__main__':
    app.run()