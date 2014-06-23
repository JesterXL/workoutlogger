from django.db import models
from django.contrib.auth.models import User
import json as jxljson
# from django.utils.functional import Promise
# from django.utils.encoding import force_text
# from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers

def user_to_json(user):
	userJson = {}
	userJson['username'] = user.username
	userJson['first_name'] = user.first_name
	userJson['last_name'] = user.last_name
	userJson['email'] = user.email
	userJson['type'] = "User"
	return userJson

class Exercise(models.Model):
	user = models.ForeignKey(User)
	name = models.CharField(max_length=200)
	icon_path = models.URLField()
	icon_path.blank = True
	
	def __unicode__(self):
		return "Excercise: " + self.name

	def toJSON(self):
		return {
			"name": str(self.name),
			"icon_path": str(self.icon_path),
			"id": str(self.id),
			"type": "Excercise"
		}

class Set(models.Model):
	user = models.ForeignKey(User)
	rep_count = models.IntegerField()
	weight = models.IntegerField()
	rest_time = models.IntegerField()

	def __unicode__(self):
		return "Set, reps: " + str(self.rep_count) + ", weight: " + str(self.weight) + ", rest_time: " + str(self.rest_time)

	def toJSON(self):
		return {
			"id": str(self.id),
			"rep_count": self.rep_count,
			"weight": self.weight,
			"rest_time": self.rest_time,
			"type": "Set"
		}

class Routine(models.Model):
	user = models.ForeignKey(User)
	exercise = models.ForeignKey(Exercise)
	sets = models.ManyToManyField(Set)

	def __unicode__(self):
		return "Routine"

	def toJSON(self):
		json = {
			"id": str(self.id),
			"exercise": self.exercise.toJSON(),
			"sets": map(lambda item: item.toJSON(), self.sets.all()),
			"type": "Routine"
		}

		return json


class Workout(models.Model):
	user = models.ForeignKey(User)
	name = models.CharField(max_length=200)
	routines = models.ManyToManyField(Routine)
	occurrence = models.DateTimeField()
	occurrence.blank = True
	occurrence.null = True

	def __unicode__(self):
		return "Workout: " + self.name

	def toJSON(self):
		json = {
			"id": str(self.id),
			"user": user_to_json(self.user),
			"name": str(self.name),
			"occurrence": str(self.occurrence),
			"routines": map(lambda item: item.toJSON(), self.routines.all()),
			"type": "Workout"
		}
		return json


class Program(models.Model):
	user = models.ForeignKey(User)
	name = models.CharField(max_length=200)
	workouts = models.ManyToManyField(Workout)
	start_date = models.DateTimeField()
	start_date.blank = True
	start_date.null = True


	def __unicode__(self):
		return "Program: " + self.name

	def toJSON(self):
		json = {
			"id": str(self.id),
			"name": str(self.name),
			"start_date": str(self.start_date),
			"workouts": map(lambda item: item.toJSON(), self.workouts.all()),
			"type": "Program"
		}
		# TODO: loop through workouts
		return json

