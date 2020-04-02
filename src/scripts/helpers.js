export const isProd = location.hostname !== 'localhost'
                   && location.hostname !== '127.0.0.1'
                   && location.hostname.indexOf('192.168.') === -1
                   && location.hostname.indexOf('dev.') === -1