from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
import json
from django.core.context_processors import csrf
from django.shortcuts import render_to_response
from django.core import serializers

from workoutapi.models import Workout, Exercise, Set
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

def need_to_login_error():
	response = jsonResponse(False, "need to login")
	return response



def index(request):
	return jsonResponse(False, "invalid API call")

def get_token(request):
	try:
		print("get_token")
		c = {}
		c.update(csrf(request))
		theToken = unicode(c['csrf_token'])
		print("token:" + theToken)
		customResponse = {}
		customResponse["token"] = theToken
		return jsonResponse(True, customResponse)
	except Exception, e:
		print "Error: " + str(e)
		return jsonResponse(False, 'unknown token error')



def login_user(request):
	try:
		print("login_user")
		print("json in request:" + request.body)
		jsonLogin = json.loads(request.body)
		print("username passed in: " + jsonLogin['username'])
		user = authenticate(username=jsonLogin['username'], password=jsonLogin['password'])
		if user is not None:
			if user.is_active:
				login(request, user)
				request.session.set_expiry(0)
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
		print "Error: " + str(e)
		return jsonResponse(False, 'unknown server error')


def logout_user(request):
	print 'logout_user'
	logout(request)
	return jsonResponse(True, 'successfully logged out')

def logged_in(request):
	print "logged_in"
	try:
		if request.user.is_authenticated():
			return jsonResponse(True, {"logged_in": True})
		else:
			return jsonResponse(True, {"logged_in": False})
	except Exception, e:
		print "Error: " + str(e)
		return jsonResponse(False, 'unknown server error')


# TODO: figure out how to get by user, not all workouts in system
def get_all_workouts(request):
	try:
		if request.user.is_authenticated():
			all_workouts = serializers.serialize("json", Workout.objects.all())
			return jsonResponse(True, all_workouts)
		else:
			return need_to_login_error()
	except Exception, e:
		print(str(e))
		return jsonResponse(False, e)

def get_workout(request, workout_id):
	try:
		if request.user.is_authenticated():
			# first get all the associated exercises and sets
			related_exercises = Exercise.objects.filter(workout__id=workout_id)
			found_workout = Workout.objects.get(id=workout_id)
			found_workout_json = found_workout.toJSON()
			found_workout_json["exercises"] = []
			for exercise in related_exercises:
				exercise_json = exercise.toJSON()
				related_sets = Set.objects.filter(exercise__id=exercise.id)
				
				for workout_set in related_sets:
					set_json = workout_set.toJSON()
					exercise_json["sets"].append(set_json)

				found_workout_json["exercises"].append(exercise_json)

			return jsonResponse(True, found_workout_json)
		else:
			return need_to_login_error()
	except Exception, e:
		print(str(e))
		return jsonResponse(False, e)

def add_set_to_exercise(request):
	try:
		# print "add_set_to_exercise"
		if request.user.is_authenticated():
			json_post = json.loads(request.body)
			new_set = Set()
			new_set.good_form = json_post["goodForm"]
			new_set.reps = json_post["reps"]
			new_set.weight = json_post["weight"]
			new_set.goal_reps = json_post["goalReps"]
			new_set.goal_weight = json_post["goalWeight"]
			new_set.exercise = Exercise.objects.get(id=json_post["exerciseID"])
			new_set.save()
			return jsonResponse(True, new_set.toJSON())
	except Exception, e:
		print str(e)
		return jsonResponse(False, e)

def delete_set(request):
	try:
		if request.user.is_authenticated():
			json_post = json.loads(request.body)
			set_before = Set.objects.filter(id=json_post["setID"])
			print "set before: " + str(set_before.count())
			Set.objects.filter(id=json_post["setID"]).delete()
			set_after = Set.objects.filter(id=json_post["setID"])
			print "set after: " + str(set_after.count())
			return jsonResponse(True, True)
	except Exception, e:
		print str(e)
		return jsonResponse(False, e)


# def get_all_circuits_from_workout_id(request, workoutID):
# 	try:
# 		if request.user.is_authenticated():
# 			return Circuit.objects.filter(id=workoutID)
# 		else
# 			return need_to_login_error()
# 	except Exception, e:
# 		return jsonResponse(false, e)


# def get_all_sets_from_circuit_id(request, circuitID):
# 	try:
# 		if request.user.is_authenticated():
# 			return Set.objects.filter(id=circuitID)
# 		else
# 			return need_to_login_error()
# 	except Exception, e:
# 		return jsonResponse(false, e)


# # name = models.CharField(max_length=200)
# # occurrence = models.DateTimeField()
# # type = models.CharField(max_length=100)
# # total_time_in_milliseconds = models.IntegerField(default=0)
# def create_workout(request, params):
# 	try:
# 		workout = Workout()
# 		workout.user = request.user
# 		workout.name = params.name
# 		workout.occurrence = params.occurrence
# 		workout.type = params.type
# 		workout.total_time_in_milliseconds = 0
# 		workout.save()
# 		return jsonResponse(true, workout)
# 	except Exception, e:
# 		return jsonResponse(false, e)

# # name = models.CharField(max_length=100)
# # workout = models.ForeignKey(Workout)
# def create_circuit(request, params):
# 	try:
# 		circuit = Circuit()
# 		circuit.name = params.name
# 		circuit.workout = Workout.objects.filter(id=params.workoutID)
# 		circuit.save()
# 		return jsonResponse(true, workout)
# 	except Exception, e:
# 		return jsonResponse(false, e)

# # name = models.CharField(max_length=100)
# # good_form = models.BooleanField()
# # reps = models.IntegerField(default=0)
# # weight = models.IntegerField(default=0)
# # goal_reps = models.IntegerField(default=0)
# # goal_weight = models.IntegerField(default=0)
# # circuit = models.ForeignKey(Circuit)
# def create_set(request, params):
# 	try:
# 		set = Set()
# 		set.name = params.name
# 		set.good_form = params.goodForm
# 		set.reps = params.reps
# 		set.weight = params.weight
# 		set.goal_reps = params.goal_reps
# 		set.goal_weight = params.goal_weight
# 		set.circuit = Circuit.objects.filter(id=params.circuitID)
# 		set.save()
# 		return jsonResponse(true, set)
# 	except Exception, e:
# 		return jsonResponse(false, e)

# def save_workout(request, workoutDTO):
# 	try:
# 		workout = Workout.objects.filter(workoutDTO.workoutID)
# 		# loop through circuits and save sets
# 		for circuitVO in workoutDTO.circuts:
# 			currentCircuit = Circuit.objects.filter(id=circuitVO.id)
# 			for setVO in circuitVO.sets:
# 				currentSet = Set.objects.flter(id=)




