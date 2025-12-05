"use client";

import React, { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";

export const AntdThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
    useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) {
            setThemeMode(saved);    
        }

        document.documentElement.classList.toggle("dark", saved === "dark");
    }, []);
    return (
        <ConfigProvider
            theme={{
                algorithm:
                    themeMode === "dark"
                        ? theme.darkAlgorithm
                        : theme.defaultAlgorithm,
            }}>
            {children}
        </ConfigProvider>
    );
};
