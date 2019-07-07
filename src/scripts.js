console.log("Hello World");

const globalRepo = new UserRepository(userData);
let currentUser = new User(globalRepo.returnUser(getRandomNumber()));
let currentHydration = new Hydration(hydrationData, currentUser.id);
let currentSleep = new Sleep(sleepData, currentUser.id);
let sleepRepo = new SleepRepository(sleepData)
console.log('calling current sleep', currentSleep.returnDayHours("2019/06/23"))
// console.log(currentHydration);
let activity = new Activity(activityData, getRandomNumber());
let activityDay = activity.returnDay("2019/06/23");
// console.log(currentSleep.returnDayQual("2019/06/23"));

$(document).ready(function(){
    $(".user-name").text(currentUser.returnFirstName())
    $(".user-steps").text(currentUser.dailyStepGoal)
    $(".avg-step-goal").text(globalRepo.returnAvgStepGoal())
    $("li").eq(0).text(currentUser.email)
    $("li").eq(1).text(currentUser.dailyStepGoal)
    $("li").eq(2).text(currentUser.strideLength)
    $("li").eq(3).text(currentUser.friends)
    $('.main__section--daily-intake').text(currentHydration.returnIntakeByDay("2019/06/23"))
    $('.main__section--average-intake').text(currentHydration.returnDailyAverage())
    $('.main__section--hydration-canvas').text(currentHydration.returnWeekIntake())
    $('.main__section--daily-sleep-hours').text(currentSleep.returnDayHours("2019/06/23"))
    $('.main__section--daily-sleep-quality').text(currentSleep.returnDayQual("2019/06/23"))
    $('.main__section--week-sleep-hours').text(currentSleep.returnWeekHours("2019/06/23"))
    $('.main__section--week-sleep-quality').text(currentSleep.returnWeekHours("2019/06/23"))
    $('.main__section--average-sleep-hours').text(currentSleep.returnAllTimeAvgHours())
    $('.main__section--average-sleep-quality').text(currentSleep.returnAllTimeAvgQual())
    $('.main__section--activity span').eq(0).text(activityDay.numSteps)
    $('.main__section--activity span').eq(1).text(activity.returnDailyMiles("2019/06/23"))
    $('.main__section--activity span').eq(2).text(activityDay.minutesActive)
    $('.main__section--activity span').eq(3).text(activityDay.flightsOfStairs)
    $('.main__section--activity span').eq(4).text(activity.returnEmpireCount())
});

function getRandomNumber() {
    let randNum = (Math.random() * 50) + 1;
    randNum = Math.floor(randNum);
    console.log(randNum);
    return randNum;
}
// Chart  Section //

Chart.defaults.global.defaultFontColor = 'black';

let hydrationWeekData = currentHydration.returnWeekIntake();
let hydrationDays = hydrationWeekData.reduce((acc, day) => {
    let today = day;
    let newDate = today.date.split('/').filter(index => index.length !== 4).join('/');
    acc.push(newDate);
    return acc;
  }, []);

const ctx = $('#hydrationChart')
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`${hydrationDays[0]}`, `${hydrationDays[1]}`, `${hydrationDays[2]}`, `${hydrationDays[3]}`, `${hydrationDays[4]}`, `${hydrationDays[5]}`, `${hydrationDays[6]}`],
        datasets: [{
            label: 'My Last Week of Hydration in Ounces',
            backgroundColor: 'blue',
            borderColor: 'black',
            borderWidth: 2,
            data: [`${hydrationWeekData[0].numOunces}`, `${hydrationWeekData[1].numOunces}`, `${hydrationWeekData[2].numOunces}`, `${hydrationWeekData[3].numOunces}`, `${hydrationWeekData[4].numOunces}`, `${hydrationWeekData[5].numOunces}`, `${hydrationWeekData[6].numOunces}`]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Water Intake This Week'
        },
        legend: {
            display: false
        }
    }

});

let sleepWeek = currentSleep.returnWeekHours("2019/06/23");
// console.log(sleepWeek);
let sleepDays = sleepWeek.reduce((acc, day) => {
    let today = day;
    let newDate = today.date.split('/').filter(index => index.length !== 4).join('/');
    acc.push(newDate);
    return acc;
  }, []);

const ctx2 = $('#sleepHoursChart')
const chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`${sleepDays[0]}`, `${sleepDays[1]}`, `${sleepDays[2]}`, `${sleepDays[3]}`, `${sleepDays[4]}`, `${sleepDays[5]}`, `${sleepDays[6]}`],
        datasets: [{
            label: 'My Last Week of Hydration in Ounces',
            backgroundColor: 'grey',
            borderColor: 'black',
            borderWidth: 2,
            data: [`${sleepWeek[0].hoursSlept}`, `${sleepWeek[1].hoursSlept}`, `${sleepWeek[2].hoursSlept}`, `${sleepWeek[3].hoursSlept}`, `${sleepWeek[4].hoursSlept}`, `${sleepWeek[5].hoursSlept}`, `${sleepWeek[6].hoursSlept}`]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Hours Slept this Week'
        },
        legend: {
            display: false
        }
    }

});

