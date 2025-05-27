import { Card, CardContent, Typography, Grid, Button } from "@mui/material"

const DonationPanel = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Support The Blue Pulse
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your contribution helps us continue our mission.
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Donation Target:</Typography>
            <Typography variant="body2">Blue Pulse Foundation</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Purpose:</Typography>
            <Typography variant="body2">Support our general fund</Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" mt={2}>
          Become a Blue Pulse member and help us make a difference.
        </Typography>

        <Typography variant="body2" mt={1}>
          We are an official Blue Pulse partner.
        </Typography>

        <Button variant="contained" color="primary" mt={2}>
          Donate Now
        </Button>
      </CardContent>
    </Card>
  )
}

export default DonationPanel
