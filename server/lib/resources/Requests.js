function Requests(uber) {
  this._uber = uber;
  this.path = 'requests';
}

module.exports = Requests;

// 'product_id'
var VEHICLES = {
  'uberX':'a1111c8c-c720-46c3-8534-2fcdd730040d',
  'uberXL': '821415d8-3bd5-4e27-9604-194e4359a449',
  'uberBLACK':'d4abaae7-f4d6-4152-91cc-77523e8165a4',
  'uberSUV': "8920cb5e-51a4-4fa4-acdf-dd86c5e18ae0",
  'uberTAXI': '3ab64887-4842-4c8e-9780-ccecd3a0391d'
}

Requests.prototype.makeRequest = function (query, callback) {
  if (!query.start_latitude && !query.start_longitude && 
    !query.end_latitude && !query.end_longitude) {
      return callback(new Error('Invalid parameters'));
    }

  // translate to actual product_id from car type
  query.product_id = VEHICLES[query.product_id];
  return this._uber.postSandbox({ url: this.path, params: query }, callback);
};