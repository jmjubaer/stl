"use client";
import { MenuTheme, Switch } from "antd";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);
    const changeTheme = (value: boolean) => {
        const newTheme = value ? "dark" : "light";
        setTheme(newTheme);
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
