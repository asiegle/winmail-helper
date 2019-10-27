from flask import Flask, request, jsonify
from tnefparse import TNEF
import base64

app = Flask(__name__)


@app.route("/",methods=["POST"])
def readFile():
	return "works"

@app.route("/kek",methods=["GET"])
def printkek():
    with open("winmail.dat","rb") as tneffile:
        tnefobj = TNEF(tneffile.read())
        return tnefobj.htmlbody

@app.route("/parse",methods=["POST"])
def parseFile():
	data = request.data
	with open("data.dat","wb") as f:
		f.write(base64.urlsafe_b64decode(data))
	with open("data.dat","rb") as tneffile:
		tnefParse = TNEF(tneffile.read())

	response = jsonify({"html":tnefParse.htmlbody})
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response

if __name__=="__main__": app.run(host='0.0.0.0', port=42069)
