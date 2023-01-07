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
        sql = "SELECT hmy, slabel, surl FROM quicklinks where bremoved = 0 and huser = %s"
        record = (userid,)
        try:
            cur = self.conn.cursor()
            cur.execute(sql, record)
            return cur.fetchall()
        except any as err:
            print(err)
            