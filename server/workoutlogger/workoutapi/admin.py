from django.contrib import admin
from workoutapi.models import Workout, Exercise, Set
from django.contrib.auth.models import User

admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(Set)