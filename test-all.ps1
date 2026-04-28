Write-Host "`n🧪 LOTCHAN MOBILES - Full System Test" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Gray

$backendOk = $false
$frontendOk = $false
$customerAppOk = $false
$dbOk = $false

# 1. Backend
Write-Host "1️⃣ Backend API" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -ErrorAction Stop
    Write-Host "   ✅ API: $($health.status)" -ForegroundColor Green
    $backendOk = $true
} catch {
    Write-Host "   ❌ Backend not running - Run: cd backend && npm run dev" -ForegroundColor Red
}

# 2. Frontend (Manager Dashboard)
Write-Host "`n2️⃣ Frontend (Manager Dashboard)" -ForegroundColor Yellow
try {
    $web = Invoke-WebRequest -Uri "http://localhost:5173" -ErrorAction Stop
    Write-Host "   ✅ Frontend running at http://localhost:5173" -ForegroundColor Green
    $frontendOk = $true
} catch {
    Write-Host "   ❌ Frontend not running - Run: cd frontend && npm run dev" -ForegroundColor Red
}

# 3. Customer Facing App
Write-Host "`n3️⃣ Frontend (Customer Facing App)" -ForegroundColor Yellow
try {
    $cust = Invoke-WebRequest -Uri "http://localhost:8080" -ErrorAction Stop
    Write-Host "   ✅ Customer App running at http://localhost:8080" -ForegroundColor Green
    $customerAppOk = $true
} catch {
    Write-Host "   ❌ Customer App not running - Run: cd customer-facing-app && npm run dev" -ForegroundColor Red
}

# 4. Database
Write-Host "`n4️⃣ Database" -ForegroundColor Yellow
if (Test-Path "backend/prisma/dev.db") {
    Write-Host "   ✅ SQLite database exists" -ForegroundColor Green
    $dbOk = $true
} else {
    Write-Host "   ⚠️ Database not found - Run: npx prisma migrate dev" -ForegroundColor Yellow
}

# Summary
Write-Host "`n========================================`n" -ForegroundColor Gray
if ($backendOk -and $frontendOk -and $customerAppOk -and $dbOk) {
    Write-Host "🎉 ALL SYSTEMS GO! Ready for GitHub push." -ForegroundColor Green
    Write-Host "`n📝 Login Credentials:" -ForegroundColor Cyan
    Write-Host "   Email: lotchansm1612@gmail.com" -ForegroundColor White
    Write-Host "   Password: MSLMlk`$2402" -ForegroundColor White
} else {
    Write-Host "⚠️ Fix issues above before proceeding." -ForegroundColor Red
}