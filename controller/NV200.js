const SspLib = require('../nv200Driver/index');
let channels = [{ value: 0, country_code: 'CAD' }];

let serialPortConfig = {
    baudrate: 9600, // default: 9600
    databits: 8, // default: 8
    stopbits: 2, // default: 2
    parity: 'none' // default: 'none'
  };

let eSSP = new SspLib({
    id: 0x00,
    debug: process.env.NV200_DEBUG, // default: false
    timeout: 5000, // default: 3000
    encryptAllCommand: true, // default: true
    fixedKey: '0123456701234567' // default: '0123456701234567'
});

exports.StartNV2000 = async (ctx) => {
    try {
        eSSP.open('/dev/ttyUSB0', serialPortConfig)
        .then(() => eSSP.command('SYNC'))
        .then(() => eSSP.command('HOST_PROTOCOL_VERSION', { version: 6 }))
        .then(() => eSSP.initEncryption())
        .then(() => eSSP.command('GET_SERIAL_NUMBER'))
        .then(result => {
          console.log('SERIAL NUMBER:', result.info.serial_number);
          return;
        })
        .then(() => eSSP.command('SETUP_REQUEST'))
        .then(result => {
          for (let i = 0; i < result.info.channel_value.length; i++) {
            channels[result.info.channel_value[i]] = {
              value: result.info.expanded_channel_value[i],
              country_code: result.info.expanded_channel_country_code[i]
            };
          }
          return;
        })
        .then(() => eSSP.enable())
            .then(() => {
                ctx.res = {
                    ready: true,
                };
            console.log('GO!!!');
            
        })
        .catch(error => {
            console.log(error);
            ctx.res = {
                ready: false,
            };
        });
      
      
      eSSP.command('SET_CHANNEL_INHIBITS', {
        channels: [1, 1, 1, 1, 1, 1, 1, 1] // channel 1-3 enable
      });
      
    }

    catch(e) {
        console.log('Error happend While starting eSSP ', e.message)
       }
};

exports.EnableNV200 = async () => {
    try {
        eSSP.enable()
    }
    catch(e) {
        console.log('Error happend While enabling eSSP ', e.message)
       }
}

exports.DisableNV200 = async () => {
    try {
        eSSP.disable();
    }
    catch(e) {
        console.log('Error happend While disabling eSSP ', e.message)
       }
}

exports.DisconnectNV200 = async () => {
    try {
        eSSP.close();
    }
    catch(e) {
        console.log('Error happend While disconnecting eSSP ', e.message)
       }
 }



exports.MonitorEvent = async (ctx) => {


    try {
        eSSP.on('READ_NOTE', result => {
            console.log(result);
            ctx.res = {
                readNote: result,
            };
        })
    }catch(e) {
        console.log('Error happend While reading note ', e.message)
    }
    
    try {
        eSSP.on('NOTE_REJECTED', result => {
            console.log('NOTE_REJECTED', result);
    
            eSSP.command('LAST_REJECT_CODE')
                .then(result => {
                    console.log(result);
                    ctx.res = {
                        readNote: result,
                    };
                })
        })
    }
    catch(e) {
        console.log('Error happend While note rejected  ', e.message)
       }
}


