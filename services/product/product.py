from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from sqlalchemy.dialects.mysql import LONGTEXT

from os import environ

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL') or 'mysql+mysqlconnector://admin:password@cloud-project-group-4-rds.czyij3y6e1ff.us-east-1.rds.amazonaws.com:3306/project'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}
 
db = SQLAlchemy(app)

class Product(db.Model):
    __tablename__ = 'products'
    Id = db.Column(db.Integer, primary_key=True)
    Company = db.Column(db.String(200), nullable=False)
    Name = db.Column(db.String(200), nullable=False)
    Description = db.Column(LONGTEXT, nullable=False)
    Image = db.Column(db.String(200), nullable=False)
    Price = db.Column(db.Float, nullable=False)
    Stock = db.Column(db.Integer, nullable=False)

    def __init__(self, Id, Company, Name, Description, Image, Price, Stock):
        self.Id = Id
        self.Company = Company
        self.Name = Name
        self.Description = Description
        self.Image = Image
        self.Price = Price
        self.Stock = Stock

    def json(self):
        return {
            "Id" : self.Id,
            "Company" : self.Company,
            "Name" : self.Name,
            "Description" : self.Description,
            "Image" : self.Image,
            "Price" : self.Price,
            "Stock" : self.Stock
        }

@app.route("/products/")
def get_products():
    productlist = Product.query.all()
    if len(productlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "product": [product.json() for product in productlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no products."
        }
    ), 404


app.run(host='0.0.0.0', port=5001, debug=True)