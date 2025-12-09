@echo off
echo Starting local server...
echo.
echo Server will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.
cd template
python -m http.server 8080

