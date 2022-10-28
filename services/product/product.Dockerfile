FROM python:3-slim
WORKDIR /product
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./product.py ./
CMD [ "python", "./product.py" ]