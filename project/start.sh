#!/bin/bash

echo ""
echo "========================================"
echo "  🔥 PROJECT BOLT - STARTUP SCRIPT 🔥"
echo "========================================"
echo ""

echo "Starting Project Bolt services..."
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."
if ! command_exists node; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

if ! command_exists python3; then
    echo "❌ Python3 not found. Please install Python3 first."
    exit 1
fi

if ! command_exists go; then
    echo "❌ Go not found. Please install Go first."
    exit 1
fi

echo "✅ All prerequisites found!"
echo ""

# Start services
echo "[1/3] Starting Frontend (React)..."
npm run dev &
FRONTEND_PID=$!

echo "[2/3] Starting Python Backend..."
cd backend/python
python3 main.py &
PYTHON_PID=$!

echo "[3/3] Starting Go Backend..."
cd ../go
go run main.go &
GO_PID=$!

# Wait a moment for services to start
sleep 3

echo ""
echo "========================================"
echo "  🚀 ALL SERVICES STARTED! 🚀"
echo "========================================"
echo ""
echo "Frontend:    http://localhost:5173"
echo "Python API:  http://localhost:8000"
echo "Go API:      http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all services..."

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping all services..."
    kill $FRONTEND_PID 2>/dev/null
    kill $PYTHON_PID 2>/dev/null
    kill $GO_PID 2>/dev/null
    echo "All services stopped."
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait 