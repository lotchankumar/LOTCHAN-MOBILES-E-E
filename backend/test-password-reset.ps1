# Test script for Admin Password Reset Feature
# Run this script to test the complete password reset workflow

param(
    [string]$AdminEmail = "lotchansm1612@gmail.com",
    [string]$BaseUrl = "http://localhost:5000/api/auth",
    [switch]$Interactive = $false
)

function Write-Section {
    param([string]$Title)
    Write-Host "`n" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Yellow
}

# Check if server is running
Write-Section "Checking Server Connection"
try {
    $null = Invoke-WebRequest -Uri "$BaseUrl/profile" -Method GET -ErrorAction Stop
} catch {
    Write-Error-Custom "Backend server is not running at $BaseUrl"
    Write-Info "Please start the backend server first: cd backend && npm run dev"
    exit 1
}
Write-Success "Backend server is running"

# Step 1: Request Password Reset
Write-Section "Step 1: Request Password Reset OTP"
Write-Host "Email: $AdminEmail" -ForegroundColor White

try {
    $response1 = Invoke-RestMethod -Uri "$BaseUrl/admin/request-password-reset" `
        -Method POST `
        -ContentType "application/json" `
        -Body "{`"email`":`"$AdminEmail`"}" `
        -ErrorAction Stop
    
    Write-Success "OTP requested successfully"
    Write-Host "Response:" -ForegroundColor White
    Write-Host ($response1 | ConvertTo-Json) -ForegroundColor Cyan
    
    # Extract message
    if ($response1.message) {
        Write-Info "Message: $($response1.message)"
        Write-Info "Valid for: $($response1.expiresIn)"
    }
} catch {
    Write-Error-Custom "Failed to request OTP"
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

# Step 2: Wait for user to input OTP
Write-Section "Step 2: Verify OTP"

if ($Interactive) {
    $otp = Read-Host "Enter the OTP sent to your email (6 digits)"
} else {
    # For automated testing, prompt to check console
    Write-Info "Check the backend console for the OTP in dev mode"
    Write-Info "OTP format: 6 digits"
    $otp = Read-Host "Enter the OTP"
}

# Validate OTP format
if ($otp -notmatch '^\d{6}$') {
    Write-Error-Custom "Invalid OTP format. Expected 6 digits."
    exit 1
}

try {
    $response2 = Invoke-RestMethod -Uri "$BaseUrl/admin/verify-otp" `
        -Method POST `
        -ContentType "application/json" `
        -Body "{`"email`":`"$AdminEmail`",`"otp`":`"$otp`"}" `
        -ErrorAction Stop
    
    Write-Success "OTP verified successfully"
    Write-Host "Response:" -ForegroundColor White
    Write-Host ($response2 | ConvertTo-Json) -ForegroundColor Cyan
    
    $resetToken = $response2.resetToken
    if (-not $resetToken) {
        Write-Error-Custom "No reset token received in response"
        exit 1
    }
    
    Write-Success "Reset token generated (valid for: $($response2.expiresIn))"
} catch {
    Write-Error-Custom "Failed to verify OTP"
    Write-Host $_.Exception.Message -ForegroundColor Red
    $errorResponse = $_.ErrorDetails.Message
    if ($errorResponse) {
        Write-Host "Error Details: $errorResponse" -ForegroundColor Red
    }
    exit 1
}

# Step 3: Reset Password
Write-Section "Step 3: Reset Admin Password"

$newPassword = Read-Host "Enter new password (minimum 8 characters)" -AsSecureString
$newPasswordText = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($newPassword))

$confirmPassword = Read-Host "Confirm new password" -AsSecureString
$confirmPasswordText = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($confirmPassword))

if ($newPasswordText -ne $confirmPasswordText) {
    Write-Error-Custom "Passwords do not match"
    exit 1
}

if ($newPasswordText.Length -lt 8) {
    Write-Error-Custom "Password must be at least 8 characters long"
    exit 1
}

try {
    $resetBody = @{
        email = $AdminEmail
        newPassword = $newPasswordText
        confirmPassword = $confirmPasswordText
    } | ConvertTo-Json
    
    $response3 = Invoke-RestMethod -Uri "$BaseUrl/admin/reset-password" `
        -Method POST `
        -ContentType "application/json" `
        -Headers @{"Authorization" = "Bearer $resetToken"} `
        -Body $resetBody `
        -ErrorAction Stop
    
    Write-Success "Password reset successfully!"
    Write-Host "Response:" -ForegroundColor White
    Write-Host ($response3 | ConvertTo-Json) -ForegroundColor Cyan
} catch {
    Write-Error-Custom "Failed to reset password"
    Write-Host $_.Exception.Message -ForegroundColor Red
    $errorResponse = $_.ErrorDetails.Message
    if ($errorResponse) {
        Write-Host "Error Details: $errorResponse" -ForegroundColor Red
    }
    exit 1
}

# Step 4: Verify new password works
Write-Section "Step 4: Verify New Password (Login Test)"

try {
    $loginResponse = Invoke-RestMethod -Uri "$BaseUrl/staff/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body "{`"email`":`"$AdminEmail`",`"password`":`"$newPasswordText`"}" `
        -ErrorAction Stop
    
    Write-Success "Login successful with new password!"
    Write-Host "Response:" -ForegroundColor White
    Write-Host ($loginResponse | ConvertTo-Json) -ForegroundColor Cyan
    Write-Info "Token: $($loginResponse.token.Substring(0, 50))..."
} catch {
    Write-Error-Custom "Failed to login with new password"
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

# Final Summary
Write-Section "Password Reset Test Completed Successfully"
Write-Success "All steps completed!"
Write-Host "
📋 Summary:
   • OTP generated and sent to email
   • OTP verified successfully
   • Password updated successfully
   • New password verified by login test

🔐 Your admin password has been successfully reset.
" -ForegroundColor Green

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
