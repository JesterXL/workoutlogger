define(["com/jessewarden/workoutlogger/events/EventBus"], function(EventBus)
{
	describe("EventBus", function()
	{
		it("is a valid class", function()
		{
			expect(EventBus).not.toBe(null);
		});

		it("can register an event listener", function()
		{
			EventBus.on("test:event", function(){});
			expect(true).toBe(true);
		});

		it("triggering an event listener works", function()
		{
			var callback = {
				called: false,
				handler: function()
				{
					this.called = true;
				}
			};
			EventBus.on("test:cow", callback.handler, callback);
			EventBus.trigger("test:cow");
			expect(callback.called).toBe(true);
		});

		it("triggering an event listener after it has been removed doesnt' work", function()
		{
			var callback = {
				called: false,
				handler: function()
				{
					this.called = true;
				}
			};
			EventBus.on("test:cow", callback.handler, callback);
			EventBus.off("test:cow", callback.handler, callback);
			EventBus.trigger("test:cow");
			expect(callback.called).toBe(false);
		});

		it("triggering twice works", function()
		{
			var callback = {
				called: 0,
				handler: function()
				{
					this.called++;
				}
			};
			EventBus.on("test:cow", callback.handler, callback);
			EventBus.trigger("test:cow");
			EventBus.trigger("test:cow");
			expect(callback.called).toBe(2);
		});
	});
});