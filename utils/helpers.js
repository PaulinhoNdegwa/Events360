import moment from 'moment';

export const getTime = (timestamp) => {
    return moment(timestamp).format("MMMM Do YYYY, h:mm:ss a")
}

export const getTimeDifference = (timestamp) => {
    return moment(timestamp).fromNow();
}
