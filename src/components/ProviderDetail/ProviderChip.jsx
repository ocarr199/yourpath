// ⬇ What we are importing from Material-ui
import { Grid, Chip, makeStyles } from '@material-ui/core'

// ⬇ The styling built in with material ui
const useStyles = makeStyles({
    chip : {
        marginBottom : '5px' 
    }
})

export default function ProviderChip ({clickable = true, tag, selectedTags, handleSelectTags}) {
   const styles = useStyles()
    return (
        <Grid item xs={4}>
            <Chip
                className={styles.chip}
                color={selectedTags.includes(tag.id) ? 'primary' : 'default'}
                key={tag.id}
                clickable={clickable}
                label={tag.name}
                onClick={() => handleSelectTags(tag)}
            />
        </Grid>
    )
}