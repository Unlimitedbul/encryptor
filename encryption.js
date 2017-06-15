var encryptedDataArray = {};
var unparsedEncryptedDataArray = localStorage.getItem("encryptedDataArray");
if(unparsedEncryptedDataArray){
  encryptedDataArray = JSON.parse(unparsedEncryptedDataArray);
}else{
  encryptedDataArray = {};
}

function encrypt() {

    var textValue = $("#text").val().trim();
    var passwordValue = $("#password").val().trim();
    var nameValue = $("#name").val().trim();

    if(textValue.length === 0){
      decrypt(nameValue, passwordValue);
    }else{

      var enc = sjcl.encrypt(passwordValue, textValue),
          unparsedEncryptedDataArray = localStorage.getItem("encryptedDataArray"),
          encryptedDataArray = unparsedEncryptedDataArray ? JSON.parse(unparsedEncryptedDataArray) : {};

      encryptedDataArray[nameValue] = enc;
      localStorage.setItem("encryptedDataArray", JSON.stringify(encryptedDataArray));

      window.location.reload();
    }
}

function decrypt(nameValue, passwordValue) {

    try {
        var dec = sjcl.decrypt(passwordValue, encryptedDataArray[nameValue]);
        $("#text").val(dec);
    } catch(e) {
        alert("Er is iets fout gegaan...");
    }
}

function clearAll(){
  localStorage.setItem("encryptedDataArray", "");
  window.location.reload();
}
