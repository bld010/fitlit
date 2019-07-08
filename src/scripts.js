console.log("Hello World");

const globalRepo = new UserRepository(userData);
let currentUser = new User(globalRepo.returnUser(getRandomNumber()));
let currentHydration = new Hydration(hydrationData, currentUser.id);
let currentSleep = new Sleep(sleepData, currentUser.id);
let sleepRepo = new SleepRepository(sleepData)
console.log('calling current sleep', currentSleep.returnDayHours("2019/06/23"))
let activity = new Activity(activityData, getRandomNumber());
let activityDay = activity.returnDay("2019/06/23");
let activityRepo = new ActivityRepository(activityData);
console.log(activityRepo);


// console.log(currentHydration);
// let activity = new Activity(activityData, getRandomNumber());
// let activityDay = activity.returnDay("2019/06/23");
// console.log(currentSleep.returnDayQual("2019/06/23"));

$(document).ready(function() {

  var $grid = $('.grid').packery({
    itemSelector: '.grid-item',
    columnWidth: 50,
    rowHeight: 40,
    gutter: 0,
  });

  var $draggables = $('.grid-item').draggabilly({
    // contain to parent element
    containment: true
  });

  // make all grid-items draggable
  $grid.find('.grid-item').each( function( i, gridItem ) {
    var draggie = new Draggabilly( gridItem );
    // bind drag events to Packery
    $grid.packery( 'bindDraggabillyEvents', draggie );
  });

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
  $('.main__section--activity--steps span').text(activityDay.numSteps.toLocaleString())
  $('.main__section--activity--miles span').text(activity.returnDailyMiles("2019/06/23"))
  $('.main__section--activity--minutes span').text(activityDay.minutesActive)
  $('.main__section--activity--flights span').text(activityDay.flightsOfStairs)
  $('.main__section--activity--empire span').text(activity.returnEmpireCount())
  $('.main__section--sleep--last-night span').first().text(currentSleep.returnDayHours("2019/06/23"))
  $('.main__section--sleep--last-night span').eq(1).text(currentSleep.returnDayQual("2019/06/23"))
  $('.main__section--sleep--averages span').first().text(currentSleep.returnAllTimeAvgHours())
  $('.main__section--sleep--averages span').eq(1).text(currentSleep.returnAllTimeAvgQual())
  $('.main__section--activity--world table tr td').eq(1).text(activityDay.numSteps.toLocaleString())
  $('.main__section--activity--world table tr td').eq(2).text(activityRepo.returnAvgSteps("2019/06/23").toLocaleString())
  $('.main__section--activity--world table tr td').eq(4).text(activityDay.minutesActive)
  $('.main__section--activity--world table tr td').eq(5).text(activityRepo.returnAvgMins("2019/06/23"))
  $('.main__section--activity--world table tr td').eq(7).text(activityDay.flightsOfStairs)
  $('.main__section--activity--world table tr td').eq(8).text(activityRepo.returnAvgStairs("2019/06/23"))
  $('.main__section--sleep--worst span').first().text(currentSleep.returnWorstDay("2019/06/23").date)
  $('.main__section--sleep--worst span').eq(1).text(currentSleep.returnWorstDay("2019/06/23").sleepQuality)
  $('.main__section--hydration--today span').text(currentHydration.returnIntakeByDay("2019/06/23"))


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

const ctx = $('#hydration-chart')
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
let sleepDays = sleepWeek.reduce((acc, day) => {
    let today = day;
    let newDate = today.date.split('/').filter(index => index.length !== 4).join('/');
    acc.push(newDate);
    return acc;
  }, []);

const ctx2 = $('#sleep-hours-chart')
const chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'horizontalBar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`${sleepDays[0]}`, `${sleepDays[1]}`, `${sleepDays[2]}`, `${sleepDays[3]}`, `${sleepDays[4]}`, `${sleepDays[5]}`, `${sleepDays[6]}`],
        datasets: [{
            label: 'My Last Week of Sleep in Hours',
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


const ctx3 = $('#step-goal-chart')
const chart3 = new Chart(ctx3, {
    // The type of chart we want to create
    type: 'polarArea', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`My Step Goal`, `Average Step Goal`,],
        datasets: [{
            label: 'My Step Goals',
            backgroundColor: ['green', 'black'],
            borderColor: 'black',
            borderWidth: 2,
            data: [`${currentUser.dailyStepGoal}`, `${globalRepo.returnAvgStepGoal()}`]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'My Step Goals'
        },
        legend: {
            display: false,
            position: 'bottom'
        }
    }

});


const ctx4 = $('#step-goal-chart-two')
const chart4 = new Chart(ctx4, {
    // The type of chart we want to create
    type: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`My Step Goal`, `Average Step Goal`,],
        datasets: [{
            label: 'My Step Goals',
            backgroundColor: ['green', 'black'],
            borderColor: 'black',
            borderWidth: 2,
            data: [`${currentUser.dailyStepGoal}`, `${globalRepo.returnAvgStepGoal()}`]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'My Step Goals'
        },
        legend: {
            display: false
        }
    }

});
// let sleepWeek = currentSleep.returnWeekHours("2019/06/23");
// // console.log(sleepWeek);
// let sleepDays = sleepWeek.reduce((acc, day) => {
//     let today = day;
//     let newDate = today.date.split('/').filter(index => index.length !== 4).join('/');
//     acc.push(newDate);
//     return acc;
//   }, []);

const ctx5 = $('#sleep-quality-chart')
const chart5 = new Chart(ctx5, {
    // The type of chart we want to create
    type: 'horizontalBar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`${sleepDays[0]}`, `${sleepDays[1]}`, `${sleepDays[2]}`, `${sleepDays[3]}`, `${sleepDays[4]}`, `${sleepDays[5]}`, `${sleepDays[6]}`],
        datasets: [{
            label: 'Sleep Quality Last Week',
            backgroundColor: 'grey',
            borderColor: 'black',
            borderWidth: 2,
            data: [`${sleepWeek[0].sleepQuality}`, `${sleepWeek[1].sleepQuality}`, `${sleepWeek[2].sleepQuality}`, `${sleepWeek[3].sleepQuality}`, `${sleepWeek[4].sleepQuality}`, `${sleepWeek[5].sleepQuality}`, `${sleepWeek[6].sleepQuality}`]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Sleep Quality this Week'
        },
        legend: {
            display: false
        }
    }

});

const ctx6 = $('#all-time-sleep-quality-chart')
const chart6 = new Chart(ctx6, {
    // The type of chart we want to create
    type: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`My Sleep Quality`, 'Average Sleep Quality'],
        datasets: [{
            label: 'Sleep Quality All Time',
            backgroundColor: ['yellow', 'blue'],
            borderColor: 'black',
            borderWidth: 1,
            data: [`${currentSleep.returnAllTimeAvgQual()}`, `${sleepRepo.returnAllSleepQual()}`]
        }
    ]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'My Average Sleep Quality'
        },
        legend: {
            display: false
        }
    }
});


const ctx7 = $('#all-time-sleep-hours-chart')
const chart7 = new Chart(ctx7, {
    // The type of chart we want to create
    type: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`My Sleep Hours`, 'Average Sleep Hours'],
        datasets: [{
            label: 'Sleep Hours All Time',
            backgroundColor: ['yellow', 'blue'],
            borderColor: 'black',
            borderWidth: 1,
            data: [`${currentSleep.returnAllTimeAvgHours()}`, `${sleepRepo.returnAllSleepHours()}`]
        }
    ]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'My Average Sleep Hours'
        },
        legend: {
            display: false
        }
    }
});


const ctx8 = $('#activity-metrics-yesterday')
const chart8 = new Chart(ctx8, {
    // The type of chart we want to create
    type: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    // The data for our dataset
    data: {
        labels: [`My Activity`, 'Average Activity'],
        datasets: [{
            label: 'My Steps',
            backgroundColor: ['red', 'grey'],
            borderColor: 'black',
            borderWidth: 1,
            data: [`${activityDay.numSteps}`, `${activityRepo.returnAvgSteps('2019/06/23')}`]
            
        },
        {
            label: 'Minutes Active',
            backgroundColor: ['red', 'grey'],
            borderColor: 'black',
            borderWidth: 1,
            data: [`${activityDay.minutesActive}`, `${activityRepo.returnAvgMins('2019/06/23')}`]
        },
        {
            label: 'Steps Climbed',
            backgroundColor: ['red', 'grey'],
            borderColor: 'black',
            borderWidth: 1,
            data: [`${activityDay.flightsOfStairs}`, `${activityRepo.returnAvgStairs('2019/06/23')}`]
        }

    ]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Activity Metrics'
        },
        legend: {
            display: true
        }
    }
});