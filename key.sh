curl -X POST \
  https://accounts.zoho.com/oauth/v2/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'code=YOUR_AUTHORIZATION_CODE&client_id=1000.P03EHBA236UG1J29M6YTRK7O8RBTMU&client_secret=6d41ccbd7aa7f62ced42f96314656cb10197673d33&redirect_uri=YOUR_REDIRECT_URI&grant_type=authorization_code'
```

Replace the following placeholders in the command:

- `YOUR_AUTHORIZATION_CODE`: The authorization code obtained after authorizing your client application.
- `YOUR_CLIENT_ID`: The client ID obtained from the Zoho Developer Console.
- `YOUR_CLIENT_SECRET`: The client secret obtained from the Zoho Developer Console.
- `YOUR_REDIRECT_URI`: The redirect URI you provided in the Zoho Developer Console.