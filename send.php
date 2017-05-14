<?php
	function cleanField($fieldName) {
		return trim(htmlentities($_POST[$fieldName] ?? ''));
	}

	function checkFields() {
		$fieldName = cleanField('name');
		$fieldNameLength = strlen($fieldName);

		// Assert name length.
		if ($fieldNameLength == 0 || $fieldNameLength > 100)
			return false;

		$fieldEmail = cleanField('email');
		$fieldEmailLength = strlen($fieldEmail);

		// Assert e-mail length.
		if ($fieldEmailLength == 0 || $fieldEmailLength > 160)
			return false;

		// Assert valid e-mail address.
		if (filter_var($fieldEmail, FILTER_VALIDATE_EMAIL) === false)
			return false;

		$fieldSubject = cleanField('subject');
		$fieldSubjectLength = strlen($fieldSubject);

		// Assert subject length.
		if ($fieldSubjectLength == 0 || $fieldSubjectLength > 100)
			return false;

		$fieldMessage = cleanField('message');
		$fieldMessageLength = strlen($fieldMessage);

		// Assert message length.
		if ($fieldMessageLength == 0 || $fieldMessage > 10000)
			return false;

		$senderIP = $_SERVER['REMOTE_ADDR'];

		$message = "This message was submitted using the contact form!\n\n";
		$message .= "Name: $fieldName\n";
		$message .= "E-mail: $fieldEmail\n";
		$message .= "Subject: $fieldSubject\n";
		$message .= "IP Address: $senderIP\n\n";
		$message .= "Message: $fieldMessage";

		if (!mail('business@skogdesigns.com', 'Website Contact Submission', $message))
			return false;

		return true;
	}

	$fieldName = cleanField('name');
	$fieldEmail = cleanField('email');
	$fieldSubject = cleanField('subject');
	$fieldMessage = cleanField('message');

	echo json_encode(['result' => checkFields()]);