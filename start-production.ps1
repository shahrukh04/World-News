# World News Application - Production Mode (Local Testing)
Write-Host "Starting World News Application in Production Mode (Local Testing)..." -ForegroundColor Green
Write-Host ""

# Start Backend Server with Production Config
Write-Host "Starting Backend Server with Production Config..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev:prod" -WindowStyle Normal

# Wait for backend to start
Write-Host "Waiting 3 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Frontend Server with Production API
Write-Host "Starting Frontend Server with Production API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev:prod" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Backend: Using production configuration" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000 (connecting to production API)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Production URLs:" -ForegroundColor Magenta
Write-Host "Frontend: https://www.worldnew.in" -ForegroundColor Cyan
Write-Host "Backend: http://backendenv.eba-ptqvsdzi.eu-north-1.elasticbeanstalk.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")