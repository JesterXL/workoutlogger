from django.conf.urls import patterns, url

from workoutapi import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^get_token', views.get_token, name='get_token'),
	url(r'^login_user', views.login_user, name='login_user'),
	url(r'^logout_user', views.logout_user, name='logout_user'),
	url(r'^workouts', views.workouts, name='workouts')
)