from flask.helpers import send_from_directory
from flask_cors import cross_origin

from api import create_app

app = create_app()

@app.route('/')
@app.route('/register')
@app.route('/login')
@app.route('/profile')
@app.route('/questions/<subject>')
@app.route('/edit-questions/<subject>')
@cross_origin()
def serve(subject=None):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)