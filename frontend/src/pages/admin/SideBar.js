import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const routes = [
    { path: "/", label: "Home", Icon: HomeIcon },
    { path: "/Admin/classes", label: "Classes", Icon: ClassOutlinedIcon },
    { path: "/Admin/subjects", label: "Subjects", Icon: AssignmentIcon },
    { path: "/Admin/teachers", label: "Teachers", Icon: SupervisorAccountOutlinedIcon },
    { path: "/Admin/students", label: "Students", Icon: PersonOutlineIcon },
    { path: "/Admin/notices", label: "Notices", Icon: AnnouncementOutlinedIcon },
    { path: "/Admin/complains", label: "Complains", Icon: ReportIcon },
    { path: "/Admin/profile", label: "Profile", Icon: AccountCircleOutlinedIcon },
    { path: "/logout", label: "Logout", Icon: ExitToAppIcon },
];

const SideBar = () => {
    const location = useLocation();

    return (
        <>
            {routes.map(({ path, label, Icon }) => (
                <ListItemButton key={path} component={Link} to={path}>
                    <ListItemIcon>
                        <Icon color={location.pathname.startsWith(path) ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>
                User
            </ListSubheader>
            {/* Add user-related links here if necessary */}
        </>
    );
};

export default SideBar;
