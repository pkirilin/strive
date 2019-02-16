// Init some values for jQuery validator

(function($) {
  var defaultOptions = {
    errorClass: "is-invalid",
    validClass: "is-valid",
    onkeyup: (function() {
      var originalKeyUp = $.validator.defaults.onkeyup;
      var customKeyUp = function(element, event) {
        if (!element.hasAttribute("remote")) {
          return originalKeyUp.call(this, element, event);
        }
        return false;
      };
      return customKeyUp;
    })(),
    highlight: function(element, errorClass, validClass) {
      $(element)
        .addClass(errorClass)
        .removeClass(validClass);
    }
  };

  $.validator.setDefaults(defaultOptions);

  $.validator.unobtrusive.options = {
    errorClass: defaultOptions.errorClass,
    validClass: defaultOptions.validClass
  };
})(jQuery);

// adding a rule for custom [Remote] attribute

// jQuery.validator.addMethod("mycustomattr", function(value, element, param) {
//   if (value != "test") {
//     return false;
//   } else {
//     return true;
//   }
// });

// jQuery.validator.unobtrusive.adapters.addBool("mycustomattr");
