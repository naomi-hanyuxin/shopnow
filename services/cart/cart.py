from flask import Flask, request
import driver as dynamodb
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/cart/<string:email>', methods=['GET'])
def get_cart(email):
    response = dynamodb.read_from_db(email)
    if (response['ResponseMetadata']['HTTPStatusCode'] == 200):
        if ('Item' in response):
            if response['Item']['cart']:
                response['Item']['numOfItems'] = len(response['Item']['cart'])
            else:
                response['Item']['numOfItems'] = 0
            return { 'Item': response['Item'] }
        return { 'msg' : 'Item not found!' }
    return {
        'msg': 'Some error occured',
        'response': response
    }

@app.route('/cart', methods=['POST'])
def add_cart():
    data = request.get_json()
    response = dynamodb.add_to_cart(data["email"], data["product"])
    if (response['ResponseMetadata']['HTTPStatusCode'] == 200):
        return {
            'msg': 'Added successfully',
        }
    return {  
        'msg': 'Some error occcured',
        'response': response
    }

@app.route('/empty', methods=['POST'])
def empty_cart():
    data = request.get_json()
    response = dynamodb.delete_from_db(data["email"])
    return {
        'msg' : "Successfully executed"
    }

app.run(host='0.0.0.0', port=4001, debug=True)