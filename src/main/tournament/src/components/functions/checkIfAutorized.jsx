export default function doWeHaveToken() {
  const token = sessionStorage.getItem("token");
  if (token) {
    return isAutoraized(token);
  }
  return false;
}

async function isAutoraized(token) {
  const autorized = await fetch("api");
  if (autorized.status !== "ok") {
    return false;
  }
  return true;
}
