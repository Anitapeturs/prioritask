// CALENDAR TO DISPLAY DAY OF WEEK

const calendar = (req, res, next) => {

    const now = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const calendar = {
        currentDate: now.toISOString().split('T')[0],
        currentDayOfWeek: daysOfWeek[now.getDay()],
    };

    

    req.calendar = calendar;

    next();
};

export default calendar;