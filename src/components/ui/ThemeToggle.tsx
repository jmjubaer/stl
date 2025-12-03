"use client";
import { MenuTheme, Switch } from "antd";
import React, { useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("dark");

    const changeTheme = (value: boolean) => {
        setTheme(value ? "dark" : "light");
    };
    return (
        <div>
            <Switch
                checked={theme === "dark"}
                onChange={changeTheme}
                checkedChildren='Dark'
                unCheckedChildren='Light'
            />
        </div>
    );
};

export default ThemeToggle;
