FROM python:3-slim
WORKDIR /cart
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./cart.py ./driver.py ./config.py ./
CMD [ "python", "./cart.py" ]