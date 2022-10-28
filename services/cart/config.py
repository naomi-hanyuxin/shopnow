from os import environ

AWS_ACCESS_KEY_ID = environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = environ.get('AWS_SECRET_ACCESS_KEY')
REGION_NAME = environ.get('REGION_NAME')
DATABASE_TABLE = environ.get('DATABASE_TABLE')