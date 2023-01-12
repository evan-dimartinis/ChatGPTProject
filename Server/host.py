from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
from Queries import auth, quicklinks, requests

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def to_json(byteobject):
    return json.loads(byteobject.decode(encoding='utf-8', errors='strict'))


@app.route('/login', methods=['POST'])
def login_api():
    try:
        postdata = to_json(request.data)
        returnvalue = auth.AuthDB().log_in_user(postdata['username'], postdata['password'])
        print(returnvalue)
        return {"data": returnvalue[0]}, returnvalue[1]
    except:
        return "Internal Server Error", 500

@app.route('/autologin', methods=['GET'])
@cross_origin()
def autologin():
    try:
        token = request.headers.get('token')
        print(token)
        userid = auth.AuthDB().get_userid_with_token(token)
        if userid > 0:
            print('sending back a valid autologin')
            return {"valid": True}, 200
        else:
            return {"valid": False}, 200
    except:
        return "Internal Server Error", 500

@app.route('/quicklinks', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_quicklinks():
    try:
        token = request.headers.get('token')
        userid = auth.AuthDB().get_userid_with_token(token)
        if userid == 0:
            return {"error": "Invalid token"}, 401
        else:
            if request.method == "GET":
                rv = quicklinks.QuickLinks().get_user_quicklinks(userid)
            elif request.method == "POST":
                postdata = to_json(request.data)
                rv = quicklinks.QuickLinks().insert_quicklink(userid, postdata['label'], postdata['url'])
            elif request.method == "PUT":
                postdata = to_json(request.data)
                rv = quicklinks.QuickLinks().update_quicklink(userid, postdata['hmy'], postdata['label'], postdata['url'])
            elif request.method == "DELETE":
                postdata = to_json(request.data)
                rv = quicklinks.QuickLinks().delete_quicklink(postdata['hmy'], userid)
            if rv == False:
                return "Internal Server Error", 500
            else:
                return {"data": rv}, 200
    except (TypeError, NameError, SyntaxError) as err:
        print(err)
        return "Internal Server Error", 500

@app.route('/request', methods=['PUT', 'GET', 'POST', 'DELETE'])
def request_func():
    try:
        token = request.headers.get('token')
        userid = auth.AuthDB().get_userid_with_token(token)
        print(userid)
        if request.method == "PUT":
            data = to_json(request.data)
            rv = requests.Requests().insert_request(userid, data['label'], data['requesttext'])
        elif request.method == "GET":
            rv = requests.Requests().get_requests(userid)
        elif request.method == "POST":
            data = to_json(request.data)
            rv = requests.Requests().insert_request(userid, data['label'], data['requesttext'])
        elif request.method == "DELETE":
            data = to_json(request.data)
            rv = requests.Requests().delete_request(userid, data['hmy'])
        if rv == False or len(rv) == 0:
            return "Internal Server Error", 500
        else:
            return {"data", rv}, 200
    except Exception as err:
        print(err)
        return "Internal Server Error", 500

if __name__ == '__main__':
    app.run()