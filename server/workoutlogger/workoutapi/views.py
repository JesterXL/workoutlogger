from django.shortcuts import render
from django.http import HttpResponse
import json
from django.core.context_processors import csrf
from django.shortcuts import render_to_response


def jsonResponse(success, data, skipJson):
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

 	if skipJson != True:
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
	return jsonResponse(True, theToken, True)


def login_user(request):

	# print "login_user, username: " + username + ", password=" + password
	# print "login_user, username: " + username
	return jsonResponse(False, 'disabled account')
	# print 'login_user, username=' + username
	# user = authenticate(username=username, password=password)
	# if user is not None:
	# 	if user.is_active:
	# 		login(request, user)
	# 		return jsonResponse(true, user)
	# 	else:
	# 		return jsonResponse(False, 'disabled account')
	# else:
	# 	return jsonResponse(False, 'invalid login')


