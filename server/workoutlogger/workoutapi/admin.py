from django.contrib import admin
from workoutapi.models import Workout, Exercise, Set

admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(Set)