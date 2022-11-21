
function ClickSubmit(e)
{
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute('6Ld7VyIjAAAAACZ86buFRtsfol62JVqAsUbWZmtY', {action: 'submit'}).then(function(token) {
          // Add your logic to submit to your backend server here.
      });
    });
    console.log("demo Recapche");
}