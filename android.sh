curl -v \
-H 'Content-Type: application/json' \
-H 'Authorization: key=AAAAoyn6biU:APA91bH8cZtpMWC1dWyyVsaVOMi-_iJkjEFi9md0Rk8hhnvWf7lsm5_2mNvMMjpI42AR6v8DP4vH9FkQGiVjUlmLihUJAkG1qLsSeXnRCK-U09c6xykcQECi8M-h6tzb67lezMdgVG1I' \
https://fcm.googleapis.com/fcm/send \
-d '{
    "to":"dcZRwdQcQdu_R_6t2A_xTa:APA91bG2xgXg5EuF6eIKqm3l41B8UfQ1XmaHoMFvkoTrEAuTvQvFnMiz4jPDvF3vX_On4LQY0dMU79ZwMB0Imxt43Kt6qVkyPP7-mvaOib5dfetqopocbwmrjUMJPgW0JSXhU_Spyewk",
    "priority": "high",
    "topic": "all",
    "data": {
        "url": "https://www.google.com/" 
        },
    "notification": {
        "title": "Hey",
        "body": "Davinci is online", 
    },
}'
 
