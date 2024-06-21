// GOOGLE OAUTH
const OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:4000/auth/google/callback'
)

const scopes = [
  'http://www.googleapis.com/auth/userinfo.email',
  'http://www.googleapis.com/auth/userinfo.profile',
]

const authorizationUrl =  OAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scope: true,
})

// GOOGLE LOGIN
app.get('/auth/google', (req, res) => {
  res.redirect(authorizationUrl);
})

// GOOGLE CALLBACK
app.get('/auth/google/callback', (req, res) => {
  const { code } = req.query

  const { tokens } = OAuth2Client.getToken(code as String);

  OAuth2Client.setCredentials(tokens);

  const OAuth2 = google.OAuth2({
    auth: OAuth2Client,
    version:
  })
})