from flask import Flask, request
from flask_cors import CORS
import json
from Queries import auth

app = Flask(__name__)
CORS(app)

def to_json(byteobject):
    return json.loads(byteobject.decode(encoding='utf-8', errors='strict'))


@app.route('/login', methods=['GET', 'POST'])
def login_api():
    print(request.data)
    result = {
    'received_data': 'x',
    'message': 'Success'
    }
    print('returning now')
    return json.dumps(result)

""" class Users(Resource):
    def get(self):
        print(request.body)
        return {'data': 'Evan'}, 200
    pass

    def post(self):
        x = to_json(request.data)
        try:
            x = auth.AuthDB().log_in_user(x['username'], x['password'])
            data = {
                "token": str(x)
            }
            return data, 200
        except TypeError as err:
            print(err)
            return {"error": "Could not login user"}, 500
    pass
    
class Locations(Resource):
    # methods go here
    pass """
    
#api.add_resource(Users, '/login')  # '/users' is our entry point for Users
#api.add_resource(Locations, '/locations')  # and '/locations' is our entry point for Locations

if __name__ == '__main__':
    app.run()