import React from "react";
import Typography from "@material-ui/core/Typography";

export const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Made with \u2764 by '}<a href="https://digidworks.com" target="_blank" rel="noopener noreferrer">DigidWorks</a>© {new Date().getFullYear()}{'.'}
    </Typography>
);
