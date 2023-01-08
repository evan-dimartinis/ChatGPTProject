import psycopg2
from datetime import datetime
import secrets
from Queries.dbsetup import DB

class AuthDB():
    def __init__(self):
        self.dbdetails = DB()
        self.conn = psycopg2.connect(
                host=self.dbdetails.host,
                database=self.dbdetails.database,
                user=self.dbdetails.user,
                password=self.dbdetails.dbpassword,
                port=2000
            )
    
    def sign_up(self, username, password):
        sql = "SELECT hmy from gptuser where username = %s"
        record = (username,)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            results = cur.fetchall()
            if len(results) > 0:
                raise Exception('Username already exists')
            else:
                self.insert_user(username, password)
                return self.log_in_user(username, password)
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def insert_user(self, username, password):
        sql = "INSERT INTO gptuser (username, password) VALUES (%s, %s)"
        record = (username, password)
        try:
            # create a cursor
            cur = self.conn.cursor()
            # execute the INSERT statement
            cur.execute(sql, record)
            # commit the changes to the database
            self.conn.commit()
            # close the communication with the PostgreSQL database
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def log_in_user(self, username, password):
        sql = "SELECT hmy, session_token, expiration_dt from gptuser where username = %s and password = %s"
        record = (username, password)
        token = ''
        cur = self.conn.cursor()
        cur.execute(sql, record)
        results = cur.fetchall()
        print(results)
        cur.close()
        if len(results) < 1:
            return ('Username or password are incorrect. Please try again', 202)
        else:
            #REGARDLESS WE'RE UPDATING THE TOKEN AND EXPIRATION DATE
            token = secrets.token_urlsafe()
            print(token)
            self.update_user_token(results[0][0], token)
            self.conn.close()
            print(token)
            return (token, 200)

    def update_user_token(self, hmy, token):
        sql = "UPDATE gptuser set session_token = %s, expiration_dt = current_timestamp + interval '1 week' where hmy = %s"
        record = (token, hmy)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            self.conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def get_userid_with_token(self, token):
        sql = "SELECT hmy from gptuser where session_token = %s"
        record = (token,)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            results = cur.fetchall()
            cur.close()
            print(results)
            if len(results) > 0:
                self.update_user_token(results[0][0], token)
                return results[0][0]
            else:
                return 0
            
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
