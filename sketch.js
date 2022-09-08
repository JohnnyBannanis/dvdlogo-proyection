let pMapper;
let menu;
let showingMenu = false;
let surfacesAmount = 2;


let surfaces = [];
let dvdLogos = [];
let dvd;

function preload() {
  dvd = loadImage('./assets/img/dvd_logo.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // create mapper object
  pMapper = createProjectionMapper(this);
  for (let index = 0; index < surfacesAmount; index++) {
    surfaces.push(pMapper.createQuadMap(640,	360)); //nHD for each surface
    dvdLogos.push(new DVD(surfaces[index], dvd));
  }
  // loads calibration in the "maps" directory
  pMapper.load("maps/map.json");

  menu = select("#menu_bar");
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  
  for (let index = 0; index < dvdLogos.length; index++) {
    dvdLogos[index].doTheThing();
  }

}

function keyPressed() {
  switch (key) {
    case 'c':
      // enter/leave calibration mode, where surfaces can be warped 
      // and moved
      pMapper.toggleCalibration();
      showingMenu = !showingMenu;
      toggleMenu();
      break;

    case 'l':
      // load calibration file
      pMapper.load("maps/map.json");
      break;

    case 's':
      // saves the calibration to map.json
      // change browser download location as needed
      pMapper.save("map.json");
      break;
    
    case 'a':
      // adds canvas with bouncing logo to the screen
      addSurface()
      break;
    
    case 'r':
      // removes canvas with bouncing logo to the screen
      removeSurface()
      break;
    
    //ADD MASKS W NUMBER
    //RM MASKS
    
  }
}

function addSurface(){
  surfaces.push(pMapper.createQuadMap(600, 400));
  dvdLogos.push(new DVD(surfaces[surfaces.length - 1], dvd));
  surfacesAmount ++;
}

function removeSurface(){
  pMapper.surfaces.splice(pMapper.surfaces.length - 1, 1);
  surfaces.splice(surfaces.length - 1, 1);
  dvdLogos.splice(dvdLogos.length - 1, 1);
  surfacesAmount > 0 ? surfacesAmount-- : surfacesAmount = 0 
}

function toggleMenu(){
  if (!showingMenu){
    menu.hide();
    return;
  }
  menu.show();
}
