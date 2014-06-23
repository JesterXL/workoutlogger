from django.conf.urls import patterns, url

from workoutapi import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^get_token', views.get_token, name='get_token'),
	url(r'^login_user', views.login_user, name='login_user'),
	url(r'^logged_in', views.logged_in, name='logged_in'),
	url(r'^logout_user', views.logout_user, name='logout_user'),
	url(r'^get_all_programs', views.get_all_programs, name='get_all_programs'),
	url(r'^search_exercises', views.search_exercises, name='search_exercises'),
	url(r'^get_workout_by_day', views.get_workout_by_day, name='get_workout_by_day'),
	url(r'^generate_mad_fixtures_yo', views.generate_mad_fixtures_yo, name='generate_mad_fixtures_yo')
)