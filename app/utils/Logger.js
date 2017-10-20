const log = (level, color) => {
    return (...args) => {
        console.log(color, level, ...args, "\x1b[0m");
    }
};

const Logger = {
    info: log('info', "\x1b[32m"),
    debug: log('debug'),
    silly: log('silly'),
    error: log('error')
}

export default Logger;