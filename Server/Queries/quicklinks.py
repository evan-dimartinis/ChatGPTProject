import psycopg2
from datetime import datetime
from Queries.dbsetup import DB

class QuickLinks():
    def __init__(self):
        self.dbdetails = DB()
        self.conn = psycopg2.connect(
                host=self.dbdetails.host,
                database=self.dbdetails.database,
                user=self.dbdetails.user,
                password=self.dbdetails.dbpassword,
                port=2000
            )

    def get_user_quicklinks(self, userid):
        sql = "SELECT hmy, slabel, surl FROM quicklinks where bremoved = false and huser = %s ORDER BY hmy"
        record = (userid,)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            return cur.fetchall()
        except (TypeError, NameError, SyntaxError) as err:
            print(err)

    def insert_quicklink(self, userid, label, url):
        sql = "INSERT INTO quicklinks (huser, slabel, surl, bremoved) values (%s, %s, %s, false)"
        record = (userid, label, url)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            self.conn.commit()
            return self.get_user_quicklinks(userid)
        except (TypeError, NameError, SyntaxError) as err:
            print(err)
            return False
            
    def update_quicklink(self, userid, hmy, label, url):
        sql = "UPDATE quicklinks set slabel = %s, surl = %s where hmy = %s"
        record = (label, url, hmy)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            self.conn.commit()
            return self.get_user_quicklinks(userid)
        except:
            return False