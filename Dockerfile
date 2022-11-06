FROM python:3.9-slim
WORKDIR /services
RUN pip install pytest
COPY ./wish.py ./driver.py ./config.py ./
CMD [ "python"]