// credit -> http://www.gregtrowbridge.com/a-basic-pathfinding-algorithm/
const aStar = function (startCoordinates, grid) {
  const distanceFromTop = startCoordinates[0];
  const distanceFromLeft = startCoordinates[1];

  const location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: "Start",
  };

  const queue = [location];
  while (queue.length > 0) {
    const currentLocation = queue.shift();

    var newLocation = exploreInDirection(currentLocation, "North", grid);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, "East", grid);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, "South", grid);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, "West", grid);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }
  }

  return false;
};

const getCurrentLocation = (x, y, grid) => {
  const nodeSize = 32;
  for (var i = 0, x_pos = 32; i < grid.length; i++, x_pos += nodeSize) {
    for (var j = 0, y_pos = 0; j < grid[i].length; j++, y_pos += nodeSize) {
      if (x >= x_pos && x < x_pos + nodeSize && y >= y_pos && y < y_pos + nodeSize) {
        const location = [];
        location.push(j);
        location.push(i);
        return location;
      }
    }
  }
};

const locationStatus = function (location, grid) {
  const gridSizeX = grid.length;
  const gridSizeY = grid[0].length;

  const dft = location.distanceFromTop;
  const dfl = location.distanceFromLeft;

  if (
    location.distanceFromLeft < 0 ||
    location.distanceFromLeft >= gridSizeX ||
    location.distanceFromTop < 0 ||
    location.distanceFromTop >= gridSizeY ||
    location.path.length * 32 > 32 * 20
  ) {
    return "Invalid";
  } else if (grid[dft][dfl] === "Goal") {
    return "Goal";
  } else if (grid[dft][dfl] !== "Empty") {
    return "Blocked";
  } else {
    return "Valid";
  }
};

const exploreInDirection = function (currentLocation, direction, grid) {
  const newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === "North") {
    dft -= 1;
  } else if (direction === "East") {
    dfl += 1;
  } else if (direction === "South") {
    dft += 1;
  } else if (direction === "West") {
    dfl -= 1;
  }

  const newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: "Unknown",
  };
  newLocation.status = locationStatus(newLocation, grid);

  if (newLocation.status === "Valid") {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = "Visited";
  }

  return newLocation;
};
