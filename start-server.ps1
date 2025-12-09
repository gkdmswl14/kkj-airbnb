Write-Host "Starting local server..." -ForegroundColor Green
Write-Host ""
Write-Host "Server will be available at: http://localhost:8080" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
Write-Host ""
Set-Location template
python -m http.server 8080

