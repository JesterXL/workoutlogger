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
	type = models.CharField(max_length=100)
	total_time_in_milliseconds = models.IntegerField(default=0)

	def __unicode__(self):
		return "Workout: " + self.name + "(" + self.type + ")"

	def toJSON(self):
		return {
			"user": {
				"id": self.user.id,
			},
			"name": str(self.name),
			"occurrence": str(self.occurrence),
			"type": str(self.type),
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
			"id": str(self.id)
		}

class Set(models.Model):
	name = models.CharField(max_length=100)
	good_form = models.BooleanField()
	reps = models.IntegerField(default=0)
	weight = models.IntegerField(default=0)
	goal_reps = models.IntegerField(default=0)
	goal_weight = models.IntegerField(default=0)
	excercise = models.ForeignKey(Exercise)

	def __unicode__(self):
		return "Set: " + self.name

# class LazyEncoder(DjangoJSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, Promise):
#             return force_text(obj)
#         return super(LazyEncoder, self).default(obj)