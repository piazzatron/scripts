#!/usr/bin/env bash

# Must download:
# https://github.com/AlexanderWillner/things.sh

# Get a random article
ARTICLE=$(things.sh all | grep "Articles and Videos" | sort -R | head -n 1)

# Get just the title
TITLE=$(echo $ARTICLE | cut -d '|' -f 2)

# Search for the article to get the whole thing
SEARCHED=$(things.sh -s "${TITLE}" search)

# Grab the link by sending $SEARCHED into awk,
# splitting on the delimiter '|', and then printing the last value
LINK=$(echo $SEARCHED | awk '{n=split($0, a, "|"); print a[n];}')

# Make the email body
# Configured Postfix using:
# https://blog.travismclarke.com/post/send-email-from-terminal/
# Send it
SUBJECT="Things Article of the day: $TITLE"
BODY="
  $TITLE </br>
  <a href="$LINK">$LINK</a> </br>
  </br>
  w love,</br>
  - you
"
(
  echo To: michael.piazza@hey.com
  echo "Content-Type: text/html; "
  echo "Subject: $SUBJECT"
  echo
  echo $BODY
) | sendmail -t
