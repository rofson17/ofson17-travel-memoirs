import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({

    [theme.breakpoints.down('sm')]:
    {
        mainContainer: {
            flexDirection: 'column-reverse'
        }
    },
    [theme.breakpoints.down('md')]:
    {
        mainContainer: {
            flexDirection: 'row'
        }
    }
}));

