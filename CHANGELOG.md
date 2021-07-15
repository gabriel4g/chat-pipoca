#  21.07.1dev

[2021/07]

### New updates
 - Logged - middleware to check if the user is logged in
 - CHANGELOG - file for updating and design changes
 - kernel - logged added to the name register
 - views/home - update home page
 - Login/routes - added middleware('logged')
 - Login/routes - added route "/logout"
 - Register/routes - add middleware('logged')
 - env - added env.testing
 - automatic tests added

### Corrections
 - LoginController - add "await" from auth.login
 - home - added home title
 - views/notification - updated auth.user.username to "auth.user.name"
 - style - nav-border decoration and margin

### Tests added
 - Database - test connection
