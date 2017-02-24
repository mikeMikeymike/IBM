class Bean {
  
  constructor() {
    // 3D scene
    this.scene = new Scene( '#scene' );

    // Bluetooth management
    // Event listeners
    this.bluetooth = new Bluetooth( '#bluetooth' );
    this.bluetooth.root.addEventListener( 
      Bluetooth.CONNECTED, 
      evt => this.doConnected( evt ) 
    );
    this.bluetooth.root.addEventListener( 
      Bluetooth.DISCONNECTED, 
      evt => this.doDisconnected( evt ) 
    );    
    this.bluetooth.root.addEventListener( 
      Bluetooth.ACCELEROMETER, 
      evt => this.doAccelerometer( evt ) 
    );
    this.bluetooth.root.addEventListener( 
      Bluetooth.TEMPERATURE, 
      evt => this.doTemperature( evt ) 
    );

    // Color picker
    this.picker = new Picker( '#picker' );
    this.picker.root.addEventListener( 
      Picker.COLOR,
      evt => this.doColor( evt )
    );

    // Thermometer
    this.thermometer = new Thermometer( '#thermometer' );
  }

  // Accelerometer data changed
  // Update 3D scene
  doAccelerometer( evt ) {
    this.scene.rotate( evt.detail.x, evt.detail.y );
  }

  // New color selection
  // Update device LED
  doColor( evt ) {
    this.bluetooth.color(
      evt.detail.red,
      evt.detail.green,
      evt.detail.blue
    );
  }

  // Connected to device
  // Show related controls
  doConnected( evt ) {
    // Debug
    console.log( 'Connected.' );

    // Show associated display
    this.picker.show();
    this.thermometer.show();
  }

  // Disconnected from device
  // Hide related controls
  doDisconnected( evt ) {
    // Debug
    console.log( 'Disconnected.' );

    // Hide associated display
    this.picker.hide();
    this.thermometer.hide();

    // Reset scene
    this.scene.rotate( 0, 0, 0 );
  }

  // Temperature data arrived
  // Show value in user interface
  doTemperature( evt ) {
    this.thermometer.value( evt.detail.temperature );
  }

}

// Instantiate application
let app = new Bean();