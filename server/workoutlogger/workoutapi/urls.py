from django.conf.urls import patterns, url

from workoutapi import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^get_token', views.get_token, name='get_token'),
	url(r'^login_user', views.login_user, name='login_user'),
	url(r'^logged_in', views.logged_in, name='logged_in'),
	url(r'^logout_user', views.logout_user, name='logout_user'),
	url(r'^get_all_workouts', views.get_all_workouts, name='get_all_workouts'),
	url(r'^get_workout/(?P<workout_id>\d+)/$', views.get_workout, name='get_workout'),
	url(r'^add_set_to_exercise', views.add_set_to_exercise, name='add_set_to_exercise'),
	url(r'^delete_set', views.delete_set, name='delete_set')
)