import psycopg2
from datetime import datetime
from Queries.dbsetup import DB

class Requests():
    def __init__(self):
        self.dbdetails = DB()
        self.conn = psycopg2.connect(
                host=self.dbdetails.host,
                database=self.dbdetails.database,
                user=self.dbdetails.user,
                password=self.dbdetails.dbpassword,
                port=2000
            )
    
    def insert_request(self, userid, label, requesttext):
        sql = "INSERT INTO requests (huser, srequest, bremoved, slabel) values (%s, %s, false, %s)"
        record = (userid, requesttext, label)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            return self.get_requests(userid)
        except Exception as err:
            print(err)
            return False

    def get_requests(self, userid):
        sql = "SELECT hmy, slabel, srequest from requests where huser = %s and bremoved = false"
        record = (userid,)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            return cur.fetchall()
        except Exception as err:
            print(err)
            return False