import psycopg2
import pytz
from datetime import datetime
import secrets
import db
import os

class AuthDB():
    def __init__(self):
        self.conn = psycopg2.connect(
                host=db.host,
                database=db.database,
                user=db.user,
                password=db.password,
                port=2000
            )
    

    def insert_user(self, username, password):
        sql = "INSERT INTO gptuser (username, password) VALUES (%s, %s)"
        record = (username, password)
        conn = None
        try:
            # create a cursor
            cur = self.conn.cursor()
            # execute the INSERT statement
            cur.execute(sql, record)
            # commit the changes to the database
            conn.commit()
            # close the communication with the PostgreSQL database
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    def log_in_user(self, username, password):
        sql = "SELECT session_token, expiration_dt from gptuser where username = %s and password = %s"
        record = (username, password)
        conn = None
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            results = cur.fetchall()
            if len(results) < 1:
                raise Exception('Username or password are incorrect. Please try again')
            else:
                # 0 = session_token, 1 = expiration_dt
                # FIGURE OUT THIS LOGIC BECAUSE THIS IS DENSE RN
                print(results)
                if results[0][1] is None or results[0][1] < datetime.now(pytz.utc):
                    print("no expiration token")
                    #GENERATE SESSION TOKEN AND INSERT INTO USER RECORD
                    token = secrets.token_urlsafe()
                    print(token)
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()
        return

    def update_user_token(self, hmy, token):
        sql = "UPDATE gptuser set token = %s expiration_dt = current_timestamp + interval '1 week' where hmy = %s"
        record = (token, hmy)
        conn = None
        try:
            conn = psycopg2.connect(
                host="localhost",
                database="GPTProject",
                user="postgres",
                password="Sinitramid19",
                port=2000
            )
            cur = conn.cursor()
            cur.execute(sql, record)
            results = cur.fetchall()
            if len(results) < 1:
                raise Exception('Username or password are incorrect. Please try again')
            else:
                # 0 = session_token, 1 = expiration_dt
                if results[0][1] is None or results[0][1] < datetime.now(pytz.utc):
                    print("no expiration token")
                    #GENERATE SESSION TOKEN AND INSERT INTO USER RECORD
                    token = secrets.token_urlsafe()
                    print(token)
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()
        return

a = AuthDB()
a.log_in_user('evandimar', 'password')