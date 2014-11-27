#!/usr/bin/env python

from flask import Flask, request
from password import generate

app = Flask(__name__)

@app.route('/generatePassword', methods=['POST'])
def generatePassword():
    domain = request.form['domain']
    password = request.form['password']
    length = request.form['length']
    if length:
        result = generate(domain, password, length)
    else:
        result = generate(domain, password)
    return result

if __name__=="__main__":
    app.run()
