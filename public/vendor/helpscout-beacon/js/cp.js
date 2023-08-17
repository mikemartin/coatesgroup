let script = document.createElement('script');
script.src = '/vendor/helpscout-beacon/js/beacon.js';

document.body.appendChild(script);

script.addEventListener('load', () => {

  let helpscout = Statamic.$config.get('helpscout')

  if (!helpscout || !helpscout.beacon_id) {
    return false;
  }

  if(helpscout.avatar) {
    helpscout.user["avatar"] = helpscout.user["website"] + helpscout.avatar;
  }

  window.Beacon('init', helpscout.beacon_id);

  window.Beacon('identify', helpscout.user);
});
