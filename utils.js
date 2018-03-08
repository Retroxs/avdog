const Moment = require("moment");
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

module.exports = {
    time_range(startTime, endTime) {
        let start = moment().hours(startTime).minutes(0).second(0)
        let end = moment().hours(endTime).minutes(0).second(0)
        let range = moment.range(start, end);
        return range.contains(new Date())
    }
}
