# Test script for rate limiting
Write-Host "Testing rate limiting on /api/users endpoint..."

# Make 5 rapid requests
for ($i = 1; $i -le 5; $i++) {
    Write-Host "Request $i..."
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/api/users" -Method GET -ErrorAction SilentlyContinue
        Write-Host "  Status: $($response.StatusCode)"
        Write-Host "  Response: $($response.Content)"
        Write-Host ""
    } catch {
        Write-Host "  Error: $($_.Exception.Response.StatusCode)"
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $reader.BaseStream.Position = 0
            $reader.DiscardBufferedData()
            $responseBody = $reader.ReadToEnd()
            Write-Host "  Response: $responseBody"
        }
        Write-Host ""
    }
    Start-Sleep -Milliseconds 100
}