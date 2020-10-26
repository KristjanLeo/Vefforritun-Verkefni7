/**
 * Verkefni 7 – Caesar dulmál
 */
'use strict';
const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {

  alert('Halló!');
  var input;
  var n;
  var Numbern;
  var strengur;
  var CorrectString = true;
  var invalid = [];

  do{
    input = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');
    if(input != "kóða" && input!= "afkóða"){
      alert(`Veit ekki hvaða aðgerð ${input} er. Reyndu aftur.`);
    }
  }while(input != "kóða" && input != "afkóða")

  do{
    n = prompt(`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]`);
    Numbern = Number.parseInt(n)
    if(n < 1 || n > 31 || !Number.isInteger(Numbern)){
      alert(`${n} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);
    }
  }while(n < 1 || n > 31 || !Number.isInteger(Numbern))

  do{
    CorrectString = true;
    strengur = prompt(`Gefðu upp strenginn sem á að ${input} með hliðrun ${n}:`).toLocaleUpperCase();
    if(strengur.length === 0){
      alert(`Þú gafst ekki upp streng. Reyndu aftur.`);
      CorrectString = false;
    }else{
      invalid = [];
      for(var i = 0; i < strengur.length; i++){
        if(LETTERS.indexOf(strengur[i]) === -1){
          invalid.push(strengur[i]);
          CorrectString = false;
        }
      }
      if(!CorrectString){
        console.log(invalid);
        alert(`Þú gafst upp stafi sem ekki er hægt að ${input}: ${invalid.join(', ')}. Reyndu aftur.`);
      }
    }
  }while(!CorrectString)

  if(input === "kóða"){
    alert(encode(strengur, Numbern));
  }
  if(input === "afkóða"){
    alert(decode(strengur, Numbern));
  }

}

start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  var encodedstr = "";
  for(var i = 0; i < str.length; i++){
    encodedstr += LETTERS[(LETTERS.indexOf(str[i]) + n) % 32];
  }
  return encodedstr;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  var decodedstr = "";
  for(var i = 0; i < str.length; i++){
    decodedstr += LETTERS[(LETTERS.indexOf(str[i]) - n + 32) % 32]; /* +32 til þess að vera ekki með neikvæðar tölur */
  }
  return decodedstr;
}


// assertions
console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
