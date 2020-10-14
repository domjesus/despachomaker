function validaNb(campo) {
  let numero = campo;
  // alert(numero);
  numero = numero.replace(".", "");
  numero = numero.replace(".", "");
  numero = numero.replace(".", "");
  numero = numero.replace("-", "");
  let numeroC = numero;

  if (numero.length == 9) {
    numero = numeroC.substring(0, 8);
    var digito = numeroC.substring(8, 9);
  } else {
    numero = numeroC.substring(0, 9);
    digito = numeroC.substring(9, 10);
  }

  let dig = "";
  for (let i = 0; i < 1; i++) {
    let tamanho = numero.length;
    let peso = 2;
    let resto = 0;
    let total = 0;
    let dv2 = "";
    for (let contador = tamanho; contador > 0; contador--) {
      total = total + peso * numero.substring(contador, contador - 1);
      peso = peso + 1;
      if (peso == 10) {
        peso = 2;
      }
    }
    resto = total % 11;
    let dv = 11 - resto;
    if (dv >= 10) {
      dv = 0;
    }
    /*if (dv2="") { dv2 = dv}
          else {dv2=(dv2*10)+dv}*/
    dig = dig + dv;
    numero = numero + dv;
  }
  if (dig != digito) {
    //     alert("Digito verificador do N�mero do Benef�cio incorreto.");
    return false;
  }

  return true;
}

export { validaNb };
