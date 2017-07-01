const scheme = 'http://'
const hostname = 'localhost';
const port = '8000';
const baseApi = scheme + hostname + ':' + port + '/api';

const innerTextSetter = (elementId, text) => {
  let el = document.getElementById(elementId);
  el.innerText = 'Response: ' + text;
};

const defaultErrorHandler = (err) => {
  console.log(err);
};

// GET /api/items
fetch(baseApi + '/items').then((response) => {
  return response.json();
}).then((json) => {
  innerTextSetter('get-api-items', JSON.stringify(json, null, 2));
}).catch(defaultErrorHandler);

// GET /api/items/{id}
fetch(baseApi + '/items/1').then((response) => {
  return response.json();
}).then((json) => {
  innerTextSetter('get-api-items-id', JSON.stringify(json, null, 2));
}).catch(defaultErrorHandler);

// POST /api/items
fetch(baseApi + '/items', {
  method: 'POST'
}).then((response) => {
  return response.text();
}).then((text) => {
  innerTextSetter('post-api-items', text);
}).catch(defaultErrorHandler);

// PUT /api/items/{id}
fetch(baseApi + '/items/123', {
  method: 'PUT'
}).then((response) => {
  return response.text();
}).then((text) => {
  innerTextSetter('put-api-items', text);
}).catch(defaultErrorHandler);

// DELETE /api/items/{id}
fetch(baseApi + '/items/99', {
  method: 'DELETE'
}).then((response) => {
  return response.text();
}).then((text) => {
  innerTextSetter('delete-api-items', text);
}).catch(defaultErrorHandler);


// WebSocket connection
const ws = new WebSocket('ws://localhost:8001');

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
