interface ImageImport {
  combat: { incisive: any; outriders: any; encircle: any };
  icons: any
}

export const Images: ImageImport = {
  combat: {
    incisive: require("../assets/images/incisive.png"),
    outriders: require("../assets/images/outriders.png"),
    encircle: require("../assets/images/encircle.png"),
  },
  icons: {
    "Adeptus Custodes": require("../assets/images/icons/Adeptus_Custodes.png"),
    "Adeptus Mechanicus": require("../assets/images/icons/Adeptus_Mechanicus.png")
  }
};
