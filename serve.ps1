$ErrorActionPreference = "Stop"
$siteRoot = Join-Path $PSScriptRoot "dist"

if (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server 4173 --directory $siteRoot
  exit $LASTEXITCODE
}

if (Get-Command py -ErrorAction SilentlyContinue) {
  py -m http.server 4173 --directory $siteRoot
  exit $LASTEXITCODE
}

if (Get-Command node -ErrorAction SilentlyContinue) {
  node (Join-Path $PSScriptRoot "serve.mjs")
  exit $LASTEXITCODE
}

throw "No se encontró Python ni Node.js. Sirve la carpeta dist con cualquier servidor HTTP estático."
