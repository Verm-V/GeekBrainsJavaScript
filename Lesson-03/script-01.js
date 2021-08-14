var lineResult = ""; 

var i = 0;
while (i <= 100) {
    if (isPrime(i)) {
        lineResult += (i + " ");
    }
    i++;
}

//Вывод результата на html-страницу
document.getElementById("t01_01").innerHTML = (lineResult);


//Проверяет является ли число простым
function isPrime(num) {
    for(var i = 2; i < num; i++)
        if(num % i === 0) return false;
    return (num > 1);
}
