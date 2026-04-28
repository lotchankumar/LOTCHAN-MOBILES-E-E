# ============================================================
# LOTCHAN MOBILES - Backend API Test Script
# Run from: C:\projects\LOTCHAN MOBILES E-E\backend
# Usage:    powershell -ExecutionPolicy Bypass -File test-api.ps1
# ============================================================

$BASE_URL = "http://localhost:5000/api"

# -- TEST 1: Health Check ------------------------------------
Write-Host ""
Write-Host "[1] Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$BASE_URL/health"
    $health | ConvertTo-Json
    Write-Host "PASS: Health OK" -ForegroundColor Green
} catch {
    Write-Host "FAIL: Health - $_" -ForegroundColor Red
}

# -- TEST 2: Seed Admin --------------------------------------
Write-Host ""
Write-Host "[2] Seeding Admin User..." -ForegroundColor Yellow
try {
    $seed = Invoke-RestMethod -Uri "$BASE_URL/auth/seed-admin" -Method Post
    $seed | ConvertTo-Json
    Write-Host "PASS: Seed OK" -ForegroundColor Green
} catch {
    Write-Host "FAIL: Seed - $_" -ForegroundColor Red
}

# -- TEST 3: Login -------------------------------------------
# IMPORTANT: Single quotes prevent PowerShell from expanding $2402 as a variable.
# Double quotes would send "MSLMlk" (empty $2402) and bcrypt compare would fail.
Write-Host ""
Write-Host "[3] Testing Login..." -ForegroundColor Yellow
try {
    $loginBody = @{
        email    = "lotchansm1612@gmail.com"
        password = 'MSLMlk$2402'
    } | ConvertTo-Json

    $login = Invoke-RestMethod -Uri "$BASE_URL/auth/login" `
        -Method Post `
        -Body $loginBody `
        -ContentType "application/json"

    Write-Host "PASS: Login successful!" -ForegroundColor Green
    Write-Host "      Token: $($login.token.Substring(0,50))..." -ForegroundColor Cyan
    $login.user | ConvertTo-Json

    $token = $login.token
} catch {
    Write-Host "FAIL: Login - $_" -ForegroundColor Red
    Write-Host "      Hint: password must use single quotes in this script" -ForegroundColor DarkYellow
    $token = $null
}

# -- TEST 4: Protected Route (Profile) -----------------------
Write-Host ""
Write-Host "[4] Testing Protected Route (Profile)..." -ForegroundColor Yellow
if ($null -eq $token) {
    Write-Host "SKIP: No token available (login failed above)" -ForegroundColor DarkYellow
} else {
    try {
        $profile = Invoke-RestMethod -Uri "$BASE_URL/auth/profile" `
            -Method Get `
            -Headers @{ Authorization = "Bearer $token" }
        $profile | ConvertTo-Json
        Write-Host "PASS: Profile OK" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: Profile - $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "--- BACKEND TESTS COMPLETE ---" -ForegroundColor Green
Write-Host ""
