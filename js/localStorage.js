function saveInLocalStorage(key, value) {
  const value = JSON.stringify(value);
  localStorage.setItem(key, value);
}

function getDataFromLocalStorage(key) {
  const valueJSON = localStorage.getItem(key);
  const value = valueJSON ? JSON.parse(valueJSON) : null;
  return value;
}
