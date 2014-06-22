from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
import json
from django.core.context_processors import csrf
from django.shortcuts import render_to_response
from django.core import serializers

from workoutapi.models import Exercise, Set, Routine, Workout, Program
from django.core import serializers
import datetime



def jsonResponse(success, data, request=None):
	response = {}
	if success:
		response['response'] = success
		response['data'] = data
	else:
		response['response'] = success
		response['error'] = data

 # 	if success != "token":
	# 	httpResponse = HttpResponse(json.dumps(response), content_type="application/json")
	# else:
	# 	httpResponse = HttpResponse(data)

	

	# if sendAsJSON == False:
	# 	httpResponse = HttpResponse(json.dumps(response))
	# else:

	httpResponse = HttpResponse(json.dumps(response), content_type="application/json")
	httpResponse['Access-Control-Allow-Origin'] = "*"
	httpResponse['Access-Control-Allow-Credentials'] = "true"
	httpResponse['Access-Control-Allow-Methods'] = "POST, GET, PUT, OPTIONS"
	httpResponse['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma, Authorization"

	# if headerProp != "":
	# 	httpResponse[headerProp] = headerValue

	# c = {}
	# c.update(csrf(request))
	# theToken = unicode(c['csrf_token'])
	# # httpResponse["Set-Cookie"] = "csrftoken=" + theToken + "; domain=workoutlogger.com;"
	# httpResponse.set_cookie("csrftoken", theToken, None, None, '/', "workoutlogger.com", None, False)
	# set_cookie(httpResponse, 'csrftoken', theToken)
	return httpResponse


def need_to_login_error():
	response = jsonResponse(False, "need to login")
	return response

def need_to_login(request):
	# return request.user.is_authenticated()
	return False



def index(request):
	return jsonResponse(False, "invalid API call")

def get_token(request):
	try:
		print("get_token")
		c = {}
		c.update(csrf(request))
		theToken = unicode(c['csrf_token'])
		print("token:" + theToken)
		print "c: " + str(c)
		customResponse = {}
		customResponse["token"] = theToken
		return jsonResponse(True, customResponse, request)
		# return jsonResponse(True, customResponse)
	except Exception, e:
		print "Error: " + str(e)
		return jsonResponse(False, 'unknown token error', request)

def login_user(request):
	print "login_user"
	print "method: " + request.method
	print "body: " + request.body
	try:
		
		
		if request.method == "OPTIONS":
			return jsonResponse(True, True, True)

		try:
			requestJSON = json.loads(request.body)
			username = requestJSON['username']
			password = requestJSON['password']
			print "username: " + username
			print "password: " + password
			user = authenticate(username=username, password=password)
		except Exception, e:
			print "Error authenticating, e:" + str(e)
			return jsonResponse(False, "Error authenticating, e:" + str(e))

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
			# except Exception e:
			# 	print "Error2: " + str(e)
			# 	return jsonResponse(False, "unknown server error")
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
		if need_to_login(request):
			return jsonResponse(True, {"logged_in": True})
		else:
			return jsonResponse(True, {"logged_in": False})
	except Exception, e:
		print "Error: " + str(e)
		return jsonResponse(False, 'unknown server error')

# def show_routine(request):
# 	print "show_routine"
# 	try:
# 		return jsonResponse(True, Routine.objects.all()[0].toJSON())
# 	except Exception, e:
# 		print "show_routine error:" + str(e)
# 		return jsonResponse(False, "unknown server error")

def serialize_array_of_models(list_of_models):
	return map(lambda item: item.toJSON(), list_of_models)


def search_exercises(request):
	print "search_exercises"
	try:
		searchTerm = request.GET["searchTerm"]
		exercises = Exercise.objects.filter(name__startswith=searchTerm)
		print exercises
		return jsonResponse(True, serialize_array_of_models(exercises))
	except Exception, e:
		print "search_exercises error:" + str(e)
	return jsonResponse(False, str(e))

def get_all_programs(request):
	print "get_all_programs"
	try:
		if need_to_login(request):
			user_programs = Program.objects.filter(user__id=user_id)
			return jsonResponse(True, user_programs.toJSON())
		else:
			return need_to_login_error()
	except Exception, e:
		print "get_program_from_date, error: " + str(e)
		return jsonResponse(False, "unknown server error")




# TODO: figure out how to get by user, not all workouts in system
# def get_all_workouts(request):
# 	try:
# 		if request.user.is_authenticated():
# 			all_workouts = serializers.serialize("json", Workout.objects.all())
# 			return jsonResponse(True, all_workouts)
# 		else:
# 			return need_to_login_error()
# 	except Exception, e:
# 		print(str(e))
# 		return jsonResponse(False, e)

# def get_workout(request, workout_id):
# 	try:
# 		if request.user.is_authenticated():
# 			# first get all the associated exercises and sets
# 			related_exercises = Exercise.objects.filter(workout__id=workout_id)
# 			found_workout = Workout.objects.get(id=workout_id)
# 			found_workout_json = found_workout.toJSON()
# 			found_workout_json["exercises"] = []
# 			for exercise in related_exercises:
# 				exercise_json = exercise.toJSON()
# 				related_sets = Set.objects.filter(exercise__id=exercise.id)
				
# 				for workout_set in related_sets:
# 					set_json = workout_set.toJSON()
# 					exercise_json["sets"].append(set_json)

# 				found_workout_json["exercises"].append(exercise_json)

# 			return jsonResponse(True, found_workout_json)
# 		else:
# 			return need_to_login_error()
# 	except Exception, e:
# 		print(str(e))
# 		return jsonResponse(False, e)

# def add_set_to_exercise(request):
# 	try:
# 		# print "add_set_to_exercise"
# 		if request.user.is_authenticated():
# 			json_post = json.loads(request.body)
# 			new_set = Set()
# 			new_set.good_form = json_post["goodForm"]
# 			new_set.reps = json_post["reps"]
# 			new_set.weight = json_post["weight"]
# 			new_set.goal_reps = json_post["goalReps"]
# 			new_set.goal_weight = json_post["goalWeight"]
# 			new_set.exercise = Exercise.objects.get(id=json_post["exerciseID"])
# 			new_set.save()
# 			new_set_json = new_set.toJSON()
# 			new_set_json["cid"] = json_post["cid"]
# 			return jsonResponse(True, new_set_json)
# 	except Exception, e:
# 		print str(e)
# 		return jsonResponse(False, e)

# def delete_set(request):
# 	try:
# 		if request.user.is_authenticated():
# 			json_post = json.loads(request.body)
# 			set_before = Set.objects.filter(id=json_post["setID"])
# 			print "set before: " + str(set_before.count())
# 			Set.objects.filter(id=json_post["setID"]).delete()
# 			set_after = Set.objects.filter(id=json_post["setID"])
# 			print "set after: " + str(set_after.count())
# 			return jsonResponse(True, True)
# 	except Exception, e:
# 		print str(e)
# 		return jsonResponse(False, e)

# def update_set(request):
# 	try:
# 		if request.user.is_authenticated():
# 			json_post = json.loads(request.body)
# 			existing_set = Set.objects.get(id=json_post["id"])
# 			existing_set.good_form = json_post["goodForm"]
# 			existing_set.reps = json_post["reps"]
# 			existing_set.weight = json_post["weight"]
# 			existing_set.goal_reps = json_post["goalReps"]
# 			existing_set.goal_weight = json_post["goalWeight"]
# 			existing_set.save()
# 			return jsonResponse(True, True)
# 	except Exception, e:
# 		print str(e)
# 		return jsonResponse(False, e)

# helper methods for creating fixtures
def create_exercise(user, name, icon_path=""):
	try:
		exercise = Exercise()
		exercise.user = user
		exercise.name = name
		exercise.icon_path = icon_path
		exercise.save()
		return exercise
	except Exception, e:
		print "create_exercise error: " + str(e)
		return False

def create_set(user, rep_count, weight, rest_time):
	try:
		set = Set()
		set.user = user
		set.rep_count = rep_count
		set.weight = weight
		set.rest_time = rest_time
		set.save()
		return set
	except Exception, e:
		print "create_set error: " + str(e)
		return False

def create_routine(user, exercise, sets):
	try:
		routine = Routine()
		routine.user = user
		routine.exercise = exercise
		routine.save()
		routine.sets = sets
		routine.save()
		return routine
	except Exception, e:
		print "create_routine error: " + str(e)
		return False

def create_workout(user, name, routines, occurrence):
	try:
		workout = Workout()
		workout.user = user
		workout.name = name
		workout.occurrence = occurrence
		workout.save()
		workout.routines = routines
		workout.save()
		return workout
	except Exception, e:
		print "create_workout: " + str(e)
		return False

def create_program(user, name, workouts, start_date):
	try:
		program = Program()
		program.user = user
		program.name = name
		program.start_date = start_date
		program.save()
		program.workouts = workouts
		program.save()
		return program
	except Exception, e:
		print "create_program: " + str(e)
		return False

def generate_mad_fixtures_yo(request):
	try:
		user = request.user
		squat = create_exercise(user, "Barbell Squat")
		deadlift = create_exercise(user, "Barbell Deadlift")
		bench_press = create_exercise(user, "Dumbbell Bench Press")

		five_squat_set = create_set(user, 5, 140, 30)
		five_squat_routine = create_routine(user, squat, [five_squat_set, 
										five_squat_set,
										five_squat_set,
										five_squat_set,
										five_squat_set])

		five_deadlift_set = create_set(user, 5, 135, 30)
		five_deadlift_routine = create_routine(user, deadlift, [five_deadlift_set,
											five_deadlift_set,
											five_deadlift_set,
											five_deadlift_set,
											five_deadlift_set])

		five_bench_press = create_set(user, 5, 90, 30)
		five_bench_routine = create_routine(user, bench_press, [five_bench_press,
											five_bench_press,
											five_bench_press,
											five_bench_press,
											five_bench_press])
		routines = []
		routines.append(five_squat_routine)
		routines.append(five_deadlift_routine)
		routines.append(five_bench_routine)
		five_by_five_big_three = create_workout(user, "5x5 Big 3", routines, datetime.datetime.now())
		workouts = []
		workouts.append(five_by_five_big_three)
		create_program(user, "3 month 5x5 Big 3", workouts, datetime.datetime.now())

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




