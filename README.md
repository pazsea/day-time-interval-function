## 🕜 Day/Time interval checker

I wanted to create a function that I could just enter which days and at what range of time during those days a function would run.
Also this function would run at that time every week.
For example: If I had a store that is open between 10:00 - 15:00 every monday, I would like to run a function that changes from "closed" paragraph to an "open" paragraph and vice versa.

So I created this npm package! Hope it works well!
Keep on reading to see how you can implement it.

## What’s In This Document

- [How to install](#-install)
- [How to use this function](#-how-to-use-this-function)

## ⚡️ Install:

In your root folder for you project, open up an terminal and enter:

```shell
npm i day-interval-function

```

## 💻 How to use this function

**1.** Import the function into you project.

```shell
import { intervalChecker } from "day-interval-function";

```

**2.** Create the options oject containing your settings.

Write your timezone and time format. This package supports both 24 and 12 hour format.

```shell
const options = {
myTimeZone: "Europe/Stockholm",
timeFormat: 24,
}

```

**3.** Create the dayAndTimeSlots variable

Enter which days and time slots that you want your own function to run. First string in time slot array is the start time and the second is the ending time. Doesnt support range over midnight. For that you need to change two days to true.

```shell
const daysAndTimeSlots = [
 {
 sunday: true,
 time: ["05:00", "22:00"],
 },
 {
 monday: false,
 time: ["05:00", "22:00"],
 },
 {
   tuesday: true,
 time: ["05:00", "22:00"],
 },
 {
 wednesday: false,
 time: ["15:00", "21:00"],
 },
 {
 thursday: true,
 time: ["05:00", "22:00"],
 },
 {
 friday: false,
 time: ["20:00", "21:00"],
 },
 {
 saturday: false,
 time: ["11:00", "02:59"],
 },
 ]

```

The function checks which days are true and if that day is today. Then it checks if the current time is within the range that you have selected.

**IF YOU ARE USING THE 12 HOUR FORMAT** <br>
Remember that you have to change the option timeformat in the first step to 12. You also have to write your time slots in this way:

```shell
time: ["09:00 am", "09:00 pm"],

```

Otherwise the function cannot run and will display an console log telling you so.

**4.** Run the function

As you can see the function you get require four arguments although one is optional. First is the days and time slots you have selected, second is the options, third is what function you want to run at that given time, and fourth is what function you want to run when time is NOT in your time slots. It is possible to run without the functionWithinRange or functionOutOfRange but remember to defined that as null before you continue.

```shell
intervalChecker(daysAndTimeSlots, options, functionWithinRange, functionOutOfRange)

```

   <br>
   If you periodically need to check if the time slot has occured and then run your own function, you could use a setInterval like so (this runs the intervalChecker function every 5 minutes):
   
   ```shell
   setInterval(() => {
  intervalChecker(daysAndTimeSlots, options, functionWithinRange, functionOutOfRange)
}, 300000)

```