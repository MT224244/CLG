import { app } from 'electron';
import path from 'path';
import log4js from 'log4js';

const isDev = import.meta.env.DEV;

export const initLogger = () => {
    log4js.configure({
        appenders: {
            file: {
                type: 'dateFile',
                filename: path.join(app.getPath('userData'), 'logs', 'app.log'),
                pattern: 'yyyy-MM-dd',
                keepFileExt: true,
                numBackups: 6,
                layout: {
                    type: 'pattern',
                    pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%c/%p]: %m',
                },
            },
            console: {
                type: 'console',
                layout: {
                    type: 'pattern',
                    pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%c/%[%p%]]: %m',
                },
            },
        },
        categories: {
            default: {
                appenders: ['console'],
                level: 'all',
            },
            main: {
                appenders: ['file', 'console'],
                level: isDev ? 'all' : 'info',
            },
            renderer: {
                appenders: ['file', 'console'],
                level: isDev ? 'all' : 'info',
            },
        },
    });

    const mainLogger = log4js.getLogger('main');
    console.debug = mainLogger.debug.bind(mainLogger);
    console.log = mainLogger.debug.bind(mainLogger);
    console.info = mainLogger.info.bind(mainLogger);
    console.warn = mainLogger.warn.bind(mainLogger);
    console.error = mainLogger.error.bind(mainLogger);
};

export const rendererLogger = log4js.getLogger('renderer');
