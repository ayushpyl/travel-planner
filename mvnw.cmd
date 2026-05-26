@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM Begin all REM://REF://
@REM Maven Wrapper script for Windows
@REM ----------------------------------------------------------------------------

@echo off
@setlocal

set WRAPPER_JAR="%~dp0\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_PROPERTIES="%~dp0\.mvn\wrapper\maven-wrapper.properties"
set MAVEN_PROJECTBASEDIR=%~dp0

@REM Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto execute
echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.
goto error

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%\bin\java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.
goto error

:execute
for /F "usebackq tokens=1,2 delims==" %%A in (%WRAPPER_PROPERTIES%) do (
  if "%%A"=="distributionUrl" set MAVEN_DIST_URL=%%B
)

set MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6
set MAVEN_CMD=%MAVEN_HOME%\bin\mvn.cmd

if exist "%MAVEN_CMD%" goto runMaven

echo Downloading Maven distribution...
mkdir "%MAVEN_HOME%" 2>NUL

@REM Use the wrapper jar to download Maven
"%JAVA_EXE%" -jar %WRAPPER_JAR% %*
if %ERRORLEVEL% NEQ 0 (
    @REM Fallback: download directly using PowerShell
    echo Downloading Maven directly...
    set MAVEN_ZIP=%TEMP%\apache-maven-3.9.6-bin.zip
    powershell -Command "Invoke-WebRequest -Uri '%MAVEN_DIST_URL%' -OutFile '%MAVEN_ZIP%'"
    powershell -Command "Expand-Archive -Force '%MAVEN_ZIP%' '%USERPROFILE%\.m2\wrapper\dists'"
    del "%MAVEN_ZIP%" 2>NUL
)

if exist "%MAVEN_CMD%" goto runMaven

@REM If wrapper extraction puts it in a subdirectory
for /d %%i in ("%USERPROFILE%\.m2\wrapper\dists\apache-maven-*") do (
    set MAVEN_HOME=%%i
    set MAVEN_CMD=%%i\bin\mvn.cmd
)

if exist "%MAVEN_CMD%" goto runMaven

echo.
echo ERROR: Could not download or find Maven.
goto error

:runMaven
"%MAVEN_CMD%" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" %*
if ERRORLEVEL 1 goto error
goto end

:error
set EXIT_CODE=1

:end
@endlocal & set EXIT_CODE=%EXIT_CODE%
cmd /C exit /B %EXIT_CODE%
