from flask import Flask, render_template, request, jsonify, Response
from dotenv import load_dotenv
from vt_api import query_virustotal
from models import save_lookup, get_recent_lookups
import os

load_dotenv()
app = Flask(__name__, template_folder='../frontend/templates')

@app.route('/', methods=['GET', 'POST'])
def home():
    result = None
    if request.method == 'POST':
        # Get form inputs
        ioc = request.form['ioc']
        notes = request.form.get('notes')

        # Query VirusTotal and enrich with analyst notes
        result = query_virustotal(ioc)
        result['notes'] = notes

        # Save to MongoDB (with stringified _id returned)
        result = save_lookup(result)

    return render_template('index.html', result=result)

@app.route('/history')
def history():
    # Display past IOCs queried
    lookups = get_recent_lookups()
    return render_template('history.html', lookups=lookups)

@app.route('/export')
def export():
    # Export lookups in CSV or JSON format
    format = request.args.get('format', 'csv')
    lookups = get_recent_lookups()

    # Convert ObjectId to string
    for item in lookups:
        item['_id'] = str(item['_id'])

    if format == 'json':
        return jsonify(lookups)
    elif format == 'csv':
        import csv, io
        output = io.StringIO()
        writer = csv.DictWriter(output, fieldnames=lookups[0].keys())
        writer.writeheader()
        writer.writerows(lookups)
        output.seek(0)
        return Response(output, mimetype="text/csv", headers={
            "Content-Disposition": "attachment; filename=export.csv"
        })

if __name__ == '__main__':
    app.run(debug=True)
