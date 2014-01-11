define([],
	function(
		)
	{
		var ResponseFactory = {

			validResponse: function(json)
			{
				try
				{
					console.log("ResponseFactory::validResponse");
					if(typeof json !== 'undefined')
					{
						if(json.response == true || json.response == false)
						{
							return true;
						}
						else
						{
							return false;
						}
					}
					else
					{
						return false;
					}
				}
				catch(error)
				{
					console.error("SetFactory::validateResponse, error parsing response:" + error.message);
				}
				return false;
			},

			needToLogin: function(json)
			{
				try
				{
					console.log("ResponseFactory::needToLogin");
					if(ResponseFactory.validResponse(json) == true)
					{
						if(json.error && json.error.toLowerCase() == 'need to login')
						{
							return true;
						}
						else
						{
							return false;
						}
					}
					else
					{
						// TODO: more testing. Django debug is giving us HTML responses for expired sessions. Should parse this.
						return true;
					}
				}
				catch(error)
				{
					console.error("ResponseFactory::needToLogin, parse failure:", error.toString());
					return false;
				}
			},

			needToLoginError: function(xhr)
			{
				try
				{
					if(typeof xhr !== 'undefined' && xhr.status)
					{
						if(xhr.status == 500)
						{
							return true;
						}
						else
						{
							return false;
						}
					}
				}
				catch(xhrError)
				{
					console.error("Failed to parse xhr error:", xhrError);
					return false;
				}
			}
		};

		return ResponseFactory;

	});
