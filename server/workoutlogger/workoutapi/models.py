from django.db import models
from django.contrib.auth.models import User
# import json
# from django.utils.functional import Promise
# from django.utils.encoding import force_text
# from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers

class Workout(models.Model):
	user = models.ForeignKey(User)
	name = models.CharField(max_length=200)
	occurrence = models.DateTimeField()
	total_time_in_milliseconds = models.IntegerField(default=0)

	def __unicode__(self):
		return "Workout: " + self.name

	def toJSON(self):
		return {
			"user": {
				"id": self.user.id,
			},
			"name": str(self.name),
			"occurrence": str(self.occurrence),
			"total_time_in_milliseconds": self.total_time_in_milliseconds
		}


class Exercise(models.Model):
	name = models.CharField(max_length=100)
	workout = models.ForeignKey(Workout)
	
	def __unicode__(self):
		return "Excercise: " + self.name

	def toJSON(self):
		return {
			"name": str(self.name),
			"id": str(self.id),
			"sets": []
		}

class Set(models.Model):
	good_form = models.BooleanField(default=True)
	reps = models.IntegerField(default=0)
	weight = models.IntegerField(default=0)
	goal_reps = models.IntegerField(default=0)
	goal_weight = models.IntegerField(default=0)
	exercise = models.ForeignKey(Exercise)

	# def __unicode__(self):
	# 	return "Set: " + self.name

	def toJSON(self):
		return {
			"id": self.id,
			"good_form": self.good_form,
			"reps": self.reps,
			"weight": self.weight,
			"goal_reps": self.goal_reps,
			"goal_weight": self.goal_weight
		}


# class LazyEncoder(DjangoJSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, Promise):
#             return force_text(obj)
#         return super(LazyEncoder, self).default(obj)