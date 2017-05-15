var contact = {
	_submitting: false
};

contact.onSubmit = function() {
	if (contact._submitting)
		return;

	var check = contact._checkFields();
	if (check === true) {
		contact._status.slideUp();
		contact._submitButton.val('Working...');

		$.post('send.php', contact._values).done(function(res) {
			if (!res.result) {
				contact._submitButton.fadeOut();
				$('input[type=text],textarea').prop('disabled', true);
				contact._status.text('Message sent!').slideDown().addClass('done');
			} else {
				contact._status.text('Something went wrong!').slideDown();
				contact._submitButton.val('Send');
				contact._submitting = false;
			}
		}).fail(function() {
			contact._status.text('Something went wrong!').slideDown();
			contact._submitButton.val('Send');
			contact._submitting = false;
		});
	} else {
		contact._status.text(check).slideDown();
		contact._submitButton.val('Send');
	}
};

contact._checkFields = function() {
	contact._values = {};
	for (var index in contact._fields)
	{
		if (contact._fields.hasOwnProperty(index))
		{
			var node = contact._fields[index];
			var input = node.element.val().trim();

			if (input.length === 0 && !node.optional)
				return node.name + ' cannot be blank!';

			if (input.length > node.maxLength)
				return node.name + ' cannot exceed ' + node.maxLength + ' characters.';

			if (node.check && !node.check.test(input))
				return node.name + ' must be valid!';

			if (input.length > 0) // Prevents optional fields being sent.
				contact._values[index] = input;
		}
	}
	return true;
};

$(function() {
	contact._submitButton = $('#input-submit').on('click', contact.onSubmit);
	contact._status = $('#error-row');
	contact._fields = {
		name: {
			name: 'Your name',
			element: $('#input-name'),
			maxLength: 100
		},
		email: {
			name: 'E-mail address',
			check: /\S+@\S+\.\S+/,
			element: $('#input-email'),
			maxLength: 160
		},
		subject: {
			name: 'Subject',
			element: $('#input-subject'),
			maxLength: 100
		},
		message: {
			name: 'Message',
			element: $('#input-message'),
			maxLength: 10000
		},
		budget: {
			name: 'Budget',
			optional: true,
			element: $('#input-budget'),
			maxLength: 100
		}
	};
});