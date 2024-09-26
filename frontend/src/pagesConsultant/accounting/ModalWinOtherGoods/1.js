export function customQuote(str) {
  let encoded = '';
  var s = str.split(" ");
  for (let j = 0; j < s.length; j++){
  for (let i = 0; i < s[j].length; i++) {
    let char = s[j].charAt(i);
    let charCode = s[j].charCodeAt(i);

    if (charCode >= 0x410 && charCode <= 0x44F) {
      encoded += '%' + (charCode - 0x350).toString(16).toUpperCase();
    } else if (charCode === 0x401) {
      encoded += '%A8';
    } else if (charCode === 0x451) {
      encoded += '%B8';
    } else {
      encoded += encodeURIComponent(char).replace(/%/g, '').toUpperCase();
    }
  }
      if(j+1 < s.length){
          encoded +="+";
      }
  }
  
  return encoded;
}