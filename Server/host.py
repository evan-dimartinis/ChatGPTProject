from flask import Flask, request
from flask_cors import CORS
import json
from Queries import auth, quicklinks

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

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
def autologin():
    try:
        token = request.headers.get('token')
        userid = auth.AuthDB().get_userid_with_token(token)
        if userid > 0:
            return {"valid": True}, 200
        else:
            return {"valid": False}, 200
    except:
        return "Internal Server Error", 500

@app.route('/quicklinks', methods=['GET'])
def get_quicklinks():
    try:
        userid = auth.AuthDB().get_userid_with_token()
        if userid == 0:
            return {"error": "Invalid token"}, 401
        else:
            rv = quicklinks.QuickLinks().get_user_quicklinks(userid)
            return {"data": rv}, 200
    except any as err:
        print(err)
        return "Internal Server Error", 500

@app.route('/addquicklink', methods=['POST'])
def add_quicklink():
    try:
        token = request.headers.get('token')
        userid = auth.AuthDB().get_userid_with_token(token)
        rv = quicklinks.QuickLinks().insert_quicklink(userid, request.data.label, request.data.url)
        if rv is False:
            return "Internal Server Error", 500
        else:
            return {"data": rv}, 200
    except any as err:
        print(err)
        return "Internal Server Error", 500

if __name__ == '__main__':
    app.run()