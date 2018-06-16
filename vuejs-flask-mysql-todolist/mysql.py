from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root1'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'db_tasks'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
CORS(app)


@app.route('/api/tasks', methods=['GET'])
def get_all_tasks():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM db_tasks.tasks")
    rv = cur.fetchall()
    return jsonify(rv)


@app.route('/api/task', methods=['POST'])
def add_task():
    cur = mysql.connection.cursor()
    title = request.get_json()['title']

    cur.execute("INSERT INTO db_tasks.tasks (title) VALUES ('" + str(title) +
                "')")
    mysql.connection.commit()

    result = {'title': title}

    return jsonify({'result': result})


@app.route('/api/task/<id>', methods=['PUT'])
def update_task(id):
    cur = mysql.connection.cursor()
    title = request.get_json()['title']

    cur.execute("UPDATE db_tasks.tasks SET title = '" + str(title) +
                "' where id = " + id)
    mysql.connection.commit()

    result = {'title': title}

    return jsonify({'result': result})


@app.route('/api/task/<id>', methods=['DELETE'])
def delete_task(id):
    cur = mysql.connection.cursor()
    response = cur.execute("DELETE FROM db_tasks.tasks where id = " + id)
    mysql.connection.commit()

    if response > 0:
        result = {'message': 'record deleted'}
    else:
        result = {'message': 'no record found'}

    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(debug=True)