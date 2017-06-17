from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.run(debug=True, port=4200, host="0.0.0.0")

db = SQLAlchemy(app)
db.engine.execute(text("""SET SCHEMA HPI_2017;"""))


@app.route("/")
def hello():
    from sqlalchemy import text

    sql = text("""SELECT "VALUE" FROM "HPI_2017"."DATAPOINTS" WHERE "KEY" = 'CALORIES' LIMIT 10""")
    result = db.engine.execute(sql)
    names = []
    for row in result:
        names.append(row[0])
    return str(names)