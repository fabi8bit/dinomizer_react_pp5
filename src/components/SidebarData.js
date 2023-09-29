import React from 'react'
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import ExtensionIcon from '@mui/icons-material/Extension';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const SidebarData = [
    {
        title: "Timeline",
        icon: <ViewTimelineIcon />,
        link: "/home"
    },
    {
        title: "Projects",
        icon: <WebAssetIcon />,
        link: "/projects"
    },
    {
        title: "My Contributions",
        icon: <ExtensionIcon />,
        link: "/mycontributions"
    },
    {
        title: "Profile",
        icon: <AccountBoxIcon />,
        link: "/profile"
    }
]


