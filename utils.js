const Moment = require("moment");
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

module.exports = {
    time_range(startTime, endTime) {
        let start = moment.utc().utcOffset(8).hours(startTime).minutes(0).second(0)
        let end = moment.utc().utcOffset(8).hours(endTime).minutes(0).second(0)
        let range = moment.utc().utcOffset(8).range(start, end);
        return range.contains(new Date())
    }
}

