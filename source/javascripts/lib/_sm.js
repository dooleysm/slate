(function(){
  // Install SM
  var jq = document.createElement('script');
  jq.src = "https://api.salemove.com/salemove_integration.js";
  document.head.appendChild(jq);

  // Install Visitor App
  var va = document.createElement('script');
  va.src = "https://s3.amazonaws.com/salemove-assets/business/visitor_app/bundle.js";
  document.head.appendChild(va);

  // Install CSS
  var csva = document.createElement('link');
  csva.rel = "stylesheet";
  csva.type = "text/css";
  csva.href = "https://s3.amazonaws.com/salemove-assets/business/visitor_app/style_bundle.css";
  document.head.appendChild(csva);


})()
