import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({

    mainContainer: {
        [theme.breakpoints.down('sm')]:
        {
            flexDirection: 'column-reverse',
            alignItems: 'center'
        }
    },
    searchBar: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px'
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px'
    }
}));

