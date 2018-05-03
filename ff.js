var user = {
  key: 'schoi+workshop@fubo.tv',
  custom: {
    groups: 'heavy-users',
  }
};

var ldclient = LDClient.initialize('573659fdd755f106d9000373', user);
    
function render(flags) {
  abRender();
  mvRender();
  dvRender();
}

function identifyFlag(k,v) {

  var traits = {};
  traits['ldFlags-'+k] = v;
  analytics.identify(user.key, traits);

}

function identifyFlagChange(flags) {

  var traits = {};
  for (var k in flags) {
    traits['ldFlags-'+k] = flags[k];
  }
  analytics.identify(user.key, traits);
}

function abRender() {
  var abFlag = ldclient.variation('cta-color-abtest-demo', false);
  identifyFlag('cta-color-abtest-demo', abFlag);

  if (abFlag) {
    $('#abtest').addClass('grey-button');
  } else {
    $('#abtest').removeClass('grey-button');
  }
}

function mvRender() {
  var mvFlag = ldclient.variation('cta-color-multivariate-test-demo', false);
  identifyFlag('cta-color-multivariate-test-demo', mvFlag);

  switch (mvFlag) {
    case 'yellow':
      $('#mvtest').addClass('yellow-button');
      break;

    case 'red':
      $('#mvtest').addClass('red-button');      
      break; 

    case 'black':
      $('#mvtest').addClass('black-button');
      break;

    default:
      $('#mvtest').removeClass('yellow-button');
      $('#mvtest').removeClass('red-button');
      $('#mvtest').removeClass('black-button');
  }
}

function dvRender() {
  var dvColorFlag = ldclient.variation('cta-color-dynamic-test-demo', false);
  identifyFlag('cta-color-dynamic-test-demo', dvColorFlag);

  $('#dvtest').css('background-color', dvColorFlag).css('border-color', dvColorFlag);

  var dvTextFlag = ldclient.variation('cta-text-dynamic-test-demo', false);
  identifyFlag('cta-text-dynamic-test-demo', dvTextFlag);

  $('#dvtest').text(dvTextFlag)
}

ldclient.on('ready', render);
ldclient.on('change', render);
ldclient.on('change', identifyFlagChange)

$('.btn').click(function(){
  analytics.track('clicked some button');
})
