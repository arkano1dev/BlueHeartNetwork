import type React from "react"
import { Card, CardContent, Typography, Avatar, Grid, Box } from "@mui/material"

interface UserProfileProps {
  name: string
  bio: string
  avatarUrl: string
  testimonials: string[]
}

const UserProfile: React.FC<UserProfileProps> = ({ name, bio, avatarUrl, testimonials }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={name} src={avatarUrl} sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bio.replace("I joined Blue Hearts Network", "I joined Blue Pulse")}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography variant="subtitle1">About me:</Typography>
          <Typography variant="body2">
            Welcome to my profile! I'm excited to be part of the Blue Pulse community and share my experiences.
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">Testimonials:</Typography>
          {testimonials.map((testimonial, index) => (
            <Typography key={index} variant="body2">
              - {testimonial.replace("Blue Hearts partnership", "Blue Pulse partnership")}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserProfile
