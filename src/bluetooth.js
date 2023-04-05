class PlaybulbCandle {

    constructor() {
      this.device = null;
      this.onDisconnected = this.onDisconnected.bind(this);
    }
    
    request() {
      let options = {
        "filters": [{
          "name": "PLAYBULB Candle"
        }],
        "optionalServices": [0xFF02]
      };
      return navigator.bluetooth.requestDevice(options)
      .then(device => {
        this.device = device;
        this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
      });
    }
    
    connect() {
      if (!this.device) {
        return Promise.reject('Device is not connected.');
      }
      return this.device.gatt.connect();
    }
    
    writeColor(data) {
      return this.device.gatt.getPrimaryService(0xFF02)
      .then(service => service.getCharacteristic(0xFFFC))
      .then(characteristic => characteristic.writeValue(data));
    }
  
    disconnect() {
      if (!this.device) {
        return Promise.reject('Device is not connected.');
      }
      return this.device.gatt.disconnect();
    }
  
    onDisconnected() {
      console.log('Device is disconnected.');
    }
  }
  
  var playbulbCandle = new PlaybulbCandle();
  
//   playbulbCandle.request().then(_=> playbulbCandle.connect())
  document.querySelector('button').addEventListener('click', event => {
    playbulbCandle.request()
    .then(_ => playbulbCandle.connect())
    .then(_ => { /* Do something with playbulbCandle... */
  
    console.log('hello');
    })
    .catch(error => { console.log(error) });
  });