const HIGHLIGHTED = "H";
const MARKER_SMALL_SIZE = 16;
const MARKER_MEDIUM_OFFSET = 2;
const MARKER_LARGE_OFFSET = 4;
// internal marker flavors for cross referencing
const MARKERS = {
  MARKER_S: "marker-small",
  MARKER_SH: "marker-small-highlighted",
  MARKER_M: "marker-medium",
  MARKER_MH: "marker-medium-highlighted",
  MARKER_L: "marker-large",
  MARKER_LH: "marker-large-highlighted",
// CUSTOMIZATION (ADDED SOME constants)
  MARKER_GRAY_S: "marker-small-gray",
  MARKER_GREEN_S: "marker-small-green",
  MARKER_ORANGE_S: "marker-small-orange", 
  MARKER_RED_S: "marker-small-red",  

  MARKER_GRAY_SH: "marker-small-gray",
  MARKER_GREEN_SH: "marker-small-green",
  MARKER_ORANGE_SH: "marker-small-orange", 
  MARKER_RED_SH: "marker-small-red",

  MARKER_GRAY_M: "marker-medium-gray",
  MARKER_GREEN_M: "marker-medium-green",
  MARKER_ORANGE_M: "marker-medium-orange",
  MARKER_RED_M: "marker-medium-red",

  MARKER_GRAY_MH: "marker-medium-gray",
  MARKER_GREEN_MH: "marker-medium-green",
  MARKER_ORANGE_MH: "marker-medium-orange", 
  MARKER_RED_MH: "marker-medium-red",

  MARKER_GRAY_L: "marker-large-gray",
  MARKER_GREEN_L: "marker-large-green",
  MARKER_ORANGE_L: "marker-large-orange", 
  MARKER_RED_L: "marker-large-red",

  MARKER_GRAY_LH: "marker-large-gray",
  MARKER_GREEN_LH: "marker-large-green",
  MARKER_ORANGE_LH: "marker-large-orange",
  MARKER_RED_LH: "marker-large-red",
};
// hard coded aggregation of the different sizes available for markers
const SIZES = {
  S: "S",
  M: "M",
  L: "L",
};

export { HIGHLIGHTED, MARKER_LARGE_OFFSET, MARKER_MEDIUM_OFFSET, MARKER_SMALL_SIZE, MARKERS, SIZES };
