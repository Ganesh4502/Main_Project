# Set Java 21 from Android Studio JBR
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
Write-Host "Starting Spotix Spring Boot Backend on http://localhost:8080/api/v1 ..." -ForegroundColor Cyan
Set-Location -Path (Join-Path $PSScriptRoot "backend")
.\mvnw.cmd spring-boot:run
