Write-Host "`n🧪 Mobile Shop API Test Suite (FIXED)" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Gray

$passCount = 0
$failCount = 0

# Test 1: Health
Write-Host "1️⃣ Health Endpoint (Public)" -ForegroundColor Yellow
try {
    $r = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -UseBasicParsing
    Write-Host "   ✅ Status: $($r.status)" -ForegroundColor Green
    $passCount++
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $failCount++
}

# Test 2: Seed Admin
Write-Host "`n2️⃣ Seed Admin User" -ForegroundColor Yellow
try {
    $r = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/seed-admin" -Method Post -UseBasicParsing
    Write-Host "   ✅ $($r.message)" -ForegroundColor Green
    Write-Host "   📧 $($r.email)" -ForegroundColor Cyan
    $passCount++
} catch {
    Write-Host "   ⚠️ $($_.Exception.Message)" -ForegroundColor Yellow
}

# Test 3: Login
Write-Host "`n3️⃣ Staff/Admin Login Test" -ForegroundColor Yellow
$body = @{ email = "lotchansm1612@gmail.com"; password = "MSLMlk`$2402" } | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/staff/login" -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
    $login = $response.data
    Write-Host "   ✅ Login successful!" -ForegroundColor Green
    Write-Host "   👤 $($login.user.email) ($($login.user.role))" -ForegroundColor Cyan
    $token = $login.token
    $passCount++
    
    # Test 4: Protected Route
    Write-Host "`n4️⃣ Protected Route Test" -ForegroundColor Yellow
    $profileResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/profile" -Method Get -Headers @{Authorization = "Bearer $token"} -UseBasicParsing
    $profile = $profileResponse.data.user
    Write-Host "   ✅ Profile accessible" -ForegroundColor Green
    Write-Host "   👤 $($profile.email) - $($profile.role)" -ForegroundColor Cyan
    $passCount++
} catch {
    Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $failCount++
}

Write-Host "`n========================================`n" -ForegroundColor Gray
if ($failCount -eq 0) {
    Write-Host "✅ Results: $passCount passed, $failCount failed" -ForegroundColor Green
} else {
    Write-Host "❌ Results: $passCount passed, $failCount failed" -ForegroundColor Red
}