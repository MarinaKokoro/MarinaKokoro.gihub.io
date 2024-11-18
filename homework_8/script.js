window.addEventListener('DOMContentLoaded', function () {
	const openBtn = document.getElementById('open-popup')
	let popup = document.getElementById('popup')
	openBtn.addEventListener('click', function () {
		popup.style.display = 'block'
		window.history.pushState('', '', 'form.html')
	})

	document.getElementById('close-popup').addEventListener('click', function () {
		popup.style.display = 'none'
	})

	window.onload = function () {
		const fields = [
			'field-fio',
			'field-email',
			'field-message',
			'field-number',
			'field-org',
		]
		fields.forEach(field => {
			const storedValue = localStorage.getItem(field)
			if (storedValue) {
				document.getElementsByName(field)[0].value = storedValue
			}
		})
	}

	const form = document.getElementById('feedback-form')

	form.addEventListener('input', function () {
		const fields = [
			'field-fio',
			'field-email',
			'field-number',
			'field-org',
			'field-message',
		]
		fields.forEach(field => {
			localStorage.setItem(field, document.getElementsByName(field)[0].value)
		})
	})

	form.addEventListener('submit', function (e) {
		e.preventDefault()

		var href = $(this).attr('action')

		$.ajax({
			type: 'POST',
			url: href,
			data: new FormData(this),
			dataType: 'json',
			processData: false,
			contentType: false,
			success: function (response) {
				if (response.status == 'success') {
					alert('Форма отправлена')
				} else if (response.code === 422) {
					alert('Field validation failed')
					$.each(response.errors, function (key) {
						$('[name="' + key + '"]').addClass('formcarry-field-error')
					})
				} else {
					alert('Ошибка: ' + response.message)
				}
			},
			error: function (jqXHR, textStatus) {
				const errorObject = jqXHR.responseJSON

				alert(
					'Ошибка, ' + errorObject.title + ': ' + errorObject.message
				)
			},
			complete: function () {
				// This will be fired after request is complete whether it's successful or not.
				// Use this block to run some code after request is complete.
			},
		})
	})
})
