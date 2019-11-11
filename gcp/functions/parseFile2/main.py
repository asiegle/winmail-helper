from flask import Flask, request, jsonify
import tnefparse
from tnefparse import TNEF
import base64
from google.cloud import pubsub_v1
import requests 
from compressed_rtf import compress, decompress

#import pandoc

def parseFile(request):
	data = request.data
	with open("/tmp/data.dat","wb") as f:
		f.write(base64.urlsafe_b64decode(data))
	with open("/tmp/data.dat","rb") as tneffile:
		tnefParse = TNEF(tneffile.read())

	if (tnefParse.htmlbody == None):
		if (tnefParse.rtfbody != None):
			#doc = pandoc.Document("/tmp/temp")
			#doc.rtf = tnefParse.rtfbody;
			#response = jsonify({"html":doc.html5})
			temp = tnefParse.rtfbody.decode()
			sendbod2 = ''.join(str(s) for s in temp)
			sendbod = sendbod2.rstrip('\r').rstrip('\n')
			#sendbod = temp
			#temp = decompress(tnefParse.rtfbody)
			#print(temp)
			#for x in temp:
			#	sendbod += str(x)
			print(sendbod)
			
			#sendData = {"headers": {'Accept': '*/*', 'Content-Type': 'text/plain'},"body":sendbod}

			url1 = "https://us-central1-igneous-sweep-257100.cloudfunctions.net/rtfConvert2"
			r = requests.post(url = url1, json = {"body":sendbod})
			#publisher = pubsub_v1.PublisherClient()
			#topic_path = publisher.topic_path("igneous-sweep-257100", "rtf-HTML")
			#future = publisher.publish(topic_path, data=tnefParse.rtfbody)
			#print(future.result())
			trunc = r.text.split("\n",1)[1];
			response = jsonify({"rtf": trunc})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		else:
			response = jsonify({"html":tnefParse.body})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response


	
	#strData = tnefParse.htmlbody#.decode('windows-1252')
	#strData = tnefParse.htmlbody.decode('latin-1', 'replace')
	#strData = tnefParse.htmlbody.decode('raw_unicode_escape')
	# strData = base64.b64encode(tnefParse.htmlbody)
	
	#strData = html.unescape(tnefParse.htmlbody)
	response = jsonify({"html":tnefParse.htmlbody})
	# response = jsonify(html=tnefParse.htmlbody)
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response