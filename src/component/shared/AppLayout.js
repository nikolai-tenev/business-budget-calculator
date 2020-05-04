import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {APPLICATION_DRAWER_WIDTH} from "../../configuration/ui";
import clsx from "clsx";
import {applicationContext} from "../../service/ApplicationContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import {ChevronLeft, Dashboard as DashboardIcon, ExposureNeg1, ExposurePlus1, Menu} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Link, withRouter} from "react-router-dom";
import {COST_PAGE_URL, DASHBOARD_PAGE_URL, INCOME_PAGE_URL} from "../../configuration/application-urls";
import {observer} from "mobx-react";
import Avatar from "@material-ui/core/Avatar";
import {Copyright} from "./Copyright";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper/Paper";
import {deepPurple} from "@material-ui/core/colors";

const css = (theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    toolbarLogo: {
        marginLeft: "auto",
        marginRight: "auto",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: deepPurple[900],
        color: "#fff"
    },
    appBarShift: {
        marginLeft: APPLICATION_DRAWER_WIDTH,
        width: `calc(100% - ${APPLICATION_DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: APPLICATION_DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        display: "flex",
        width: "100%"
    },
    container: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
        },
    },
    contentPaper: {
        padding: theme.spacing(2),
    }
});

@withRouter
@withStyles(css)
@observer
class AppLayout extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    render() {
        const {classes, title} = this.props;
        const uiService = applicationContext.uiService;


        return <div className={classes.root}>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !uiService.drawerOpen && classes.drawerPaperClose),
                }}
                open={uiService.drawerOpen}
            >
                <div className={classes.toolbarIcon}>
                    <Avatar className={classes.toolbarLogo} alt="DigidWorks" src="https://digidworks.com/android-chrome-512x512.png"/>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeft/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button component={Link} to={DASHBOARD_PAGE_URL}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem button component={Link} to={INCOME_PAGE_URL}>
                        <ListItemIcon>
                            <ExposurePlus1/>
                        </ListItemIcon>
                        <ListItemText primary="Income"/>
                    </ListItem>
                    <ListItem button component={Link} to={COST_PAGE_URL}>
                        <ListItemIcon>
                            <ExposureNeg1/>
                        </ListItemIcon>
                        <ListItemText primary="Cost"/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <AppBar className={clsx(classes.appBar, uiService.drawerOpen && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, uiService.drawerOpen && classes.menuButtonHidden)}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>{title}</Typography>
                    </Toolbar>
                </AppBar>
                <Container className={classes.container}>
                    <div className={classes.appBarSpacer}/>
                    <Paper className={classes.contentPaper}>
                        {this.props.children}
                    </Paper>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>;
    }

    handleDrawerOpen = () => {
        applicationContext.uiService.openDrawer();
    };

    handleDrawerClose = () => {
        applicationContext.uiService.closeDrawer();
    };
}

export default AppLayout;
