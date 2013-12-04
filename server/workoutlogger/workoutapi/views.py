from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
import json
from django.core.context_processors import csrf
from django.shortcuts import render_to_response
from django.core import serializers



def jsonResponse(success, data):
	response = {}
	if success:
		response['response'] = success
		response['data'] = data
	else:
		response['response'] = success
		response['error'] = data

	# res.headers.add("Access-Control-Allow-Origin", "*, ");
 #  res.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
 #  res.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

 	if success != "token":
		httpResponse = HttpResponse(json.dumps(response), content_type="application/json")
	else:
		httpResponse = HttpResponse(data)

	httpResponse['Access-Control-Allow-Origin'] = "*"
	httpResponse['Access-Control-Allow-Methods'] = "POST, GET, OPTIONS"
	httpResponse['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
	return httpResponse


def index(request):
	return jsonResponse(False, "invalid API call")

def get_token(request):
	print("get_token")
	c = {}
	c.update(csrf(request))
	theToken = unicode(c['csrf_token'])
	print("token:" + theToken)
	return jsonResponse("token", theToken)


def login_user(request):
	try:
		# print "login_user, username: " + username
		# print("request: ")
		# print request.POST
		# postVars = request.POST
		# print request.body
		# print request.request
		# for key in request:
		# 	print key, 'corresponds to', request[key]
		# print "sup"

		# username = request.POST.get("username")
		# password = request.POST.get("password")
		# print username
		# print "request.body: " + request.body
		jsonLogin = json.loads(request.body)
		# print "jsonLogin: " + str(jsonLogin)
		
		# print 'login_user, username=' + username
		user = authenticate(username=jsonLogin['username'], password=jsonLogin['password'])
		if user is not None:
			if user.is_active:
				login(request, user)
				userJson = {}
				userJson['username'] = user.username
				userJson['first_name'] = user.first_name
				userJson['last_name'] = user.last_name
				userJson['email'] = user.email
				# userJson['last_login'] = user.last_login
				# userJson['date_joined'] = user.date_joined
				return jsonResponse(True, userJson)
			else:
				return jsonResponse(False, 'disabled account')
		else:
			return jsonResponse(False, 'invalid login')
	except Exception, e:
		print str(e)


