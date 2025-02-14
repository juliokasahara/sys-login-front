import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/home";
import Profile from "../pages/profile";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <AppDrawer.Navigator>
            
            <AppDrawer.Screen
                name="Home"
                component={Home}
            />

            <AppDrawer.Screen
                name="Profile"
                component={Profile}
            />

        </AppDrawer.Navigator>
    );
}

export default AppRoutes;