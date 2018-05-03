var user = {
  key: 'schoi+abtest@fubo.tv',
  custom: {
    groups: 'heavy-users',
  }
};

var ldclient = LDClient.initialize('573659fdd755f106d9000373', user);
    
function render() {
  abRender();
  mvRender();
  dvRender();
}

function abRender() {
  var abFlag = ldclient.variation('cta-color-abtest-demo', false);
  if (abFlag) {
    $('#abtest').addClass('grey-button');
  } else {
    $('#abtest').removeClass('grey-button');
  }
}

function mvRender() {
  var mvFlag = ldclient.variation('cta-color-multivariate-test-demo', false);

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
  $('#dvtest').css('background-color', dvColorFlag).css('border-color', dvColorFlag);

  var dvTextFlag = ldclient.variation('cta-text-dynamic-test-demo', false);
  $('#dvtest').text(dvTextFlag)
}

ldclient.on('ready', render);
ldclient.on('change', render);