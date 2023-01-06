import psycopg2
import pytz
from datetime import datetime
import secrets
from .dbsetup import DB
import os

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
        conn = None
        token = ''
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
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            results = cur.fetchall()
            cur.close()
            if len(results) < 1:
                raise Exception('Username or password are incorrect. Please try again')
            else:
                #REGARDLESS WE'RE UPDATING THE TOKEN AND EXPIRATION DATE
                token = secrets.token_urlsafe()
                self.update_user_token(results[0][0], token)
                self.conn.close()
                return token
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        return token

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
