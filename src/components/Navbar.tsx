///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React from 'react';

///////////////////////////////////////
// CLASS: NAVBAR
///////////////////////////////////////
interface NavbarProps {
  clearGrid?: () => void;
  visualizeDijkstra?: () => void;
  generateMaze?: () => void;
  changeAnimationSpeed?: () => void;
  instructions?: () => void;
}

const Navbar = ({
  clearGrid,
  visualizeDijkstra,
  generateMaze,
  changeAnimationSpeed,
  instructions,
}: NavbarProps): JSX.Element => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar navbar-dark navbar-expand justify-content-center">
        <div className="container p-2">
          <ul className="navbar-nav nav-justified w-100 text-center mt-1 items-center justify-center">
            <h4 className="hide-1200px">Pathfinding Visualizer</h4>
            {visualizeDijkstra && (
              <NavbarIcon
                icon="fa fa-map-marker fa-lg"
                iconTitle="Run Dijkstra"
                iconTitleID="visualizeDijkstrasIcon"
                iconFunction={() => visualizeDijkstra()}
              />
            )}
            {generateMaze && (
              <NavbarIcon
                icon="fa fa-balance-scale fa-lg"
                iconTitle="Generate Maze"
                iconTitleID="generateScatterIcon"
                iconFunction={() => generateMaze()}
              />
            )}
            {instructions && (
              <NavbarIcon
                icon="fa fa-question fa-lg"
                iconTitle="Instructions"
                iconFunction={() => instructions()}
              />
            )}
            {clearGrid && (
              <NavbarIcon
                icon="fa fa-th fa-lg"
                iconTitle="Clear Grid"
                iconFunction={() => clearGrid()}
              />
            )}
            {/*
            
            {changeAnimationSpeed && (
              <NavbarIcon
                icon="fa fa-fast-forward fa-lg"
                iconTitle="Change Speed"
                iconID="changeSpeedIcon"
                iconTitleID="changeSpeedTitle"
                iconFunction={() => changeAnimationSpeed()}
              />
            )}
            */}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;

///////////////////////////////////////
// INTERFACE: NAVBAR ICON
///////////////////////////////////////

interface NavbarIconProps {
  icon: string;
  iconTitle: string;
  iconTitleID?: string;
  iconID?: string;
  iconFunction: () => void;
}

///////////////////////////////////////
// COMPONENT: NAVBAR ICON
///////////////////////////////////////

const NavbarIcon = ({
  icon,
  iconID,
  iconTitle,
  iconTitleID,
  iconFunction,
}: NavbarIconProps): JSX.Element => {
  return (
    <li className="nav-item">
      <a
        href="#!"
        className="nav-link flex flex-row text-center items-center justify-center md:space-x-5 space-x-0 "
        data-toggle="collapse"
        onClick={iconFunction}>
        <span id={iconID} className={icon + ' hide-1000px'}></span>
        <span className="text-center">{iconTitle}</span>
      </a>
    </li>
  );
};
