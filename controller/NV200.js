const SspLib = require('../nv200Driver/index');

let serialPortConfig = {
    baudrate: 9600, // default: 9600
    databits: 8, // default: 8
    stopbits: 2, // default: 2
    parity: 'none' // default: 'none'
  };

let eSSP = new SspLib({
    id: 0x00,
    debug: false, // default: false
    timeout: 5000, // default: 3000
    encryptAllCommand: true, // default: true
    fixedKey: '0123456701234567' // default: '0123456701234567'
});

exports.StartNV2000 = async (ctx) => {
    try {
     
        await eSSP.on('OPEN', () => {
            console.log('open');
    
            eSSP.command('SYNC')
                .then(() => eSSP.command('HOST_PROTOCOL_VERSION', { version: 6 }))
                .then(() => eSSP.initEncryption())
                .then(() => eSSP.command('GET_SERIAL_NUMBER'))
                .then(result => {
                    console.log('SERIAL NUMBER:', result.info.serial_number)
                    return;
                })
                .then(() => eSSP.command('GET_FIRMWARE_VERSION'))
                .then(result => {
                    console.log('FIRMWARE VERSION:', result.info.version)
                    return;
                })
                .then(() => eSSP.enable())
                .then(result => {
                    if (result.status == 'OK') {
                        console.log('Device is active');
                        ctx.res = {
                            deviceStatus: 'Device is active',
                        };
                    }
                    return;
                })
        })
        try {
        
            await eSSP.open(process.env.COM_PORT,serialPortConfig);
        }
        catch(e) {
            console.log('Error happend opening eSSP  ', e.message)
           }
    }

    catch(e) {
        console.log('Error happend While starting eSSP ', e.message)
       }
};

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


