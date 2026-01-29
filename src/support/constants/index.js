export const config = {
    server: '10.100.122.34', // You can use 'localhost\\instance' to connect to named instance
    database: 'evGlobalConfig',

    options: {
        trustedConnection: true,
    }
};

export const smallPause = 1000;
export const mediumPause = 3000;
export const bigPause = 6000;
export const longPause = 10000;
export const extraLongPause = 30000;
export const hugePause = 60000;
export const extraHugePause = 120000;