from django.contrib import admin
from workoutapi.models import Exercise, Set, Routine, Workout, Program
from django.contrib.auth.models import User

admin.site.register(Exercise)
admin.site.register(Set)
admin.site.register(Routine)
admin.site.register(Workout)
admin.site.register(Program)
