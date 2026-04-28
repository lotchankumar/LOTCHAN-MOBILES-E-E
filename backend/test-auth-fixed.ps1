Write-Host "`n🧪 Mobile Shop API - Authentication Test (Fixed)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Gray

$passCount = 0
$failCount = 0

function Test-Health {
    Write-Host "`n1️⃣ Health Endpoint (Public)" -ForegroundColor Yellow
    try {
        $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -UseBasicParsing
        Write-Host "   ✅ Status: $($health.status)" -ForegroundColor Green
        Write-Host "   ⏰ Uptime: $([math]::Round($health.uptime, 2)) seconds" -ForegroundColor Gray
        $script:passCount++
    } catch {
        Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
        $script:failCount++
    }
}

function Test-SeedAdmin {
    Write-Host "`n2️⃣ Seed Admin User" -ForegroundColor Yellow
    try {
        $seed = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/seed-admin" -Method Post -UseBasicParsing
        Write-Host "   ✅ $($seed.message)" -ForegroundColor Green
        Write-Host "   📧 Email: $($seed.email)" -ForegroundColor Cyan
        Write-Host "   🔑 Password: $($seed.password)" -ForegroundColor Cyan
        Write-Host "   👑 Role: $($seed.role)" -ForegroundColor Cyan
        $script:passCount++
    } catch {
        Write-Host "   ⚠️ $($_.Exception.Message)" -ForegroundColor Yellow
        # Not counting as failure - might already be seeded
    }
}

function Test-Login {
    Write-Host "`n3️⃣ Login Test" -ForegroundColor Yellow
    
    # ESCAPE THE $ SIGN WITH BACKTICK - This is critical!
    $password = "MSLMlk`$2402"
    Write-Host "   Using password: $password" -ForegroundColor Gray
    
    $loginBody = @{
        email = "lotchansm1612@gmail.com"
        password = $password
    } | ConvertTo-Json
    
    try {
        $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/staff/login" `
            -Method Post `
            -Body $loginBody `
            -ContentType "application/json" `
            -UseBasicParsing
        
        Write-Host "   ✅ Login successful!" -ForegroundColor Green
        Write-Host "   👤 Email: $($loginResponse.user.email)" -ForegroundColor Cyan
        Write-Host "   👤 Role: $($loginResponse.user.role)" -ForegroundColor Cyan
        Write-Host "   🔐 Token received: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor Gray
        
        $script:passCount++
        return $loginResponse.token
    } catch {
        Write-Host "   ❌ Login failed: $($_.Exception.Message)" -ForegroundColor Red
        $script:failCount++
        return $null
    }
}

function Test-ProtectedRoute {
    param([string]$token)
    
    Write-Host "`n4️⃣ Protected Route Test" -ForegroundColor Yellow
    
    if (-not $token) {
        Write-Host "   ⚠️ Skipping - No token available" -ForegroundColor Yellow
        return
    }
    
    try {
        $profileData = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/profile" `
            -Method Get `
            -Headers @{Authorization = "Bearer $token"} `
            -UseBasicParsing
        
        Write-Host "   ✅ Profile accessible" -ForegroundColor Green
        Write-Host "   👤 ID: $($profileData.id)" -ForegroundColor Cyan
        Write-Host "   👤 Name: $($profileData.name)" -ForegroundColor Cyan
        Write-Host "   👤 Email: $($profileData.email)" -ForegroundColor Cyan
        Write-Host "   👑 Role: $($profileData.role)" -ForegroundColor Cyan
        
        $script:passCount++
    } catch {
        Write-Host "   ❌ Profile failed: $($_.Exception.Message)" -ForegroundColor Red
        $script:failCount++
    }
}

# Run tests
Test-Health
Test-SeedAdmin
$authToken = Test-Login
Test-ProtectedRoute -token $authToken

# Summary
Write-Host "`n====================================================" -ForegroundColor Gray
Write-Host "📊 Test Results:" -ForegroundColor Cyan
if ($failCount -eq 0) {
    Write-Host "✅ ALL TESTS PASSED! ($passCount/$passCount)" -ForegroundColor Green
} else {
    Write-Host "❌ Tests: $passCount passed, $failCount failed" -ForegroundColor Red
    Write-Host "   Check that:" -ForegroundColor Yellow
    Write-Host "   1. Server is running (npm run dev in backend)" -ForegroundColor Yellow
    Write-Host "   2. Database is initialized (npx prisma migrate dev)" -ForegroundColor Yellow
    Write-Host "   3. JWT_SECRET is set in .env file" -ForegroundColor Yellow
}

Write-Host "`n🔧 Quick fix commands:" -ForegroundColor Cyan
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npx prisma migrate reset --force" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
