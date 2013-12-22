from django.db import models
from django.contrib.auth.models import User

class Workout(models.Model):
	user = models.ForeignKey(User)
	name = models.CharField(max_length=200)
	occurrence = models.DateTimeField()
	type = models.CharField(max_length=100)
	total_time_in_milliseconds = models.IntegerField(default=0)

class Exercise(models.Model):
	name = models.CharField(max_length=100)
	workout = models.ForeignKey(Workout)

class Set(models.Model):
	name = models.CharField(max_length=100)
	good_form = models.BooleanField()
	reps = models.IntegerField(default=0)
	weight = models.IntegerField(default=0)
	goal_reps = models.IntegerField(default=0)
	goal_weight = models.IntegerField(default=0)
	excercise = models.ForeignKey(Exercise)