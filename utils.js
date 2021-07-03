var dateInputMask = function dateInputMask(elm) {
    elm.addEventListener('keypress', function(e) {
      if(e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
      }
      
      var len = elm.value.length;
      
      // If we're at a particular place, let the user type the slash
      // i.e., 12/12/1212
      if(len !== 1 || len !== 3) {
        if(e.keyCode == 47) {
          e.preventDefault();
        }
      }
      
      // If they don't add the slash, do it for them...
      if(len === 2) {
        elm.value += '/';
      }
  
      // If they don't add the slash, do it for them...
      if(len === 5) {
        elm.value += '/';
      }
    });
  };

  function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.
  
    // get input value
    var input_val = input.value;
    // don't validate empty input
    if (input_val === "") { return; }
  
    // original length
    var original_len = input_val.length;
  
    // initial caret position 
    var caret_pos = input.getAttribute("selectionStart");
  
    // check for decimal
    if (input_val.indexOf(".") >= 0) {
  
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      var decimal_pos = input_val.indexOf(".");
  
      // split number by decimal point
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);
  
      // add commas to left side of number
      left_side = formatNumber(left_side);
  
      // validate right side
      right_side = formatNumber(right_side);
  
      // On blur make sure 2 numbers after decimal
      if (blur === "blur") {
        right_side += "00";
      }
  
      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);
  
      // join number by .
      input_val = "$" + left_side + "." + right_side;
  
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = formatNumber(input_val);
      input_val = "$" + input_val;
  
      // final formatting
      if (blur === "blur") {
        input_val += ".00";
      }
    }
  
    // send updated string to input
    input.value = input_val;
  
    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
  }

  window.onload = function(){
    dateInputMask(document.getElementById("inicio"));
    dateInputMask(document.getElementById("fim"));
    dateInputMask(document.getElementById("filtro-inicio"));
    dateInputMask(document.getElementById("filtro-fim"));


  }