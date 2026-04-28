Write-Host "Mobile Shop API - Quick Test" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Gray

# Test 1: Health
Write-Host "`n1. Health Check" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -UseBasicParsing
    Write-Host "   ✅ Status: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Seed Admin
Write-Host "`n2. Seed Admin User" -ForegroundColor Yellow
try {
    $seed = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/seed-admin" -Method Post -UseBasicParsing
    Write-Host "   ✅ $($seed.message)" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️ $($_.Exception.Message)" -ForegroundColor Yellow
}

# Test 3: Login (with correct password escaping)
Write-Host "`n3. Login Test" -ForegroundColor Yellow
$password = "MSLMlk`$2402"
Write-Host "   Using password: $password" -ForegroundColor Gray

$loginBody = @{
    email = "lotchansm1612@gmail.com"
    password = $password
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/staff/login" -Method Post -Body $loginBody -ContentType "application/json" -UseBasicParsing
    Write-Host "   ✅ Login successful!" -ForegroundColor Green
    Write-Host "   Email: $($loginResponse.user.email)" -ForegroundColor Cyan
    Write-Host "   Role: $($loginResponse.user.role)" -ForegroundColor Cyan
    Write-Host "   Token: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor Gray
    
    # Test 4: Protected route
    Write-Host "`n4. Protected Route" -ForegroundColor Yellow
    $token = $loginResponse.token
    $profileData = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/profile" -Method Get -Headers @{Authorization = "Bearer $token"} -UseBasicParsing
    Write-Host "   ✅ Profile accessible" -ForegroundColor Green
    Write-Host "   ID: $($profileData.id)" -ForegroundColor Cyan
    Write-Host "   Name: $($profileData.name)" -ForegroundColor Cyan
    Write-Host "   Role: $($profileData.role)" -ForegroundColor Cyan
    
    Write-Host "`n🎉 ALL TESTS PASSED!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n⚠️ Try restarting the server with:" -ForegroundColor Yellow
    Write-Host "   Ctrl+C in terminal (to stop)" -ForegroundColor Gray
    Write-Host "   npm run dev (to restart)" -ForegroundColor Gray
}