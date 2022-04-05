// Each Type has its own enumeration

// Tab Type - Information associated with each tab
const TabType = {
    // Tabs for the Headers
    HOME: {
        name: "Home",
        route: "/explore",
    },
    EXPLORE: {
        name: "Explore",
        route: "/explore",
    },
    SUBSCRIPTIONS: {
        name: "Subscriptions",
        route: "/subscriptions"
    },
    CONTENT: {
        name: "Content",
        route: "/content/?id"
    },
    // Tabs for the drop down menu
    PROFILE: {
        name: "Profile",
        route: "/profile"
    },
    LOGIN: {
        name: "Login",
        route: "/login"
    },
    LOGOUT: {
        name: "Logout",
        route: "/logout"
    }
};

// Types of authenitcation states - Essentially logged in and not
const authType = {
    LOGGEDIN: {
        headerPages: [TabType.EXPLORE, TabType.SUBSCRIPTIONS],
        menuPages: [TabType.VIEW_PROFILE, TabType.LOGOUT]
    },
    GUEST: {
        headerPages: [TabType.EXPLORE],
        menuPages: [TabType.LOGIN]
    }
};

// Export
export {
    TabType,
    authType,
};