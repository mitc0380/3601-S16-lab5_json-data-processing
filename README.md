# CSCI 3601 Lab #5 - Processing JSON data from Mongo [![Build Status](https://travis-ci.org/mitc0380/3601-S16-lab5_json-data-processing.svg?branch=master)](https://travis-ci.org/mitc0380/3601-S16-lab5_json-data-processing)

During this lab you will complete a small project for a hypothetical customer, using all of the tools you have learned in
other labs. The new thing being introduced in this lab is the Yeoman generator. You will use it to manage laying out your project's basic directory structure and boilerplate details such as routing.

There is no "LABTASKS.md" for this lab, as you will be expected to follow the same agile practices that you will be using on
your final project.

## Setup
- Fork this repository (so that it is easy for us to keep track of your work).
- Use the generator to generate your project (see below).
- Make sure your application is called "studentsApp".
- Move the ``seed.js`` file into your config directory, overwriting the default one. 
- Add `server/config/environment/customerProd.js` to your .gitignore
- Once you have checked your .gitignore, add all the appropriate generated files to the repository and commit. 

> Protip: You can add all the files at once by right-clicking the top directory for the project, going to Git>, selecting Add. (or ctrl+alt+A).

## Using the generator to create your project
We are using yeoman generator: http://yeoman.io/generators/
Specifically, the angular-fullstack generator: https://github.com/DaftMonk/generator-angular-fullstack

This generator will set up a new project for you with a directory structure quite similar to the one you've been using
in previous labs, and will make it easier to manage adding new things to your project.

Run: ``yo angular-fullstack studentsApp`` in your project's main directory...
- Choose Scripting Language: ``Babel``
- Choose markup Language: ``HTML``
- Choose Stylesheet Language: ``CSS``
- Choose Router: ``uiRouter``
- Use Bootstrap = ``yes``
- Include UI Bootstrap = ``yes``
- Use mongoDB with Mongoose = ``yes``
- Scaffold authentication boilerplate = ``no``
- Use Socket.io = ``yes``
- Use Gulp or Grunt: ``Grunt``
- Write test with? ``Jasmine``
- Overwrite README.md? ``no``

> Protip: After generating a large project like this, Webstorm will take quite some time to index all the files.
This process is indicated by the progress bar at the bottom of the screen, and you should wait until it is done to try doing any actual work.

#### Using generators to add things to your project
Do not add routes, views, endpoints, api stuff, or anything else, by hand. Use the documentation for the angular-fullstack generator to see how you can add a route to your project. 

> Protip: Read the documentation for the angular-fullstack generator, which can be found in the README.md for the repository containing the generator. It will do A LOT of things for you so you can spend more time playing tetris and less time working.

You will need to generate a new endpoint using `yo angular-fullstack:endpoint student`


## Sample data
You are provided with sample data that can be used to initialize your test database (located in seed.js). Place this file into the/server/config/environment directory, and it will be used to seed your local test database.

## Testing
There are a lot of tests written for you by the generator, which include tests for the database API and routing. Some of these
can fail if you run them at the same time as when you have the project served.

As always, you should be following a TDD approach and writing tests for your application as you go. This means, you should get Travis-CI running for the project early on.

> Protip: READ THE DOCUMENTATION FOR THE ANGULAR-FULLSTACK GENERATOR. For real this time.

> Protip: A .travis.yml file is made for you now by the generator, so you shouldn't need to deal with that aspect of setting up Travis.

## User Stories
You should be keeping track of these throughout the course of the lab (an _iteration_, if you will). Before tearing into completing these stories for the customer, you should _weight_ these stories as a group. That is, you should assign these stories relative values indicating approximately how difficult you feel they will be or how much effort it will take to complete them. Your predictions don't have to be perfect, nor are they expected to be; however, put some real thought into this.

To keep track of progress on the stories throughout the course of the lab, you will use a _burndown chart_. Basically, this is a two-dimensional graph with time on the x-axis and work-remaining on the y-axis. The height of the y-axis will be determined by the total weight of your stories. (ie - if you have 65 points/units of work, your y-axis should probably go up to at least 65.) The x-axis range will correspond to the time you have for the lab; one way to do this is to show the number of days you have to work on it. Both scales should increase by even amounts (they should be linear). The idea behind the burndown chart is that you are able to view your progress as the lab progresses. At the start of the lab *cough* iteration *cough*, your chart will be at the top left. As each unit of time passes (days, class periods, lab periods, whatever), you mark how much remaining weight there is to finish. By the end of the lab, your burndown chart will have a y-value of 0 (no more weight remaining). You and your group can decide how you would like to make this; it could be through Google sheets, a hand-drawn graph, Excel, etc., but you need to be able to turn it in at the end of lab.

>Protip: **DO NOT** wait until the end of the lab to do this. One of the main purposes of a burndown chart is to allow you to see your own progress. We may come around to see interim burndown charts to ensure they are being made properly.

>Protip: Pick a way that works best for your entire team to have access to the burndown chart.

>Protip: Using some basic Mathematics, _shudder_, overall weight divided by overall time can tell you approximately how fast you need to work. The total points that a team feels they can get done when it comes to a regular iteration is referred to as their _velocity_. For this lab, stories are picked such that you are expected to get them all done. When the actual project begins, you and your customer will be deciding what to work on, and you will have to pick up stories with a weight that can be accomplished with what you feel your team's velocity is.

>Protip: Here's a pretty good example of a burndown chart (taken from quora.com): ![Pretty Nifty Example!](https://qph.is.quoracdn.net/main-qimg-350fed6a66aa0879e896d7715eb929f6?convert_to_webp=true)

#### Finally, the stories:

- [X] display a list of all students, ordered alphabetically by last name, first name.

- [X] display a list of all students, ordered by date of birth.

- [X] display a list of all students, ordered by the number of credits that they have successfully completed (i.e. excluding the in-progress credits and grade F courses).

- [X] view a list of students based on their major(s).

- [X] view detailed information for an individual student.

- [X] view all courses that a student has taken or is taking, with grades, including failed courses.

- [X] display a list of students with their GPA.

- [X] display students' status based on their completed courses (freshman, sophomore, junior, senior) and sort/search by these parameters.

- [X] search student records based on courses that they are taking or have taken.

## Switching to production mode with a remote database
In their infinite wisdom, your customer has decided to give you access to their live student database in order
to test your application more thuroughly. In order to set this up in a reasonable way, take the following steps:

The files that need to be modified: 

- Starting on line 515 of `Gruntfile.js` change the code block to:
```javascript
      env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      cProd: {
        NODE_ENV: 'customerProd'
      },
      all: localConfig
    },
```

- add the following new task to Gruntfile.js, after the other registered tasks:
```javascipt
  grunt.registerTask('customerProd', function (target) {
    grunt.task.run([
      'clean:server',
      'env:all',
      'env:cProd',
      'concurrent:pre',
      'concurrent:server',
      'injector',
      'wiredep:client',
      'postcss',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });
```
This will adda  new task `customnerProd` to your grunt tasks, so you will be able to run it from the grunt menu, just like `serve`. 
- change express.js as follows:
add `|| 'customerProd === env'` to the if statments on lines 75 and 79

- change the file customerProd.js in `/server/config/environment` to look as follows (but note that the password will be different from `passwordToBeProvided`, it will be provided to you at the beginning of the lab)
```javascript 
'use strict';
  mongo: {
    uri: 'mongodb://3601Lab:passwordToBeProvided@acrylic/softwareDev/?authSource=admin'
  }
};
```
**Make sure that your production.js is in .gitignore before entering the actual password.**

Once you have made all the changes, you should be able to run the production version by double-clicking on `serveProd` in the list of grunt tasks. **Important:** make sure to stop the `serve` task before starting the `serveProd` task. Note that you can alternate between the development task (with the test database) and the production task (with the remote database). The advantage of the test database is that you can change data in it to test for specific cases.   
