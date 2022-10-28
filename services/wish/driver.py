'''
This file consists of all the functions that are used to interact with the database.
It also consists of the code needed to connect to the dynamoDB database using the
configurations set in config.py file.
'''

from boto3 import resource
import config
import json
from decimal import Decimal
import botocore

AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY
REGION_NAME = config.REGION_NAME
DATABASE_TABLE = config.DATABASE_TABLE

resource = resource(
    'dynamodb',
    aws_access_key_id     = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
    region_name           = REGION_NAME
)

DbTable = resource.Table(DATABASE_TABLE)

def read_from_db(email):
    response = DbTable.get_item(
        Key = {
            'email'     : email
        },
        AttributesToGet = [
            "email", "wishlist" # valid types dont throw error, 
        ]                      # Other types should be converted to python type before sending as json response
    )
    return response

def delete_from_db(email):
    response = DbTable.delete_item(
        Key = {
            'email': email
        }
    )

    return response

def add_to_wish(email, product:dict):
    response = ""
    try:
        response = DbTable.put_item(
            Item = {
                'email'     : email
            },
            ConditionExpression = "attribute_not_exists(email)"
        )
    except botocore.exceptions.ClientError as e:
    # Ignore the ConditionalCheckFailedException, bubble up
    # other exceptions.
        pass
    product = json.loads(json.dumps(product), parse_float=Decimal)
    response = DbTable.update_item(
        Key = {
            'email': email
        },
        UpdateExpression= "SET wishlist = list_append(if_not_exists(wishlist, :empty_list), :vals)",
        ExpressionAttributeValues= {
            ":vals": [product],
            ":empty_list": []
        },
        ReturnValues= 'ALL_NEW'
    )

    return response