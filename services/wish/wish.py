from flask import Flask, request
import driver as dynamodb
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/wish/<string:email>', methods=['GET'])
def get_wish(email):
    response = dynamodb.read_from_db(email)
    if (response['ResponseMetadata']['HTTPStatusCode'] == 200):
        if ('Item' in response):
            return { 'Item': response['Item'] }
        return { 'msg' : 'Item not found!' }
    return {
        'msg': 'Some error occured',
        'response': response
    }

@app.route('/wish', methods=['POST'])
def add_wish():
    data = request.get_json()
    response = dynamodb.add_to_wish(data["email"], data["product"])
    if (response['ResponseMetadata']['HTTPStatusCode'] == 200):
        return {
            'msg': 'Added successfully',
        }
    return {  
        'msg': 'Some error occcured',
        'response': response
    }

app.run(host='0.0.0.0', port=2001, debug=True)