const API_BASE_URL = ENV.API_BASE_URL;
const WEB_SOCKET_URL = ENV.WEB_SOCKET_URL;

const innerTextSetter = (elementId, text) => {
  let el = document.getElementById(elementId);
  el.innerText = 'Response: ' + text;
};

const defaultErrorHandler = (err) => {
  console.log(err);
};

// GET /api/items
fetch(API_BASE_URL + '/items').then((response) => {
  return response.json();
}).then((json) => {
  innerTextSetter('get-api-items', JSON.stringify(json, null, 2));
}).catch(defaultErrorHandler);

// GET /api/items/{id}
fetch(API_BASE_URL + '/items/1').then((response) => {
  return response.json();
}).then((json) => {
  innerTextSetter('get-api-items-id', JSON.stringify(json, null, 2));
}).catch(defaultErrorHandler);

// POST /api/items
fetch(API_BASE_URL + '/items', {
  method: 'POST'
}).then((response) => {
  return response.text();
}).then((text) => {
  innerTextSetter('post-api-items', text);
}).catch(defaultErrorHandler);

// PUT /api/items/{id}
fetch(API_BASE_URL + '/items/123', {
  method: 'PUT'
}).then((response) => {
  return response.text();
}).then((text) => {
  innerTextSetter('put-api-items', text);
}).catch(defaultErrorHandler);

// DELETE /api/items/{id}
fetch(API_BASE_URL + '/items/99', {
  method: 'DELETE'
}).then((response) => {
  return response.text();
}).then((text) => {
  innerTextSetter('delete-api-items', text);
}).catch(defaultErrorHandler);


// WebSocket connection
const ws = new WebSocket(WEB_SOCKET_URL);

document.forms.publish.onsubmit = function () {
  let outMsg = this.message.value;
  ws.send(outMsg);
  return false;
};

const showMsg = (msg) => {
  let msgElem = document.createElement('div');
  msgElem.appendChild(document.createTextNode(msg));
  document.getElementById('subscribe').appendChild(msgElem);
};

ws.onmessage = (event) => {
  let inMsg = event.data;
  showMsg(inMsg);
};
