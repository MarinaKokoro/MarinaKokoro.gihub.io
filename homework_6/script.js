function clickOK(event) {
    event.preventDefault();
    let f = document.getElementsByName("field");
    let r = document.getElementById("result");
    let s = document.getElementsByName("select");
    if (f[0].value.match(/^\d+$/) && f[0].value >= 0) {
        r.innerHTML = "Стоимость товара: " + s[0].value + ", итоговая сумма: "
        + f[0].value * s[0].value;
    } else {
        alert("Введите целое положительное число без других символов");
        r.innerHTML = "";
    }
}

function updatePrice(event) {
	event.preventDefault()
	let price = 0
	let prices = getPrices()
	let checked = 4;
	// Смотрим какой товар выбран
	let radios = document.getElementsByName('prod')
	radios.forEach(function (radio) {
		if (radio.checked) {
			checked = radio.value
			let priceIndex = parseInt(radio.value)
			if (priceIndex >= 0) {
				price = prices.prodTypes[priceIndex]
			}
			
			// Скрываем или показываем select
			let selectDiv = document.getElementById('sel')
			selectDiv.style.display = radio.value == '1' ? 'block' : 'none'

			// Скрываем или показываем чекбоксы.
			let checkDiv = document.getElementById('checkboxes')
			checkDiv.style.display = radio.value == '2' ? 'block' : 'none' 
		}
	})
	console.log(checked)

	// Находим select по имени в DOM.
	let s = document.getElementsByName('sel')
	let sel = s[0]
	if(checked == 1){
		let optionPrice = prices.prodOptions[parseInt(sel.value)]
		if (optionPrice !== undefined) {
			price += optionPrice
		}
	}

	// Смотрим какие товарные свойства выбраны.
	let checkboxes = document.querySelectorAll('#checkboxes input')
	if(checked == 2){
		checkboxes.forEach(function (checkbox) {
			if (checkbox.checked) {
				let propPrice = prices.prodProperties[checkbox.name]
				if (propPrice !== undefined) {
					price += propPrice
				}
			}
		})
	}

	let prodPrice = document.getElementById('result2')
	let f = document.getElementsByName('field2')
	if (f[0].value.match(/^\d+$/) && f[0].value >= 0) {
		prodPrice.innerHTML = price * f[0].value + ' рублей'
	}
	else{
		prodPrice.innerHTML = "! Введите кол-во товара"
	}
	
}

function getPrices() {
	return {
		prodTypes: [100, 200, 300],
		prodOptions: [10,20,30],
		prodProperties: {
			prop1: 155,
			prop2: 255,
		},
	}
}

window.addEventListener("DOMContentLoaded", function () {
	console.log('DOM is Ready')
	let b = document.getElementById('butt')
	b.addEventListener('click', clickOK)

	let selectDiv = document.getElementById('sel')
	selectDiv.style.display = 'none'

	let checkDiv = document.getElementById('checkboxes')
	checkDiv.style.display = 'none'

	let f = document.getElementsByName("field2");
    f.forEach(function (ff) {
		ff.addEventListener('change', function (event) {
			updatePrice(event)
		})
	})

	// Назначаем обработчик радиокнопок
	let radios = document.getElementsByName('prod')
	radios.forEach(function (radio) {
		radio.addEventListener('change', function (event) {
			let r = event.target
			console.log(r.value)
			updatePrice(event)
		})
	})

	// Назначаем обработчик на изменение select
	let s = document.getElementsByName('sel')
	let select = s[0]
	select.addEventListener('change', function (event) {
		let target = event.target
		console.log(target.value)
		updatePrice(event)
	})

	// Назначаем обработчик чекбокса
	let checkboxes = document.querySelectorAll('#checkboxes input')
	checkboxes.forEach(function (checkbox) {
		checkbox.addEventListener('change', function (event) {
			let c = event.target
			console.log(c.name)
			console.log(c.value)
			updatePrice(event)
		})
	})

	updatePrice(event)
});
