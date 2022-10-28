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


items = db.Table('item',
                    db.Column('orderid', db.Integer, db.ForeignKey('order.Id')),
                    db.Column('productid', db.Integer, db.ForeignKey('products.Id'))
                    ,schema='project')


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

class Order(db.Model):
    __tablename__ = 'order'
    Id = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(200), nullable=False)
    Products = db.relationship('Product', secondary=items, backref='orders')

    def __init__(self, Email):
        self.Email = Email

    def json(self):
        return {
            "Id" : self.Id,
            "Email" : self.Email,
            "Products" : [product.json() for product in self.Products]
        }

class Items(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)
    orderid = db.Column(db.Integer, db.ForeignKey('order.Id'))
    productid = db.Column(db.Integer, db.ForeignKey('products.Id'))



@app.route("/order/<int:id>")
def get_order_by_id(id):
    order = Order.query.get(id)
    if order:
        return jsonify(
            {
                "code": 200,
                "data": order.json()
            }
        )
    return {
        "msg" : "Not Found"
    }

@app.route("/orders/<string:email>")
def get_orders_by_email(email):
    orders = Order.query.with_entities(Order.Id, Order.Email).filter(Order.Email == email).all()
    if len(orders) > 0:
        return jsonify(
            {
                "code": 200,
                "data": [dict(d) for d in orders]
            }
        )
    return {
        "msg" : "Not Found"
    }

@app.route("/order", methods=['POST'])
def add_orders():
    data = request.get_json()
    order = Order(data["email"])
    db.session.add(order)
    db.session.commit()

    print(order.Id)
    for product in data["products"]:
        db.session.add(Items(orderid=order.Id, productid=product['Id']))
        db.session.commit()

    return {
        "msg" : "Added successfully"
    }
app.run(host='0.0.0.0', port=3001, debug=True)