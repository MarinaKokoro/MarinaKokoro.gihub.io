function clickOK(){
	event.preventDefault()
    let f = document.getElementsByName('field');
    let r = document.getElementById('result');
    let s = document.getElementsByName('select');
    if (f[0].value.match(/^\d+$/) && f[0].value >= 0 ) {
			r.innerHTML =
				'Стоимость товара: ' +
				s[0].value +
				', итоговая сумма: ' +
				f[0].value * s[0].value
		} else {
			alert('Введите целое положительное число без других символов')
			r.innerHTML = ''
		}
    return false;
}

window.addEventListener('DOMContentLoaded', function (event){
	console.log("DOM is Ready");
	let b = document.getElementById("butt");
	b.addEventListener('click', clickOK);
});