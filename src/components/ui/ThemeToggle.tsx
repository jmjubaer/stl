"use client";
import { MenuTheme, Switch } from "antd";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined") {
            return (
                (localStorage.getItem("theme") as "light" | "dark") || "light"
            );
        }
        return "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
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
                defaultChecked
            />
        </div>
    );
};

export default ThemeToggle;
