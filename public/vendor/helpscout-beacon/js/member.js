(function () {
  const script = document.createElement('script');
  script.src = '/vendor/helpscout-beacon/js/beacon.js';
  script.addEventListener('load', function () {
    const beaconData = window.__HELPSCOUT_BEACON__;
    if (!beaconData || !beaconData.beacon_id) {
      return false;
    }
    window.Beacon('init', beaconData.beacon_id);
    window.Beacon('identify', beaconData.user);
  });
  document.body.appendChild(script);
})();
