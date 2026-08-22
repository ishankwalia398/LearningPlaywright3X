function palindromeCheck(num){
    let reversed = 0;
    let originalNum = num;
    function reverseNumber(num){
        for (let i = num.length - 1; i >= 0; i--){
            reversed += num[i];
        }
        return reversed;        
    }
    if (originalNum == reverseNumber(num.toString())){
        console.log(originalNum + " is a palindrome number");
    } else {
        console.log(originalNum + " is not a palindrome number");
    }
}

palindromeCheck(121);
palindromeCheck(123);
palindromeCheck(4332334);
palindromeCheck(567651);