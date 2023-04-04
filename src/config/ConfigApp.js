//////////////////// CONFIG APP

import Constants from "expo-constants";

const isStandAloneApp = Constants.appOwnership == "standalone";

const ConfigApp = {
    // backend url (with slash at end)
    URL: "https://www.gym.techrepublica.com/",

    DEFAULTLANG: "en",

    THEMEMODE: "light", // light or dark

    // testdevice id, DON'T CHANGE IT
    TESTDEVICE_ID: isStandAloneApp ? "EMULATOR" : "EMULATOR",
};

export default ConfigApp;
