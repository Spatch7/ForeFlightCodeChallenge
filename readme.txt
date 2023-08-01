---- To activate virtual session ----
Make sure you are in the folder <app>
Windows:
    .venv\Scripts\activate
    pip install -r requirements.txt
Linux/Mac
    .venv/bin/activate
    pip install -r requirements.txt

---- Start Server ----
Windows:
    yarn startWin
or
    waitress-serve --listen=:5000 main:app
    

Linux/Mac:
    yarn startUni
or
    gunicorn -b :5000 main:app