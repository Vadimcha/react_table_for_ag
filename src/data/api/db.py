import sqlite3
from sqlite3 import Error
import json
import traceback

def create_connection(path):
    connection = None
    try:
        connection = sqlite3.connect(path)
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

def print_table(table: str) -> list:
    connection = create_connection("journal_ag_bot/journal_ag_bot.sqlite")
    # connection = create_connection("src/data/api/journal_ag_bot.sqlite")
    query = f"SELECT * from {table}"
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        column_names = [i[0] for i in cursor.description]
        j_dump = []
        for i in result:
            j_dump.append(dict(zip(column_names,i)))
        json_results = json.loads(json.dumps(j_dump))
        res= {}
        for item in json_results:
            res[json_results.index(item)] = item
        connection.close()
        return res
    except Error as e:
        connection.close()
        print(f"The error '{e}' occurred")
    
if __name__ == "__main__":
    data = print_table("database")
    print(data)