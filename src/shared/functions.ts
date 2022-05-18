import logger from './Logger';

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const pInfo = (...infoStrings: string[]) => {
    infoStrings.forEach(info => {
        if(info) {
            logger.info(info);
        }
    });
}

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

