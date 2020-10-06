function setCookie(data) {
  document.cookie = `userIsAuth=true`;
  document.cookie = `usuario_nome=${data.usuario_nome}`;
  document.cookie = `usuario_matr=${data.usuario_matr}`;
  document.cookie = `usuario_cargo=${data.usuario_cargo}`;
  document.cookie = `gex=${data.gex}`;
  document.cookie = `cidade=${data.cidade}`;
  document.cookie = `ol_nome=${data.ol_nome}`;
  document.cookie = `ol_numero=${data.ol_numero}`;

  return true;
}

function deleteCookies() {
  document.cookie = `userIsAuth=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `usuario_nome=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `usuario_matr=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  document.cookie = `usuario_cargo=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `gex=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `cidade=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `ol_nome=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `ol_numero=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function getCookie(cname) {
  var name = cname + "=";

  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      // console.log(c);

      return c.substring(name.length, c.length);
    }
  }

  return "";
}

export { setCookie, deleteCookies, getCookie };
