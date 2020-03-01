export const accessTokenSpotify = (changeUrl = "") => {
  let hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {

      if (item) {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }

      return initial;
    }, {});

  // window.location.hash = changeUrl;

  return hash;
}
