part of workoutloggerlib;

abstract class AbstractService extends Stream
{
	StreamController _controller;
	StreamSubscription _subscription;
	
	AbstractService()
	{
		_controller = new StreamController.broadcast(onCancel: _onCancel, sync: false);	
	}
	
	// ------------------------------------------------------------------------
	// ------------------------------------------------------------------------
	// Stream Impl
	StreamSubscription listen(void onData(ServiceEvent event),
		{ void onError(Error error),
		void onDone(),
		bool cancelOnError })
	{
		_subscription =  _controller.stream.listen(onData,
			onError: onError,
			onDone: onDone,
			cancelOnError: cancelOnError);
		return _subscription;
	}
	
	void _onCancel()
	{
		_subscription.cancel();
		_subscription = null;
	}
	
	void _onData(ServiceEvent event)
	{
		_controller.add(event);
	}
	
	// ------------------------------------------------------------------------
	// ------------------------------------------------------------------------
}