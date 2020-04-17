var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;

function setup() {
  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");

  //createCanvas(640, 360);
  target = "To be or not to be.";
  popmax = 200;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}

function draw() {
  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) 
  {
    //println(millis()/1000.0);
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  // Display current status of population
  var answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  var statstext = "total generations:     " + population.getGenerations() + "<br>";
  statstext += "average fitness:       " + floor(100*population.getAverageFitness()) + "<br>";
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}